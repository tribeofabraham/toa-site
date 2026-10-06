function addVideo(videoID) {
    $('#widgets').html('<embed class="vidFrame" src="https://media.reallygreatreading.com/player/' + videoID + '?s=30" aria-label="streaming video frame"></embed><div class="vidClose" tabindex="0" aria-label="close video bubble" role="button"></div>');
    $('#widgets').fadeIn(500);
    $('#widgets .vidClose').bind('mousedown', function(e){
        $('#widgets').html('');
        $('#widgets').fadeOut(200);
    });
    $('#widgets .vidClose').bind('keydown', function(e){
        if (e.keyCode ==13) {
            $('#widgets').html('');
            $('#widgets').fadeOut(200);

        }
    });
    $('.vidFrame').draggable(true);
    $('.vidFrame').css('cursor','move');
}

function addVideoBubble(videoID) {
    $('.videoBubble').remove();
    $('#wrapper').append('<div class="videoBubble"><iframe class="vidFrameBubble" src=widgets/mediaplayer/index.html?vid=' + videoID + '&style="bubble" aria-label="streaming video frame"></iframe><div class="close" tabindex="0" aria-label="close video bubble" role="button"></div></div>');
    $('.videoBubble').draggable(true);
    /*$('.videoBubble').bind('mousedown', function(e){
        //alert('video bubble');
        $(this).draggable(true);
    });*/
    $('.videoBubble .close').bind('mousedown', function(e){
        $(this).parent().remove();
    });
    $('.videoBubble .close').bind('keydown', function(e){
        if (e.keyCode ==13) {
            $(this).parent().remove();
        }
    });
}
function addVideoBubble16x9(videoID) {
    $('.videoBubble').remove();
    $('#wrapper').append('<div class="videoBubble videoBubble16x9"><iframe class="vidFrameBubble" src=widgets/mediaplayer/index.html?vid=' + videoID + '&style="bubble" aria-label="streaming video frame"></iframe><div class="close" tabindex="0" aria-label="close video bubble" role="button"></div></div>');
    $('.videoBubble').draggable(true);
    /*$('.videoBubble').bind('mousedown', function(e){
        //alert('video bubble');
        $(this).draggable(true);
    });*/
    $('.videoBubble .close').bind('mousedown', function(e){
        $(this).parent().remove();
    });
    $('.videoBubble .close').bind('keydown', function(e){
        if (e.keyCode ==13) {
            $(this).parent().remove();
        }
    });
}
function addVideoBubble4x3(videoID) {
    $('.videoBubble').remove();
    $('#wrapper').append('<div class="videoBubble videoBubble4x3"><iframe class="vidFrameBubble" src=widgets/mediaplayer/index.html?vid=' + videoID + '&style="bubble" aria-label="streaming video frame"></iframe><div class="close" tabindex="0" aria-label="close video bubble" role="button"></div></div>');
    $('.videoBubble').draggable(true);
    /*$('.videoBubble').bind('mousedown', function(e){
        //alert('video bubble');
        $(this).draggable(true);
    });*/
    $('.videoBubble .close').bind('mousedown', function(e){
        $(this).parent().remove();
    });
    $('.videoBubble .close').bind('keydown', function(e){
        if (e.keyCode ==13) {
            $(this).parent().remove();
        }
    });
}
function removeVideoBubble(videoID) {

}

function addAvatar() {
    $('.videoBubble').remove();
    $('#wrapper').append('<div class="videoBubble avatar"><iframe class="avatarFrameBubble" src=widgets/mediaplayer/index.html?vid=3be6e87b-2591-4de6-baeb-00d473dd3e60&style="avatar" aria-label="streaming video frame"></iframe><div class="close" tabindex="0" aria-label="close video bubble" role="button"></div></div>');
    $('.videoBubble').draggable(true);
    /*$('.videoBubble').bind('mousedown', function(e){
        //alert('video bubble');
        $(this).draggable(true);
    });*/
    $('.videoBubble .close').bind('mousedown', function(e){
        $(this).parent().remove();
    });
    $('.videoBubble .close').bind('keydown', function(e){
        if (e.keyCode ==13) {
            $(this).parent().remove();
        }
    });
}







