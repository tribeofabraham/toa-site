var currentWidth;
var referenceWidth = 360;
var active = true;
var maxTime = 0;

function constructPlayer(){
    var htmlString = '<div class="vid standard">';
        htmlString +='<h1>Video</h1>';
            htmlString +='<div class="videoBox">';
                htmlString +='<img id="image1" alt="video thumbnail" src="https://manager.media.reallygreatreading.com/object/preview-link/5dfb143d-d138-4d6f-b40e-3b303dd91934" class="vidThumbnail" />';
                htmlString +='<video id="video1" autoplay="false" preload="metadata" crossorigin="anonymous">';
                    //htmlString +='<source src="https://manager.media.reallygreatreading.com/object/preview-link/">';
                    htmlString +='<track id="track1" default kind="captions" srclang="en" />';
                htmlString +='</video>';
            htmlString +='</div>';
            htmlString +='<div class="videoControlBlock"><input type="range" min="1" max="1000" value="0" alt="set time" class="vidSlider" tabindex="-1" target="video1" action="setVideoTime" aria-label="set video time" disabled>';
                htmlString +='<div class="btn vidPlayToggle paused" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div>';
                htmlString +='<div class="btn vidCCToggle" aria-label="toggle captions" alt="toggle captions" role="button" tabindex="0"></div>';
                htmlString +='<div class="btn vidAudioToggle" tabindex="0" aria-label="toggle audio" alt="toggle audio" role="button"></div>';
                htmlString +='<div class="btn vidFullScreen" tabindex="0" aria-label="fullscreen video" alt="fullscreen" role="button"></div>';
            htmlString +='</div>';
            htmlString +='<div class="captionBlock">';
                htmlString +='<div class="vidCaptionTextBlock">';
                    htmlString +='<div class="vidCaption"></div>';
                htmlString +='</div>';
            htmlString +='</div>';
       htmlString +=' </div>';

    $('#wrapper').html(htmlString);
}
function sizer() {
    if (active) {
        currentWidth = $('body').width();
        sizePercent = (currentWidth / referenceWidth) * 100;
        $('body').css('font-size', sizePercent + '%');
    } else {
        $('body').css('font-size', '14px');
    }
}

$(document).ready(function () {

    constructPlayer();
    sizer();
    // window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    $(window).resize(function () {
        sizer();
    });

    const urlParams = new URLSearchParams(window.location.search);


    // Extract the value of the 'video' parameter
    var style = urlParams.get('s');
    var link = urlParams.get('l');
    var lng = urlParams.get('lng');

    if (style == '32') {
        $('body').addClass('wrapper32');
    }
    var htmlString = '';
    let vid;
    //-----------------------
    // AWS integration layer
    var configElement = document.getElementById('media-player-config');
    if (configElement) {
        let config = JSON.parse(configElement.textContent);
        vid = config.objectId;
        /*
        Initialization of demo video
        const player = dashjs.MediaPlayer().create();
        player.initialize(
            document.getElementById("video1"),
            'https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd',
            true);
         */

    } else {
        vid = urlParams.get('v');
    }
    //-----------------------


    var vidString = 'https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd';

    if (lng == 'es') {
        var captionString = 'https://media.reallygreatreading.com/object-link/' + vid + '/es.vtt';
    } else {
        var captionString = 'https://media.reallygreatreading.com/object-link/' + vid + '/en.vtt';
    }

    var thumbnailString = 'https://manager.media.reallygreatreading.com/object/preview-link/' + vid;

    // Defer dashjs initialization until first play-click. This makes the page
    // honor `<video preload="metadata">` — at load we only fetch the MPD manifest
    // (via the user clicking play, not eagerly) and the thumbnail. Calling
    // dashjs `initialize()` here would attach an MSE source and start the
    // segment scheduler, which the browser treats as auto-preload regardless
    // of the `preload="metadata"` attribute.
    const player = dashjs.MediaPlayer().create();

    // -----------------------------------------------------------------------
    // Buffering tuned for low-RAM devices (Promethean smart boards, etc.).
    // Every value here is a knob — bump numbers up if playback stalls,
    // down if the device struggles under memory pressure.
    // Do NOT edit dash.all.min.js — that's the vendor library. Change these
    // values instead.
    //
    //   stableBufferTime .............. seconds of buffer ahead during normal play
    //   bufferTimeAtTopQuality[LongForm]  seconds of buffer ahead at top rendition
    //   bufferToKeep .................. seconds of already-played buffer retained in RAM
    //   fastSwitchEnabled ............. false = fewer quality switches, less MSE churn
    //   initialBitrate.video (kbps) ... starting quality
    //   maxBitrate.video     (kbps) ... hard ceiling on video bitrate
    // -----------------------------------------------------------------------
    player.updateSettings({
        streaming: {
            buffer: {
                stableBufferTime: 8,
                bufferTimeAtTopQuality: 10,
                bufferTimeAtTopQualityLongForm: 10,
                bufferToKeep: 6,
                fastSwitchEnabled: false
            },
            abr: {
                initialBitrate: { video: 500 },
                maxBitrate:     { video: 1500 }
            }
        }
    });

    var playerAttached = false;
    htmlString = vidString;
    $('#image1').attr('src', thumbnailString);
    $('#track1').attr('src', captionString);
    // Select the div by its ID
    const wrapper = document.getElementById('wrapper');


    if (parseInt(style) > 99) {
        $('.vidSlider').attr('tabIndex', 0);
    }
    $('.vidSlider').removeAttr('disabled');
    $('.vid.standard').addClass('s' + style);
    var video = $('#video1').get(0);
    var loaded = false;
    // NOTE: removed `video.pause(); video.autoplay = false; video.load();` —
    // they fight the deferred-init flow. The `<video>` element starts paused by
    // default and the HTML `autoplay="false"` attribute already prevents auto-play.

    video.oncanplay = function () {
        if (!loaded) {
            loaded = true;
        }
    }

    video.onloadstart = function () {
        $('.vidCaption').html('');

        var video = $('#video1').get(0);
        video.pause();
        var caption = video.textTracks[0];
        caption.mode = 'hidden';
        caption.oncuechange = function (e) {
            var cue = this.activeCues[0];
            if (cue) {
                var cueString = cue.getCueAsHTML();
                if (cueString != '') {
                    $('.vidCaption').fadeIn(200);
                    $('.vidCaption').html(cue.getCueAsHTML());
                } else {
                    $('.vidCaption').fadeOut(200);
                    $('.vidCaption').html('');
                }
            }
        };
        // video.play();
    }

    $('.vidCaption').hide();

    $('.vidPlay').bind('click', function () {
        //$('.vidCaption').fadeOut(200);
        //$('.vidCaption').html('');
        //$('.vidCaption').html('');
        var video = $('#video1').get(0);
        var caption = video.textTracks[0];
        caption.mode = 'hidden';
        caption.oncuechange = function (e) {
            var cue = this.activeCues[0];
            if (cue) {
                var cueString = cue.getCueAsHTML();
                if (cueString != '') {
                    $('.vidCaption').fadeIn(200);
                    $('.vidCaption').html(cue.getCueAsHTML());
                } else {
                    $('.vidCaption').fadeOut(200);
                    $('.vidCaption').html('');
                }
            }
        };
        $(this).fadeOut(200);
        video.play();
    });

    $('.vidPlay').bind('keydown', function (e) {

        if (e.keyCode == 13) {
            //$('.vidCaption').fadeOut(200);
            //$('.vidCaption').html('');
            //$('.vidCaption').html('');
            var video = $('#video1').get(0);
            var caption = video.textTracks[0];
            caption.mode = 'hidden';
            caption.oncuechange = function (e) {
                var cue = this.activeCues[0];
                if (cue) {
                    var cueString = cue.getCueAsHTML();
                    if (cueString != '') {
                        $('.vidCaption').fadeIn(200);
                        $('.vidCaption').html(cue.getCueAsHTML());
                    } else {
                        $('.vidCaption').fadeOut(200);
                        $('.vidCaption').html('empty');
                    }
                }
            };
            var interaction = video.textTracks[1];
            interaction.mode = 'hidden';
            interaction.oncuechange = function (e) {
                var cue = this.activeCues[1];
                if (cue) {
                    var cueString = cue.getCueAsHTML();
                    if (cueString != '') {
                        $('#wsBlock').fadeIn(200);
                        $('#wsBlock').html(cue.getCueAsHTML());
                    } else {
                        $('#wsBlock').fadeOut(200);
                        $('#wsBlock').html('empty');
                    }
                }
            };
            $(this).fadeOut(200);
            video.play();
            console.log('video play');
        }
    });

    $('video').bind('timeupdate', function (e) {
        var video = $(this).get(0);
        if (parseInt(style) < 100) {
            maxTime = video.duration;
        } else {
            if (video.currentTime > maxTime) {
                maxTime = video.currentTime;
            }
        }

        if (video.currentTime >= video.duration) {
            //Opportunity to Notify video done
            console.log('Possible Web Socket for video done');
            //socket.emit("message", { object_id: objId, language_code: langCode });
            if (link != null) {
                //alert(link);
                window.location = link;
            } else {
                //alert('no link. Can send websocket call here.');
            }
            $('.vidSlider').val(0);
            $('.vidPlay').fadeIn(100);
            video.currentTime = 0;
            video.pause();

            $('.vidCaption').fadeOut(200);
            $('.vidCaption').html('');
            //sendComplete();

            $('.vidPlayToggle').addClass('paused');

            //Websocket Video Done
            console.log('video done');
        } else {
            $('.vidSlider').val((video.currentTime / video.duration) * 1000);
        }
    });

    $('.vidSlider').bind('input change', function (e) {
        //var target = $(this).attr('target');
        $('.vidCaption').fadeOut(200);
        $('.vidCaption').html('');
        var video = $('#video1').get(0);
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        if (video.duration * ($(this).val() / max) <= maxTime) {
            video.currentTime = video.duration * ($(this).val() / max);

        } else {
            video.currentTime = maxTime;
        }
    });

    $('.vidPlayToggle').bind('click', function () {
        var video = $('#video1').get(0);

        // Lazy-init dashjs on the very first play-click. Until now the page
        // has only fetched the thumbnail + (when the user pulls captions) the
        // VTT, no segments. Passing autoPlay=true here so playback starts as
        // soon as dashjs has buffered enough.
        if (!playerAttached) {
            // Defer the thumbnail fade until the video's first frame is
            // decoded — otherwise the video element renders blank while dash.js
            // is attaching MSE and buffering the first segment, which reads as
            // a flash of a broken/wrong thumbnail.
            var revealOnFirstFrame = function () {
                $('.vidThumbnail').fadeOut(200);
                video.removeEventListener('loadeddata', revealOnFirstFrame);
            };
            video.addEventListener('loadeddata', revealOnFirstFrame);
            player.initialize(document.getElementById("video1"), vidString, true);
            playerAttached = true;
            $(this).hide();
            $(this).removeClass('paused');
            $(this).fadeIn(100);
            $(this).blur();
            return;
        }
        // Subsequent play/pause: thumbnail is already gone, safe to fade
        // (no-op if already display:none).
        $('.vidThumbnail').fadeOut(200);

        if ($(this).hasClass('paused')) {
            console.log('pause');
            $(this).hide();
            $(this).removeClass('paused');
            $(this).fadeIn(100);
            video.play();
        } else {
            console.log('play');
            $(this).hide();
            $(this).addClass('paused');
            $(this).fadeIn(100);
            video.pause();
        }
        $(this).blur();

    });

    $('.vidPlayToggle').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var video = $('#video1').get(0);

            // Lazy-init dashjs on first play (keyboard path).
            if (!playerAttached) {
                // Same deferred-fade fix as the click handler — wait for the
                // first video frame before removing the thumbnail so there's
                // no blank flash while dash.js is attaching MSE.
                var revealOnFirstFrame = function () {
                    $('.vidThumbnail').fadeOut(200);
                    video.removeEventListener('loadeddata', revealOnFirstFrame);
                };
                video.addEventListener('loadeddata', revealOnFirstFrame);
                player.initialize(document.getElementById("video1"), vidString, true);
                playerAttached = true;
                $(this).removeClass('paused');
                return;
            }
            // Subsequent play/pause: thumbnail already gone.
            $('.vidThumbnail').fadeOut(200);

            if ($(this).hasClass('paused')) {
                console.log('pause');
                $(this).removeClass('paused');
                video.play();
            } else {
                console.log('play');
                $(this).addClass('paused');
                video.pause();
            }
        }
    });

    $('.vidCCToggle').bind('click', function () {
        $(this).toggleClass('captionsOff');
        if ($(this).hasClass('captionsOff')) {
            $('.vidCaptionTextBlock').fadeOut(200);
        } else {
            $('.vidCaptionTextBlock').fadeIn(200);
        }
    });

    $('.vidCCToggle').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $(this).toggleClass('captionsOff');
            if ($(this).hasClass('captionsOff')) {
                $('.vidCaptionTextBlock').fadeOut(200);
            } else {
                $('.vidCaptionTextBlock').fadeIn(200);
            }
        }
    });

    $('.vidAudioToggle').bind('click', function () {

        var video = $('#video1').get(0);

        $(this).toggleClass('audioOff');

        if ($(this).hasClass('audioOff')) {
            video.volume = 0;
        } else {
            video.volume = .8;
        }
    });

    $('.vidAudioToggle').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var video = $('#video1').get(0);

            $(this).toggleClass('audioOff');

            if ($(this).hasClass('audioOff')) {
                video.volume = 0;
            } else {
                video.volume = .8;
            }
        }

    });

    $('.vidFullScreen').bind('click', function () {
        //var target = $(this).attr('target');
        // $('#' + target).requestFullscreen();
        var video = $('#video1').get(0);
        //video.play();
        video.requestFullscreen();
    });

    $('.vidFullScreen').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            //var target = $(this).attr('target');
            // $('#' + target).requestFullscreen();
            var video = $('#video1').get(0);
            //video.play();
            video.requestFullscreen();
        }
    });

    $('.vidClose').bind('click', function () {
        //var target = $(this).attr('target');
        // $('#' + target).requestFullscreen();
        //var video = $('#video1').get(0);
        $('#video1').remove();
        //video.play();
        //video.requestFullscreen();
    });

    $('.vidClose').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            //var target = $(this).attr('target');
            // $('#' + target).requestFullscreen();
            $('#video1').remove();
            //video.play();
            //video.requestFullscreen();
        }
    });

});
