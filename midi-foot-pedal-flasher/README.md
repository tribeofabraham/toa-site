# MIDI Foot Pedal Flasher

A browser-based WebUSB firmware flashing tool for the Tribe of Abraham MIDI foot pedal. Flash ESP32-S3 firmware directly from your browser — no drivers, no command line, no software to install.

Built in vanilla HTML5. Works in any browser that supports WebUSB (Chrome, Edge).

## What It Does

- Connects to the ESP32-S3 foot pedal via WebUSB
- Flashes the latest MIDI foot pedal firmware directly from the browser
- Confirms successful flash with status feedback
- No installation required — open the page, connect the device, flash

## How To Use

1. Open the flasher at [tribeofabraham.com](https://tribeofabraham.com)
2. Connect your MIDI foot pedal via USB
3. Click Connect and select your device
4. Click Flash Firmware
5. Wait for confirmation — the pedal will restart with new firmware

## Compatible Hardware

Tribe of Abraham MIDI Foot Pedal
- ESP32-S3 based (XIAO form factor or equivalent)
- 4 momentary footswitches
- RGB LED (WS2812B, RMT driven)
- Handcrafted enclosure

## Why WebUSB

No drivers. No command line. No Zadig. No platform-specific tools.
Anyone with a Chrome browser can flash their pedal in under two minutes.
That is the whole point.

## Related Repositories

- [midi-foot-pedal](https://github.com/tribeofabraham/midi-foot-pedal) — firmware source code and web configurator

## License

MIT