var subSelect = false;


function toggleVowel() {
    if ($('.vowelColor').hasClass('vowelBlack')) {
        $('.vowelColor').removeClass('vowelBlack');
        $('.vowel').removeClass('vowelBlack');
        vowelColor = true;
    } else {
        $('.vowelColor').addClass('vowelBlack');
        $('.vowel').addClass('vowelBlack');
        vowelColor = false;
    }

}

function toggleVideo(){
    supVideoLoad('https://media.reallygreatreading.com/object-link/99f3bbef-c16c-4f88-972e-a1009da9ead8/raw.mpd', 'https://media.reallygreatreading.com/object-link/99f3bbef-c16c-4f88-972e-a1009da9ead8/en.vtt');
    $('#video0').fadeIn(200);
}

function toggleResize(){
    resize = !resize;
    if (resize) {
        $('.tool.resize').removeClass('resizeOff');
    } else {
        $('.tool.resize').addClass('resizeOff');
    }
    sizer();
}

function toggleControls(){
        $('.tool').slideToggle(500);
}
function initTools() {
    $('.controlButton').bind('click', function(e){
        toggleControls();
    });
    $('.controlButton').bind('keydown', function(e){
        if (e.keyCode == 13) {
           toggleControls();
        }
    });


    $('.tool.video').bind('click', function () {
        toggleVideo();
    })
    $('.tool.video').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleVideo();
        }
    })
    $('.tool.resize').bind('click', function () {
        toggleResize();
    })
    $('.tool.resize').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleResize();
        }
    });
    $('.tool').slideDown(500);

}

$(document).ready(function (e) {
    initTools();
})