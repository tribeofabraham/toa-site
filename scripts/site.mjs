// The Tribe of Abraham site, put together from its repos.
//
//   npm run build     dist/ = this repo's files + each tool in tools.json, from its own repo
//   npm run preview   build, then serve dist/ at http://localhost:4000
//   npm run deploy    build, then upload dist/ to Bluehost (FTPS), only what changed
//
// Every repo is taken as committed (git archive), never with unsaved edits. Deploy also
// insists each one matches GitHub, so the live site is always what's on GitHub.
// A tool marked "build": true (a React app) is built from its committed files, and its dist/ goes in.
// Login details for deploy live in .env.deploy.local (not in git).

import { execFileSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { createServer } from 'node:http'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, extname, join, posix, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PARENT = dirname(SITE) // the repos sit side by side: D:\TribeOfAbrahamGit
const DIST = join(SITE, 'dist')
const { tools } = JSON.parse(readFileSync(join(SITE, 'tools.json'), 'utf8'))

// What's in a repo for working on it, not for the website.
const NOT_FOR_THE_WEB = ['.claude', '.gitignore', '.gitattributes', '.gitkeep', 'README.md', 'LICENSE',
  'package.json', 'package-lock.json', 'scripts', 'tools.json', '.env.deploy.example']

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

const git = (repo, ...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

// Uncommitted, unpushed or unpulled work, in words; '' when the repo matches GitHub.
function drift(repo, fetch) {
  const notes = []
  if (git(repo, 'status', '--porcelain')) notes.push('has changes that are not committed')
  if (fetch) {
    try {
      git(repo, 'fetch', '--quiet', 'origin')
    } catch {
      return "couldn't reach GitHub to check it"
    }
  }
  let counts
  try {
    counts = git(repo, 'rev-list', '--left-right', '--count', 'HEAD...@{u}')
  } catch {
    return [...notes, 'is not on GitHub yet (create the repo there and push it)'].join(', ')
  }
  const [ahead, behind] = counts.split(/\s+/).map(Number)
  if (ahead) notes.push(`has ${ahead} commit(s) not pushed to GitHub`)
  if (behind) notes.push(`is ${behind} commit(s) behind GitHub (pull it)`)
  return notes.join(', ')
}

// A repo's committed files, as they are, into a folder.
function unpackRaw(repo, into) {
  mkdirSync(into, { recursive: true })
  const tar = join(into, '.site.tar')
  execFileSync('git', ['-C', repo, 'archive', '--format=tar', '-o', tar, 'HEAD'])
  const r = spawnSync('tar', ['-xf', '.site.tar'], { cwd: into, stdio: 'inherit' })
  rmSync(tar)
  if (r.status !== 0) fail(`Couldn't unpack ${repo}`)
}

// A repo's committed files into a folder of dist/, without what's only for working on it.
function unpack(repo, into) {
  unpackRaw(repo, into)
  for (const name of NOT_FOR_THE_WEB) rmSync(join(into, name), { recursive: true, force: true })
  for (const f of listFiles(into)) {                      // placeholders and clutter, at any depth
    if (['.gitkeep', '.DS_Store', 'Thumbs.db'].includes(posix.basename(f))) rmSync(join(into, f))
  }
}

// A tool that needs building: its committed files into a scratch folder, npm ci + npm run build there,
// and its dist/ into the site.
function buildTool(repo, into) {
  const work = mkdtempSync(join(tmpdir(), 'toa-build-'))
  try {
    unpackRaw(repo, work)
    for (const args of [['ci', '--no-audit', '--no-fund'], ['run', 'build']]) {
      const r = spawnSync('npm', args, { cwd: work, stdio: ['ignore', 'ignore', 'inherit'], shell: true })
      if (r.status !== 0) fail(`npm ${args.join(' ')} failed for ${repo}`)
    }
    cpSync(join(work, 'dist'), into, { recursive: true })
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

function build({ strict }) {
  const repos = [{ folder: '', repo: 'toa-site', path: SITE }, ...tools.map((t) => ({ ...t, path: join(PARENT, t.repo) }))]
  const problems = []
  for (const r of repos) {
    if (!existsSync(join(r.path, '.git'))) {
      problems.push(`${r.repo}: not found at ${r.path}. Clone it there from github.com/tribeofabraham/${r.repo}`)
      continue
    }
    const d = drift(r.path, strict)
    if (d) problems.push(`${r.repo} ${d}`)
  }
  const missing = problems.filter((p) => p.includes('not found'))
  if (missing.length) fail(missing.join('\n  '))
  if (problems.length) {
    if (strict) fail(`Not deploying: every repo must match GitHub.\n  - ${problems.join('\n  - ')}`)
    console.log(`\n⚠ Building from what's committed; the live site would differ:\n  - ${problems.join('\n  - ')}`)
  }

  rmSync(DIST, { recursive: true, force: true })
  for (const r of repos) {
    const into = join(DIST, r.folder)
    if (r.folder && existsSync(into)) fail(`toa-site has its own ${r.folder}/ folder, but tools.json says ${r.repo} supplies it`)
    if (r.build) buildTool(r.path, into)
    else unpack(r.path, into)
    console.log(`  ✔ ${(r.folder || '(the site)').padEnd(26)} ← ${r.repo} @ ${git(r.path, 'rev-parse', '--short', 'HEAD')}${r.build ? ' (built)' : ''}`)
  }
  console.log(`\nBuilt dist/: ${listFiles(DIST).length} files.`)
}

function listFiles(dir, base = dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? listFiles(full, base) : [relative(base, full).split(sep).join('/')]
  })
}

// -- preview --

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.otf': 'font/otf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.pdf': 'application/pdf',
  '.bin': 'application/octet-stream', '.webmanifest': 'application/manifest+json' }

function preview() {
  const port = 4000
  createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    let file = resolve(DIST, '.' + path)
    if (!file.startsWith(DIST)) { res.writeHead(403).end(); return }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!path.endsWith('/')) { res.writeHead(301, { Location: path + '/' }).end(); return }
      file = join(file, 'index.html')
    }
    if (!existsSync(file)) { res.writeHead(404).end('Not found'); return }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream' })
    res.end(readFileSync(file))
  }).listen(port, () => console.log(`\nPreview: http://localhost:${port}  (Ctrl+C to stop)`))
}

// -- deploy --

async function deploy() {
  const config = join(SITE, '.env.deploy.local')
  if (!existsSync(config)) fail('Missing .env.deploy.local. Copy .env.deploy.example to .env.deploy.local and fill it in.')
  process.loadEnvFile(config)
  const { DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH, DEPLOY_PASSWORD, DEPLOY_CERT_NAME } = process.env
  if (!DEPLOY_HOST || !DEPLOY_USER || !DEPLOY_PATH || !DEPLOY_PASSWORD) {
    fail('DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH and DEPLOY_PASSWORD must all be set in .env.deploy.local.')
  }
  const { Client } = await import('basic-ftp')
  const { checkServerIdentity } = await import('node:tls')

  // What's on the server already, by content: a record kept beside the site, so unchanged files are skipped.
  const RECORD = '.deployed.json'
  const files = listFiles(DIST)
  const hashes = Object.fromEntries(files.map((f) => [f, createHash('sha256').update(readFileSync(join(DIST, f))).digest('hex')]))

  // Bluehost drops long FTP sessions now and then (ECONNRESET), so a dropped connection is reopened and
  // the file tried again, and the record is saved as the upload goes: a deploy that still fails
  // picks up where it stopped next time instead of starting over.
  const connect = async () => {
    const client = new Client(30000)
    await client.access({
      host: DEPLOY_HOST, port: Number(process.env.DEPLOY_PORT || 21), user: DEPLOY_USER, password: DEPLOY_PASSWORD,
      secure: true,
      secureOptions: DEPLOY_CERT_NAME ? { checkServerIdentity: (_h, cert) => checkServerIdentity(DEPLOY_CERT_NAME, cert) } : undefined,
    })
    return client
  }
  const TRIES = 4
  async function withRetry(what, job) {
    for (let attempt = 1; ; attempt++) {
      try {
        return await job()
      } catch (err) {
        if (attempt === TRIES) throw err
        console.log(`  … ${what}: ${err.message}; reconnecting (try ${attempt + 1} of ${TRIES})`)
        ftp.close()
        await new Promise((r) => setTimeout(r, 2000 * attempt))
        ftp = await connect()
      }
    }
  }

  let ftp
  let root
  let known = {}   // what the server has, as far as the record knows
  const saveRecord = (record) => withRetry('saving the record', async () => {
    writeFileSync(join(SITE, RECORD), JSON.stringify(record))
    await ftp.uploadFrom(join(SITE, RECORD), posix.join(root, RECORD))
    rmSync(join(SITE, RECORD))
  })
  let sent = 0
  try {
    console.log(`\nConnecting to ${DEPLOY_HOST}…`)
    ftp = await connect()
    root = DEPLOY_PATH.startsWith('/') ? DEPLOY_PATH : posix.join(await ftp.pwd(), DEPLOY_PATH)
    const here = await ftp.list(root).catch(() => null)
    if (!here || !here.some((e) => e.name === 'index.html')) fail(`${root} has no index.html. Is DEPLOY_PATH the site's folder?`)

    let before = {}
    try {
      const tmp = join(SITE, '.deployed.tmp')
      await ftp.downloadTo(tmp, posix.join(root, RECORD))
      before = JSON.parse(readFileSync(tmp, 'utf8'))
      rmSync(tmp)
    } catch { /* first deploy from here: everything goes up */ }
    known = { ...before }

    // index.html files last: a page only changes once everything it loads is there.
    const order = files.sort((a, b) => (a.endsWith('index.html') - b.endsWith('index.html')))
    const todo = order.filter((f) => process.argv.includes('--all') || before[f] !== hashes[f])
    console.log(`${todo.length} file(s) to upload, ${files.length - todo.length} unchanged.`)
    for (const f of todo) {
      await withRetry(f, async () => {
        await ftp.ensureDir(posix.dirname(posix.join(root, f)))
        await ftp.uploadFrom(join(DIST, f), posix.join(root, f))
      })
      known[f] = hashes[f]
      sent++
      console.log(`  ↑ ${f}  (${sent}/${todo.length})`)
      if (sent % 50 === 0) await saveRecord(known)
    }
    await saveRecord(hashes)
    const gone = Object.keys(before).filter((f) => !hashes[f])
    console.log(`\n✔ Deployed: ${sent} uploaded, ${files.length - sent} unchanged.`)
    if (gone.length) console.log(`  (${gone.length} file(s) no longer in the site were left on the server, e.g. ${gone[0]})`)
    console.log('  https://tribeofabraham.com  (Ctrl+F5 to see it)\n')
  } catch (err) {
    // Keep what did go up, so running deploy again carries on from here
    if (sent) {
      try {
        ftp?.close()
        ftp = await connect()
        await saveRecord(known)
      } catch { /* the next deploy will just send a little more */ }
    }
    fail(`Deploy failed after ${sent} upload(s): ${err.message}\n  Run npm run deploy again: it carries on from where it stopped.`)
  } finally {
    ftp?.close()
  }
}

const command = process.argv[2]
if (command === 'build') build({ strict: false })
else if (command === 'preview') { build({ strict: false }); preview() }
else if (command === 'deploy') { build({ strict: true }); await deploy() }
else fail('Use: npm run build | preview | deploy')
