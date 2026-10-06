/*Samples*/


var referenceWidth = 760;// this is for responsive scaling
var active = true;//this variable can be used to disable responsive sizing for WCAG compliancy



 

function sizer() {
    if (active) {
        currentWidth = $('body').width();
        sizePercent = (currentWidth / referenceWidth) * 100;
        $('body').css('font-size', sizePercent + '%');
    } else {
        $('body').css('font-size', '14px');
    }
}

function initSizer() {
    //activate responsive scaling
    sizer();
    // window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    $(window).resize(function () {
        sizer();
    });
}


$(document).ready(function () {
    initSizer();
});
