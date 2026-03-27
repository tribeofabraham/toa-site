/*Nashville Notation Calculator*/


var key = 0; //zero is key of C
var rot = 0; //we keep this to make visual rotation smooth
var trans = 0;//transposition value
var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var steps = [0, 2, 4, 5, 7, 9, 11, 12];
var pianoKeys = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
var pianoKeyArt = [1, 0, 2, 0, 3, 1, 0, 2, 0, 2, 0, 3];
var colors = ['#c02727', '#5226a8', '#235daa', '#2d7899', '#476b26', '#8e7100', '#ff7415'];
//chords
var maj = [1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7];
var min = [1, 0, 2, 3, 0, 4, 0, 5, 0, 6, 0, 7];
const gaps = [0, 5, 12, 18, 19, 24, 30, 31, 36];

var referenceWidth = 760;// this is for responsive scaling
var active = true;//this variable can be used to disable responsive sizing for WCAG compliancy
function loadPiano() {

    var svgFilePath0 = 'img/keysAll.svg';
    let start = 7.0;
    let htmlString = '';

    let keyString1 = '';
    let keyString2 = '';
    let keyString3 = '';
    let keyString4 = '';

    for (var i = 0; i < 37; i++) {
        keyString1 += '<div class="k' + i + '"></div>';
        keyString2 += '<div class="k' + i + '"></div>';
        keyString3 += '<div class="k' + i + '"></div>';
        keyString4 += '<div class="k' + i + '"></div>';
    }

    $('#selectProg1 .pianoChartBack').html(keyString1);
    $('#selectProg1 .pianoChart').html(keyString1);
    $('#selectProg2 .pianoChartBack').html(keyString2);
    $('#selectProg2 .pianoChart').html(keyString2);
    $('#selectProg3 .pianoChartBack').html(keyString3);
    $('#selectProg3 .pianoChart').html(keyString3);
    $('#selectProg4 .pianoChartBack').html(keyString4);
    $('#selectProg4 .pianoChart').html(keyString4);


    $.get(svgFilePath0, function (data) {
        let svgContent0 = new XMLSerializer().serializeToString(data.documentElement);
        $('#selectProg1 .pianoChart div').html(svgContent0);
        $('#selectProg2 .pianoChart div').html(svgContent0);
        $('#selectProg3 .pianoChart div').html(svgContent0);
        $('#selectProg4 .pianoChart div').html(svgContent0);
        $('#selectProg1 .pianoChartBack div').html(svgContent0);
        $('#selectProg2 .pianoChartBack div').html(svgContent0);
        $('#selectProg3 .pianoChartBack div').html(svgContent0);
        $('#selectProg4 .pianoChartBack div').html(svgContent0);
        setPiano();
    }, 'xml');


}
function setPiano() {
    let keyCount = 0;
    let start = 7;
    let width = .8;

    for (i = 0; i < 37; i++) {
        $('#selectProg1 .pianoChart .k' + keyCount).css('left', start + 'em');
        $('#selectProg2 .pianoChart .k' + keyCount).css('left', start + 'em');
        $('#selectProg3 .pianoChart .k' + keyCount).css('left', start + 'em');
        $('#selectProg4 .pianoChart .k' + keyCount).css('left', start + 'em');
        $('#selectProg1 .pianoChartBack .k' + keyCount).css('left', start + 'em');
        $('#selectProg2 .pianoChartBack .k' + keyCount).css('left', start + 'em');
        $('#selectProg3 .pianoChartBack .k' + keyCount).css('left', start + 'em');
        $('#selectProg4 .pianoChartBack .k' + keyCount).css('left', start + 'em');
        if (pianoKeys[i % 12] == 0) {
            start += width;
        }
        keyCount++;
    }



    for (k = 0; k < 37; k++) {
        $('.pianoChartBack .k' + k + ' svg #black').css('display', 'none');
        $('.pianoChartBack .k' + k + ' svg #white1').css('display', 'none');
        $('.pianoChartBack .k' + k + ' svg #white2').css('display', 'none');
        $('.pianoChartBack .k' + k + ' svg #white3').css('display', 'none');
        $('.pianoChartBack .k' + k + ' svg #white4').css('display', 'none');
        $('.pianoChart .k' + k + ' svg #black').css('display', 'none');
        $('.pianoChart .k' + k + ' svg #white1').css('display', 'none');
        $('.pianoChart .k' + k + ' svg #white2').css('display', 'none');
        $('.pianoChart .k' + k + ' svg #white3').css('display', 'none');
        $('.pianoChart .k' + k + ' svg #white4').css('display', 'none');

        if (pianoKeyArt[k % pianoKeyArt.length] == 0) {
            $('.pianoChartBack .k' + k + ' svg #black').css('display', 'block');
            $('.pianoChart .k' + k + ' svg #black').css('display', 'block');
        } else {
            $('.pianoChartBack .k' + k + ' svg #white' + pianoKeyArt[k % pianoKeyArt.length]).css('display', 'block');
            $('.pianoChart .k' + k + ' svg #white' + pianoKeyArt[k % pianoKeyArt.length]).css('display', 'block');
        }
        $('.pianoChart .k' + k + ' svg path').css('fill', 'rgba(0,0,0,0)');

    }
    $('.pianoChartBack .k36 svg #white1').css('display', 'none');
    $('.pianoChart .k36 svg #white1').css('display', 'none');
    $('.pianoChartBack .k36 svg #white4').css('display', 'block');
    $('.pianoChart .k36 svg #white4').css('display', 'block');

    setKeys();
}

function setKeys() {
    for (k = 0; k < 4; k++) {
        $('#selectProg' + (k + 1) + ' .pianoChart svg path').css('fill', 'rgba(0,0,0,0)');
        $('#selectProg' + (k + 1) + ' .scales .note').css('background-color', 'rgba(0,0,0,0)');

        for (i = 0; i < 37; i++) {
            let pg = [
                parseInt($('#selectProg1 .chordSelect').prop('selectedIndex')),
                parseInt($('#selectProg2 .chordSelect').prop('selectedIndex')),
                parseInt($('#selectProg3 .chordSelect').prop('selectedIndex')),
                parseInt($('#selectProg4 .chordSelect').prop('selectedIndex'))
            ]
            let md = [
                parseInt($('#selectProg1 .modSelect').prop('selectedIndex')),
                parseInt($('#selectProg2 .modSelect').prop('selectedIndex')),
                parseInt($('#selectProg3 .modSelect').prop('selectedIndex')),
                parseInt($('#selectProg4 .modSelect').prop('selectedIndex'))
            ];
            let tempKey = i + key + steps[pg[k]];
            if (tempKey > 36) {
                tempKey = tempKey - 36;
            }
            let keyColor = 'white';
            let otherKey = 'black';

            if (pianoKeys[(i + key + steps[pg[k]]) % 12] > 0) {
                keyColor = 'black';
                otherKey = 'white';
            }

            switch ((i) % 12) {
                case 0:
                    $('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg path').css('fill', colors[0]);
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[0]);
                    break;
                case 2:
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[1]);
                    break;
                case 3:
                    if (md[k] == 1) {
                        $('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg path').css('fill', colors[2]);
                        $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[2]);
                    }
                    break;
                case 4:
                    if (md[k] == 0 || md[k] == 2) {
                        $('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg path').css('fill', colors[2]);
                        $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[2]);
                    }
                    break;
                case 5:
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[3]);
                    break;
                case 7:
                    $('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg path').css('fill', colors[4]);
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[4]);
                    break;
                case 9:
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[5]);
                    break;
                case 11:
                    if (md[k] == 2) {
                        $('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg path').css('fill', colors[6]);
                    }
                    $('#selectProg' + (k + 1) + ' .scales .n' + tempKey).css('background-color', colors[6]);
                    break;

                default:
                    if (keyColor == 'black') {
                        //$('#selectProg' + (k + 1) + ' .pianoChart .k' + tempKey + ' svg #black path').css('fill', 'black');
                    }
                    break;

            }



        }
    }

}

function loadScales() {
    let noteString = '';
    for (i = 0; i < 37; i++) {
        noteString += '<div class="note n' + i + '"></div>';
    }
    for (k = 0; k < 4; k++) {
        $('#selectProg' + (k + 1) + ' .scales').html(noteString);
    }

    let startNote = 0.4;
    let noteWidth = 0.4;
    for (k = 0; k < 4; k++) {
        for (i = 0; i < 37; i++) {
            $('#selectProg' + (k + 1) + ' .scales .n' + i).css('left', startNote + 'em');
            let lastKey = 0;
            if (i % 12 == 4 || i % 12 == 11) {
                startNote += noteWidth * 2;
            } else {
                startNote += noteWidth;
            }

        }
        startNote = 0.4;
    }

}

function loadCharts() {
        //Set default chord progression
    $('#selectProg1 .chordSelect').val(1);
    $('#selectProg2 .chordSelect').val(5);
    $('#selectProg3 .chordSelect').val(6);
    $('#selectProg4 .chordSelect').val(4);

    $('#selectProg3 .modSelect').prop('selectedIndex','1');

    var svgFilePath = 'img/chords.svg';
    // Use $.get() to fetch the SVG content
    $.get(svgFilePath, function (data) {
        // 'data' will contain the SVG XML document
        // Convert the XML document to a string and append it to your desired element
        var svgContent = new XMLSerializer().serializeToString(data.documentElement);
        $('#selectProg1 .chordChart').html(svgContent);
        $('#selectProg2 .chordChart').html(svgContent);
        $('#selectProg3 .chordChart').html(svgContent);
        $('#selectProg4 .chordChart').html(svgContent);
         $('.chordChart svg > g').hide();
         setCharts();
    }, 'xml');


    $("select.chordSelect").css('background-color', 'white');
    $("select.modSelect").css('background-color', colors[0]);

    $('select.chordSelect').css('background-color', colors[0]);

    setCharts();
}


function setCharts() {
    let pg1 = $('#selectProg1 select.chordSelect').prop('selectedIndex');
    let pg2 = $('#selectProg2 select.chordSelect').prop('selectedIndex');
    let pg3 = $('#selectProg3 select.chordSelect').prop('selectedIndex');
    let pg4 = $('#selectProg4 select.chordSelect').prop('selectedIndex');


    $('#selectProg1 select.chordSelect').css('background-color', colors[pg1]);
    $('#selectProg2 select.chordSelect').css('background-color', colors[pg2]);
    $('#selectProg3 select.chordSelect').css('background-color', colors[pg3]);
    $('#selectProg4 select.chordSelect').css('background-color', colors[pg4]);

    $('#selectProg1 select.modSelect').css('background-color', colors[pg1]);
    $('#selectProg2 select.modSelect').css('background-color', colors[pg2]);
    $('#selectProg3 select.modSelect').css('background-color', colors[pg3]);
    $('#selectProg4 select.modSelect').css('background-color', colors[pg4]);

    $('.chordChart svg > g').hide();
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

function initInterface() {
    $('#selectKey').change(function (e) {
        key = $("#selectKey select").prop('selectedIndex');
        rot = key * -30;
        trans = 0;
        $('#trans').html(trans);
        $('#keys').css('transform', 'rotate(' + rot + 'deg)');
        setCharts();
        setPiano();
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
        setPiano();
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
            setPiano();
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
        setPiano();
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
            setPiano();
        }
    });

    $('#progression select').change(function (e) {
        setCharts();
        setPiano();
    });
    setCharts();
    setPiano();
}

$(document).ready(function () {
    initSizer();

    loadCharts();
    loadPiano();
    loadScales();
    initInterface();



});
