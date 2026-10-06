//Code to handle rendering to canvas elements
//Some useful variables for drawing map including color coding
var colorHealthy = 'rgba(255,255,255,1)';

//Population Map
function redrawPopDiv() {
    //SVG Implementation
    var pIndex = 0;
    var svgString = '';
    var counter = Math.sqrt(population);

    //DIVTABLE 
    var hs = 100 / counter;
    for (i = 0; i < counter; i++) {
        for (j = 0; j < counter; j++) {
            svgString += '<rect x="' + j * hs + '%" y="' + i * hs + '%" width="' + hs + '%" height="' + hs + '%" class="';


            if (outcomeArray[dayIndex][pIndex] == 1) {
                svgString += 'justInfected">';
            }
            if (outcomeArray[dayIndex][pIndex] > 1 && outcomeArray[dayIndex][pIndex] <= daysContagious) {
                svgString += 'contagious">';
            }
            if (outcomeArray[dayIndex][pIndex] > daysContagious) {
                svgString += 'noLongerContagious">';
            }
            if (outcomeArray[dayIndex][pIndex] == 0) {
                svgString += 'uninfected">';
            }
            svgString += '</rect>';
            pIndex++;
        }
        $('#graphSVG').html(svgString);
    }
    updateGraph();
}



function initializeOutcomeArray() {
    var firstDay = [];
    outcomeArray = [];
    for (i = 0; i < population; i++) {
        firstDay.push(0);
    }
    outcomeArray.push(firstDay);
}

function setUpPopChart() {
    initializeOutcomeArray();
    redrawPopDiv();
}

function updateGraph() {

    var svgString = '';
    //Draw Axis
    svgString += '<line x1="0%" y1="0%" x2="0%" y2="100%"/>';
    svgString += '<line x1="0%" y1="100%" x2="100%" y2="100%"/>';
    if (resultsArray.length > 0) {
        
   
    //Plot Bars
    var barWidth = 100 / (resultsArray.length);
    var barHeight = 0;
    var offSetX = 0;
    var offSetY = 100;

    for (i = 0; i < dayIndex+1; i++) {
        offSetY = 100;
        
        /*Plot No Longer Contagious*/
        if (p4) {
            barHeight = (resultsArray[i].nlc / population) * 100;
        svgString += '<rect class="noLongerContagious" x="' + offSetX + '%" y="' + (offSetY - barHeight) + '%" width="' + barWidth + '%" height="' + barHeight + '%" />';
        
        offSetY -= barHeight;
        }
        
        
        
        /*Plot Contagious*/
        if (p3) {
            barHeight = (resultsArray[i].c / population) * 100;
        svgString += '<rect class="contagious" x="' + offSetX + '%" y="' + (offSetY - barHeight) + '%" width="' + barWidth + '%" height="' + barHeight + '%" />';
        
        offSetY -= barHeight;
        }
        
        
        /*Plot Just Infected*/
        if (p2) {
            barHeight = (resultsArray[i].ji / population) * 100;
        svgString += '<rect class="justInfected" x="' + offSetX + '%" y="' + (offSetY - barHeight) + '%" width="' + barWidth + '%" height="' + barHeight + '%" />';
       
        offSetY -= barHeight;
        }
        
        
        
        /*Plot Uninfected*/
        if (p1) {
            barHeight = (resultsArray[i].u / population) * 100;
        svgString += '<rect class="uninfected" x="' + offSetX + '%" y="' + (offSetY - barHeight) + '%" width="' + barWidth + '%" height="' + barHeight + '%" />';
        
        
        
        }
        
        offSetX += barWidth;
        
    }
 }
    //svgString += '<line x1="0%" y1="100%" x2="100%" y2="100% /> ';
    $('#chartSVG').html(svgString);
}