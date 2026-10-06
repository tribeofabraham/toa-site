//populationArray will store objects representing humans. properties will hold current values of variable such as days sick, contagious...etc
var populationArray = [];

//Array to hold result of pandemic calculations
var outcomeArray = [];

//Array to hold day indexed results
var resultsArray = [];

//Define 4 pandemic variables. These will be populated from input fields
var population = 25;
var daysContagious = 10;
var contacts = 4;
var percentTrans = .06;

//The result variables
var totalInfected = 0;
var totalContagious = 0;
var percentInfected = 0;
var dayIndex = 0;
var animTimer;
var animPlay = false;
var firstRun = true;


//Plotting variables to allow combinations
var p1 = false;
var p2 = true;
var p3 = true;
var p4 = true;

//Builds the initial population array based on the user input which we pass as p. We trigger this everytime the user changes the input
function buildPopulation(p) {
    populationArray = [];
    for (i = 0; i < p; i++) {
        populationArray.push(0);
    }
}

function seedVirus() {
    var patientZeroIndex = Math.round(Math.random() * (population - 1));
    populationArray[patientZeroIndex] = 1;
}

function genRandomContacts(i, c) {
    cCount = 0;
    cArray = [];
    while (cCount < contacts) {
        var cIndex = Math.round(Math.random() * (population - 1));
        if (cIndex != i) {
            cArray.push(cIndex);
            cCount++;
        }
    }
    return cArray;
}

function testInfection() {
    var seed = Math.random();
    if (seed <= percentTrans) {
        return true;
    } else {
        return false;
    }
}

function isContagious(d) {
    if (d > 0 && d <= daysContagious) {
        return true;
    } else {
        return false;
    }
}

function buildResults() {
    resultsArray = [];
    for (i = 0; i < outcomeArray.length; i++) {
        var u = 0;
        var ji = 0;
        var c = 0;
        var nlc = 0;
        for (j = 0; j < outcomeArray[i].length; j++) {
            if (outcomeArray[i][j] == 0) {
                u++;
            }
            if (outcomeArray[i][j] == 1) {
                ji++;
            }
            if (outcomeArray[i][j] > 1 && outcomeArray[i][j] <= daysContagious) {
                c++;
            }
            if (outcomeArray[i][j] > daysContagious) {
                nlc++;
            }
        }
        resultsArray.push({
            'u': u,
            'ji': ji,
            'c': c,
            'nlc': nlc
        })
    }
}

function runPandemic() {
    populationArray = [];
    outcomeArray = [];
    buildPopulation(population);
    seedVirus();
    var start = new Array;
    for (i = 0; i < populationArray.length; i++) {
        start.push(populationArray[i]);
    }
    outcomeArray.push(start);
    var day = new Array;
    day = populationArray;
    var activePandemic = true;
    while (activePandemic) {
        for (i = 0; i < day.length; i++) {
            var contactArray = genRandomContacts(i, contacts);
            var newInfection = false;
            for (j = 0; j < contactArray.length; j++) {
                if (day[i] == 0) {
                    if (isContagious(day[contactArray[j]])) {
                        if (testInfection()) {
                            newInfection = true;
                        }
                    }
                }
            }
            if (newInfection) {
                day[i] = 1;
            } else {
                if (day[i] > 0) {
                    day[i]++;
                }
            }
        }
        activePandemic = false;
        for (i = 0; i < day.length; i++) {
            if (isContagious(day[i])) {
                activePandemic = true;
            }
        }
        // outcomeArray.push([]);
        var passArray = [];
        for (i = 0; i < day.length; i++) {
            passArray.push(day[i]);
        }
        outcomeArray.push(passArray);
    }


    populationArray = day;
    dayIndex = 0;

    $('#populationLoader').hide();
    //console.log(outcomeArray);
    buildResults();
    updateResultInfo();
    redrawPopDiv(dayIndex);
    if (firstRun) {
        initDataController();
        firstRun = false;
    }
    $('#maxCasesText').html(population);
    $('#maxDaysText').html(resultsArray.length);

}

function updateControllerButtons() {
    if (dayIndex == 0) {
        // $('.btnControl').removeClass('disabled');
        $('.btnControl').removeClass('disabled');
        $('#dayPrev').addClass('disabled');
        $('#dayFirst').addClass('disabled');

        if (animPlay) {
            $('#dayPlay').removeClass('btnPlay');
            $('#dayPlay').addClass('btnPause');
        } else {
            $('#dayPlay').addClass('btnPlay');
            $('#dayPlay').removeClass('btnPause');
        }

        $('#dayPlay').removeClass('btnReplay');
    }

    if (dayIndex > 0 && dayIndex < resultsArray.length - 1) {
        $('.btnControl').removeClass('disabled');

        $('#dayPlay').removeClass('btnPlay');
        $('#dayPlay').removeClass('btnPause');
        $('#dayPlay').addClass('btnReplay');

        if (animPlay) {
            $('#dayPlay').removeClass('btnPlay');
            $('#dayPlay').addClass('btnPause');
        } else {
            $('#dayPlay').addClass('btnPlay');
            $('#dayPlay').removeClass('btnPause');
        }

        $('#dayPlay').removeClass('btnReplay');
    }

    if (dayIndex == resultsArray.length - 1) {
        $('.btnControl').removeClass('disabled');
        $('#dayNext').addClass('disabled');
        $('#dayLast').addClass('disabled');

        $('#dayPlay').removeClass('btnPlay');
        $('#dayPlay').removeClass('btnPause');
        $('#dayPlay').addClass('btnReplay');
    }
}

function updateResultInfo() {
    updateGraph();
    updateControllerButtons();
    $('#rDayText').html(dayIndex + 1);
    $('#rDayTotalText').html(resultsArray.length);
    $('#r1a').html(resultsArray[dayIndex].u + ' of ' + population);
    $('#r2a').html(resultsArray[dayIndex].ji + ' of ' + population);
    $('#r3a').html(resultsArray[dayIndex].c + ' of ' + population);
    $('#r4a').html(resultsArray[dayIndex].nlc + ' of ' + population);

    var p1 = (resultsArray[dayIndex].u / population) * 100;
    var p2 = (resultsArray[dayIndex].ji / population) * 100;
    var p3 = (resultsArray[dayIndex].c / population) * 100;
    var p4 = (resultsArray[dayIndex].nlc / population) * 100;

    $('#r1b').html(p1.toFixed(1) + '%');
    $('#r2b').html(p2.toFixed(1) + '%');
    $('#r3b').html(p3.toFixed(1) + '%');
    $('#r4b').html(p4.toFixed(1) + '%');
}

function playAnimation() {
    animTimer = setInterval(function () {
        if (dayIndex < outcomeArray.length - 1) {
            dayIndex++;
            redrawPopDiv();
            updateResultInfo();
        } else {
            clearInterval(animTimer);
            animPlay = false;
            $('#dayPlay').removeClass('btnPause');
            $('#dayPlay').addClass('btnReplay');
        }
    }, 100);
}

function initDataController() {
    $('#controlPanel div').removeClass('disabled');
    $('#dayFirst').bind('click', function () {
        dayIndex = 0;
        redrawPopDiv();
        updateResultInfo();
    });
    $('#dayPrev').bind('click', function () {
        if (dayIndex > 0) {
            dayIndex--;
            redrawPopDiv();
            updateResultInfo();
            $('#dayNext').removeClass('disabled')
        }
    });
    $('#dayPlay').bind('click', function () {
        if (dayIndex < resultsArray.length - 1) {

            if (!animPlay) {
                playAnimation();
                animPlay = true;
                $('#dayPlay').removeClass('btnPlay');
                $('#dayPlay').addClass('btnPause');
            } else {
                clearInterval(animTimer);
                animPlay = false;
                $('#dayPlay').addClass('btnPlay');
                $('#dayPlay').removeClass('btnPause');
            }

        } else {
            dayIndex = 1;
            playAnimation();
            animPlay = true;
        }


    });
    $('#dayNext').bind('click', function () {
        if (dayIndex < outcomeArray.length - 1) {
            dayIndex++;
            redrawPopDiv();
            updateResultInfo();
            $('#dayPrev').removeClass('disabled')
        }


    });
    $('#dayLast').bind('click', function () {
        dayIndex = outcomeArray.length - 1;
        redrawPopDiv();
        updateResultInfo()
    });
}

function initControls() {
    $('#btnCalc').bind('click', function () {
        $('#populationLoader').fadeIn(100, function () {
            dayIndex = 0;
            $('#populationDivSVG').fadeIn(250);
            runPandemic();
            $('#btnCalc').html('Recalculate Results');
            //$('#messageBox').fadeOut(100);
        });
        //runPandemic();
    });
    $('#rsb1').bind('click', function () {
        if (!p1) {
            p1 = true;
            $(this).addClass('plot');
        } else {
            p1 = false;
            $(this).removeClass('plot');
        }

    });
    $('#rsb2').bind('click', function () {
        if (!p2) {
            p2 = true;
            $(this).addClass('plot');
        } else {
            p2 = false;
            $(this).removeClass('plot');
        }

    });
    $('#rsb3').bind('click', function () {
        if (!p3) {
            p3 = true;
            $(this).addClass('plot');
        } else {
            p3 = false;
            $(this).removeClass('plot');
        }

    });
    $('#rsb4').bind('click', function () {
        if (!p4) {
            p4 = true;
            $(this).addClass('plot');
        } else {
            p4 = false;
            $(this).removeClass('plot');
        }

    });

    function popSelectClick(target) {

        if (population != Number($(target).html())) {
            population = Number($(target).html());
            dayIndex = 0;
            setUpPopChart();
            $('li').removeClass('selected');
            $(target).addClass('selected');
            $('#btnCalc').html('Calculate Results');
            $('#maxCasesText').html(population);
            $('#maxDaysText').html(resultsArray.length);
            $('#rDayText').html('--');
            $('#rDayTotalText').html('--');
            $('#r1a').html('-- of --');
            $('#r1b').html('--%');
            $('#r2a').html('-- of --');
            $('#r2b').html('--%');
            $('#r3a').html('-- of --');
            $('#r3b').html('--%');
            $('#r4a').html('-- of --');
            $('#r4b').html('--%');
            $('#maxDaysText').html('--');
        }
    }
    $('li').bind('click', function () {
        popSelectClick(this)
    });


    $('#daysContagious').bind('change', function () {
        daysContagious = $(this).val();
    });
    $('#contacts').bind('change', function () {
        contacts = $(this).val();
    });
    $('#percentTransmission').bind('change', function () {
        percentTrans = $(this).val() / 100;
    });
    $('#egg1').bind('click', function () {
        $('.pickPop ul').html('<li>25</li><li>100</li><li>400</li><li>900</li><li>1600</li><li>2500</li>');
        $('li').bind('click', function () {
            popSelectClick(this)
        });
    });
}

$(document).ready(function () {
    document.body.style.zoom = "100%";
    dayIndex = 0;

    initControls();

    $('#populationDivSVG').fadeIn(250);
    runPandemic();
    $('#btnCalc').html('Recalculate Results');
})
