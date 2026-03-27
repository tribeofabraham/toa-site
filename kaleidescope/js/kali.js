/*Resume Template*/

var referenceWidth = 760;// this is for responsive scaling
var active = true;//this variable can be used to disable responsive sizing for WCAG compliancy
var currentWidth;
var imageRot = 0;
var rotSpeed = 1; // Default rotation speed (will be controlled by slider)

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
    //window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
    $(window).resize(function () {
        sizer();
    });
}

function initSlices() {
    let kalilString = '';

    for (var i = 0; i < 12; i++) {
        if (i % 2 == 0) {
            kalilString += '<div id="s' + (i + 1) + '" class="slice"><img src="img/kali1.png" alt="" /></div>';

        } else {
            kalilString += '<div id="s' + (i + 1) + '" class="sliceOdd"><div class="flipH"><img src="img/kali1.png" alt="" /></div></div>';

        }
    }
    kalilString += '<div class="kaliInnerShadow"></div>';
    $('.kali').html(kalilString);
    for (var i = 0; i < 12; i++) {
        if (i % 2 == 0) {
            $('#s' + (i + 1)).css('transform', 'rotate(' + (i * 30) + 'deg)');
            $('#s' + (i + 1) + ' img').css('transform', 'rotate(' + (-1 * 30 + imageRot) + 'deg)');


        } else {
            $('#s' + (i + 1)).css('transform', 'rotate(' + ((i + 1) * 30) + 'deg)');
            $('#s' + (i + 1) + ' img').css('transform', 'rotate(' + (1 * 150 + imageRot) + 'deg)');

            // $('#s' + (i + 1) + ' img').css('transform', 'rotate(' + -1 * 150 + 'deg)');

        }
    }
    //updateSlices();
}
function updateSlices() {
    for (var i = 0; i < 12; i++) {
        if (i % 2 == 0) {
            //$('#s' + (i + 1)).css('transform', 'rotate(' + (i * 30) + 'deg)');
            $('#s' + (i + 1) + ' img').css('transform', 'rotate(' + (-1 * 30 + imageRot) + 'deg)');
        } else {
            //$('#s' + (i + 1)).css('transform', 'rotate(' + ((i+1) * 30) + 'deg)');
            $('#s' + (i + 1) + ' img').css('transform', 'rotate(' + (1 * 150 + imageRot) + 'deg)');
        }
    }
}


function initControls() {
    $(window).bind('keydown', function (e) {
        switch (e.keyCode) {
            case 37:
                if (imageRot > 0) {
                    imageRot -= 1;
                } else {
                    imageRot = 360;
                }
                break;
            case 39:
                if (imageRot < 360) {
                    imageRot += 1;
                } else {
                    imageRot = 1;
                }
                break;
            case 38:
                break;
            case 40:
                break;
        }
        updateSlices();
        //  alert(e.keyCode)
    });

    $('.kaliSelect li').bind('click', function (e) {
        $('.kali img').attr('src', $(this).children('img').attr('src'));
    });
    $('.kaliSelect li').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $('.kali img').attr('src', $(this).children('img').attr('src'));
        }
    });

    // Speed slider control
    $('#speedSlider').on('input', function() {
        rotSpeed = parseFloat($(this).val());
    });
}
function initMenu() {
    var menuString = '';
    for (i = 0; i < 8; i++) {
        menuString += '<li tabindex="0"><div class="shadow"></div><img alt="Select kaleidoscope pattern ' + (i + 1) + '" src="img/kali' + (i + 1) + '.png" /></li>';
    }
    $('.kaliSelect').append(menuString);
    //$('#wrapper').append('<ul class="controls"><li>&lt;</li><li>&gt;</li></ul>');
}
function initTimer() {
    var kaliInterval = setInterval(function () {
        // Code to be executed repeatedly
        if (rotSpeed !== 0) {
            imageRot += rotSpeed;

            // Keep imageRot within 0-360 range
            if (imageRot >= 360) {
                imageRot = imageRot - 360;
            } else if (imageRot < 0) {
                imageRot = imageRot + 360;
            }

            updateSlices();
        }
    }, 40); // Interval in milliseconds (40ms = ~25 fps)

}
$(document).ready(function () {
    initSizer();
    initMenu();
    initControls();
    initSlices();
    initTimer();

});
