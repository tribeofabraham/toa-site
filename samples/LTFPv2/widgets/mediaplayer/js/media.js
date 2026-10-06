
var currentWidth;
var referenceWidth = 650;
var active = true;

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

    sizer();
    // window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    $(window).resize(function () {
        sizer();
    });

    const urlParams = new URLSearchParams(window.location.search);
    // Extract the value of the 'video' parameter
    // Extract the value of the 'video' parameter
    const vid = urlParams.get('vid');
    const style = urlParams.get('style');
    var styleString = '' + style;
    var htmlString = '';


    if (!style) {
        var vidString = '';
        vidString += '<div class="vid standard"><video id="video1" data-dashjs-player="" src="https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd" crossorigin="anonymous" autoplay>';
        vidString += '<track default kind="captions" srclang="en" src="https://media.reallygreatreading.com/object-link/' + vid + '/en.vtt" />';
        vidString += '</video><input class="vidSlider" tabindex="0" type="range" min="0" max="1000" role="slider" aria-label="set time" alt="set video time"/><div class="btn vidPlayToggle" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div><div class="btn vidCCToggle"  aria-label="toggle captions" alt= "toggle captions" role="button"" tabindex="0"></div><div class="btn vidAudioToggle" tabindex="0"   aria-label="toggle audio" alt="toggle audio" role="button"></div><div class="btn vidFullScreen" tabindex="0"   aria-label="fullscreen video" alt="fullscreen" role="button"></div><div class="captionBlock"><div class="vidCaptionTextBlock"><div class="vidCaption"></div></div></div></div><script src="js/dash.all.min.js"></script>';
        $('#caption1').html('');
        htmlString = vidString;
    } else {
        if (styleString == '"avatar"') {
            var vidString = '';
            vidString += '<div class="vid bubble avatar"><div class="videoBox"><video id="video1" data-dashjs-player="" src="https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd" crossorigin="anonymous" autoplay>';
            vidString += '<track default kind="captions" srclang="en" src="https://media.reallygreatreading.com/object-link/' + vid + '/en.vtt" />';
            vidString += '</video></div><div class="btn vidPlayToggle" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div><div class="captionBlock"><div class="vidCaptionTextBlock"><div class="vidCaption"></div></div></div></div><script src="js/dash.all.min.js"></script>';
            $('#caption1').html('');
            htmlString = vidString;
        }
        if (styleString == '"bubble"') {
            var vidString = '';
            vidString += '<div class="vid bubble bubble16x9"><div class="videoBox"><video id="video1" crossorigin="anonymous">';
            vidString += '<track default kind="captions" srclang="en" src="https://media.reallygreatreading.com/object-link/' + vid + '/en.vtt" />';
            //vidString += '</video></div><div class="btn vidPlayToggle" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div><div class="videoControlBlock"><div class="btn vidCCToggle"  aria-label="toggle captions" alt= "toggle captions" role="button"" tabindex="0"></div><div class="btn vidAudioToggle" tabindex="0"   aria-label="toggle audio" alt="toggle audio" role="button"></div><div class="btn vidFullScreen" tabindex="0" aria-label="fullscreen video" alt="fullscreen" role="button"></div></div><div class="captionBlock"><div class="vidCaptionTextBlock"><div class="vidCaption"></div></div></div></div><script src="js/dash.all.min.js"></script>';
            vidString += '</video></div><div class="videoControlBlock"><input type="range" min="1" max="1000" value="0" alt="set time" class="vidSlider" tabindex="0" target="video1" action="setVideoTime" aria-label="set video time"><div class="btn vidPlayToggle" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div><div class="btn vidCCToggle"  aria-label="toggle captions" alt= "toggle captions" role="button"" tabindex="0"></div><div class="btn vidAudioToggle" tabindex="0"   aria-label="toggle audio" alt="toggle audio" role="button"></div><div class="btn vidFullScreen" tabindex="0" aria-label="fullscreen video" alt="fullscreen" role="button"></div></div><div class="captionBlock"><div class="vidCaptionTextBlock"><div class="vidCaption"></div></div></div></div><script src="js/dash.all.min.js"></script>';

            $('#caption1').html('');

            
            htmlString = vidString;

        }
        if (styleString == '"bubbleSL"') {
            var vidString = '';
            vidString += '<div class="vid bubble bubble16x9 bubbleSL"><div class="videoBox"><video id="video1" data-dashjs-player="" src="https://media.reallygreatreading.com/object-link/' + vid + '/raw.mpd" crossorigin="anonymous" autoplay>';
            vidString += '<track default kind="captions" srclang="en" src="https://media.reallygreatreading.com/object-link/' + vid + '/en.vtt" />';
            vidString += '</video></div><div class="btn vidPlayToggle" tabindex="0" aria-label="toggle play" alt="toggle video play" role="button"></div><div class="videoControlBlock"><div class="btn vidCCToggle"  aria-label="toggle captions" alt= "toggle captions" role="button"" tabindex="0"></div><div class="btn vidAudioToggle" tabindex="0"   aria-label="toggle audio" alt="toggle audio" role="button"></div><div class="btn vidFullScreen" tabindex="0" aria-label="fullscreen video" alt="fullscreen" role="button"></div></div><div class="captionBlock"><div class="vidCaptionTextBlock"><div class="vidCaption"></div></div></div></div>';
            $('#caption1').html('');
            htmlString = vidString;

        }


    }

    // Select the div by its ID
    const wrapper = document.getElementById('wrapper');

    // Insert the string into the div

    wrapper.innerHTML = htmlString;
    var vidCall = 'https://media.reallygreatreading.com/object-link/' +vid+'/raw.mpd';

    const player = dashjs.MediaPlayer().create();
    player.initialize(
        document.getElementById("video1"),
        vidCall,
        false);
    var video = $('#video1').get(0);
    var loaded = false;
    video.oncanplay = function () {
        if (!loaded) {
            loaded = true;
            var video = $('#video1').get(0);
            video.play();

        }
    }
    video.onloadstart = function () {
        $('.vidCaption').html('');
        var video = $('#video1').get(0);
        video.autoplay = true;
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
        video.play();
        //Websocket Video Play
        console.log('video start');
    }

    $('.vidCaption').hide();

    $('.vidPlay').bind('click', function () {
        $('.vidCaption').html('');
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
        $(this).fadeOut(200);
        video.play();
        //Websocket Video Play
        console.log('video play');
    });

    $('.vidPlay').bind('keydown', function (e) {

        if (e.keyCode == 13) {
            $('.vidCaption').html('');
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
            $(this).fadeOut(200);
            video.play();
            //Websocket Video Play
            console.log('video play');
        }
    });

    $('video').bind('timeupdate', function (e) {
        var video = $(this).get(0);
        if (video.currentTime >= video.duration) {
            $('.vidSlider').val(0);
            $('.vidPlay').fadeIn(100);
            video.currentTime = 0;
            video.pause();
            //sendComplete();

            $('.vidPlayToggle').addClass('paused');
            $('.vidCaption').fadeOut(200);
            $('.vidCaption').html('empty');
            //Websocket Video Done
            console.log('video done');
        } else {
            $('.vidSlider').val((video.currentTime / video.duration) * 1000);
        }
    });
    $('.vidSlider').bind('input change', function (e) {
        //var target = $(this).attr('target');
        var video = $('#video1').get(0);
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        video.currentTime = video.duration * ($(this).val() / max);
    });
  /*  $('.vidPlayToggle').bind('click', function () {
        //var target = $(this).attr('target');
        // $('#' + target).requestFullscreen();
        var video = $('#video1').get(0);
        video.play();

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
            //var target = $(this).attr('target');
            // $('#' + target).requestFullscreen();
            var video = $('#video1').get(0);
            video.play();

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
    });*/

    $('.vidPlayToggle').bind('click', function () {
        var video = $('#video1').get(0);
        video.play();

        if ($(this).hasClass('paused')) {
        
            $(this).removeClass('paused');
    
            video.play();
        } else {


            $(this).addClass('paused');

            video.pause();
        }
    });

    $('.vidPlayToggle').bind('keydown', function (e) {
        if (e.keyCode == 13) {
           var video = $('#video1').get(0);
        video.play();

        if ($(this).hasClass('paused')) {
             $(this).removeClass('paused');
            video.play();
        } else {
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
