/*Nashville Notation Calculator*/


var key = 0; //zero is key of C
var rot = 0; //we keep this to make visual rotation smooth
var trans = 0;//transposition value
var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var steps = [0, 2, 4, 5, 7, 9, 11, 12];

var referenceWidth = 760;// this is for responsive scaling
var active = true;//this variable can be used to disable responsive sizing for WCAG compliancy

function loadCharts() {
    var svgFilePath = 'img/chordsReal.svg';
    // Use $.get() to fetch the SVG content
    $.get(svgFilePath, function (data) {
        // 'data' will contain the SVG XML document
        // Convert the XML document to a string and append it to your desired element
        var svgContent = new XMLSerializer().serializeToString(data.documentElement);
        $('#selectProg1 .chordChart').append(svgContent);
        $('#selectProg2 .chordChart').append(svgContent);
        $('#selectProg3 .chordChart').append(svgContent);
        $('#selectProg4 .chordChart').append(svgContent);
    }, 'xml');
}

function setCharts() {
    //alert($("#selectProg1 select").prop('selectedIndex'));
    $('svg > g').hide();
    let chart1, chart2, chart3, chart4;
    let ch1, ch2, ch3, ch4;
    ch1 = key + steps[$("#selectProg1 select.chordSelect").prop('selectedIndex')] - key;
    ch2 = key + steps[$("#selectProg2 select.chordSelect").prop('selectedIndex')] - key;
    ch3 = key + steps[$("#selectProg3 select.chordSelect").prop('selectedIndex')] - key;
    ch4 = key + steps[$("#selectProg4 select.chordSelect").prop('selectedIndex')] - key;

    ch1 = (ch1 + key) % 12;
    ch2 = (ch2 + key) % 12;
    ch3 = (ch3 + key) % 12;
    ch4 = (ch4 + key) % 12;

    chart1 = keys[ch1] + $("#selectProg1 select.modSelect").val();
    chart2 = keys[ch2] + $("#selectProg2 select.modSelect").val();
    chart3 = keys[ch3] + $("#selectProg3 select.modSelect").val();
    chart4 = keys[ch4] + $("#selectProg4 select.modSelect").val();

    $('#selectProg1 #' + chart1 + '').show();
    $('#selectProg2 #' + chart2 + '').show();
    $('#selectProg3 #' + chart3 + '').show();
    $('#selectProg4 #' + chart4 + '').show();

}

function sizer() {
    if (active) {
        currentWidth = $(window).width();
        currentHeight  = $(window).height();
        if (currentWidth < currentHeight) {
            sizePercent = (currentWidth / referenceWidth) * 100;
        } else {
            sizePercent = (currentHeight / referenceWidth) * 100;
        }
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

function initInterface() {

    $('#selectKey').change(function (e) {
        key = $("#selectKey select").prop('selectedIndex');
        rot = key * -30;
        trans = 0;
        $('#trans').html(trans);
        $('#keys').css('transform', 'rotate(' + rot + 'deg)');
        setCharts();
    });

    $('.tranBtn.up').bind('click', function (e) {
        $('#selectProg4 #B').show();
        if (key < 11) {
            key++
        } else {
            key = 0;
        }
        if (trans < 11) {
            trans++;
        } else {
            trans = 0;
        }
        $('#trans').html(trans);
        rot += -30;
        //rot=key*(-30);
        $('#keys').css('transform', 'rotate(' + rot + 'deg)');
        setCharts();
    });
    $('.tranBtn.up').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $('#selectProg4 #B').show();
            if (key < 11) {
                key++
            } else {
                key = 0;
            }
            if (trans < 11) {
                trans++;
            } else {
                trans = 0;
            }
            $('#trans').html(trans);
            rot += -30;
            //rot=key*(-30);
            $('#keys').css('transform', 'rotate(' + rot + 'deg)');
            setCharts();
        }
    });


    $('.tranBtn.down').bind('click', function (e) {
        if (key > 0) {
            key--
        } else {
            key = 11;
        }
        if (trans > -11) {
            trans--;
        } else {
            trans = 0;
        }
        $('#trans').html(trans);
        rot += 30;
        //rot = key*30;
        $('#keys').css('transform', 'rotate(' + rot + 'deg)');
        setCharts();
    });

    $('.tranBtn.down').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if (key > 0) {
                key--
            } else {
                key = 11;
            }
            if (trans > -11) {
                trans--;
            } else {
                trans = 0;
            }
            $('#trans').html(trans);
            rot += 30;
            //rot = key*30;
            $('#keys').css('transform', 'rotate(' + rot + 'deg)');
            setCharts();
        }
    });

    $('#progression select').change(function (e) {
        setCharts();
    });



}

$(document).ready(function () {
    initSizer();
    initInterface();
    loadCharts();

});
