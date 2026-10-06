
function initSupVideo() {
    $('.btn[action="playVid"]').addClass('paused');

    //VIDEO OBJECTS HERE//

    $('.slider[action="setVideoVol"]').bind('input change', function (e) {
        var target = $(this).attr('target');
        var video = $('#' + target).get(0);
        video.volume = $(this).val() / 1000;;
    });

    $('.slider[action="setVideoTime"]').bind('input change', function (e) {
        var target = $(this).attr('target');
        var video = $('#' + target).get(0);
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        video.currentTime = video.duration * ($(this).val() / max);
    });

    $('video').bind('loadeddata', function (e) {
        var video = $(this).get(0);
        $('.slider[action="setVideoVol"]').val(500);
        video.volume = .5;
        video.play();
    });

    $('video').bind('timeupdate', function (e) {
        var video = $(this).get(0);


        if (video.duration > 0) {
            $('.slider[action="setVideoTime"]').val((video.currentTime / video.duration) * 1000);
        }
        if (video.currentTime >= video.duration) {
            $('.med .playK').addClass('replayVideo');
        } else {
            $('.med .playK').removeClass('replayVideo');
        }

        $('.med .slider.audio').val(video.volume * 1000);
        //Update text
        var track = video.textTracks[0];
        console.log(video.textTracks);
        track.mode = 'hidden';
        track.oncuechange = function (e) {
            var cue = this.activeCues[0];
            if (cue) {
                var cueString = cue.text;
                $('#caption1').html(cue.getCueAsHTML());
            }
        };


    });

}

function supVideoLoad(vlink, clink, tlink) {
    var htmlString = '';
    if (tlink) {
        //alert(tlink)
        $('#btnVidTranscripts').attr('target', 'assets/' + tlink);
        $('#btnVidTranscripts').fadeIn(50);
    } else {
        //alert('no tlink');
        $('#btnVidTranscripts').hide();
    };
    var vidString = '';
    /*OLD VIDEO*/
    /*
    vidString += '<div class="vid"><video id="video1" data-dashjs-player="" src="' + vlink + '" crossorigin="anonymous">';
    vidString += '<track default kind="captions" srclang="en" src="' + clink + '" />';
    //vidString += '</video></div><script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>';
    vidString += '</video></div><script src="common/js/dash.all.min.js"></script>';
    //vidString += '</video></div><script>MediaPlayer.reset();</script>';
    */
    /*END OLD VIDEO */
    var vidURL = vlink.substr(49,36);
    vidString = '<iframe class="supVidFrame" allowfullscreen src="media-player/index.html?v='+vidURL+'&s=30&c='+clink+'" arial-label="stream media player" title="streaming media"></iframe>'
    $('#caption1').html('');
    $('#video0 .vidBox').html(vidString);
    $('.supSlideNavigation').hide();
    initSupVideo();
}