var gridActive = false;
var currentTile = ''; //set to -1 to start
var gc = -1;
var startGC = -1;
var startRefGC = -1;
var endGC = -1;
var lastGC = -1;
var subCount = 0;
var lineBreak = 40;
var sylSelect = false;//flag to indicate if syllaboard is selected
var sylStart = 0;//counter for adding tiles directly to syllaboard
var startDragX = 0;
var startDragY = 0;
var stopDragX = 0;
var stopDragY = 0;
var targetTile = '';
var tiles = []; //tiles array
var backTiles = [];
var lastTileType = -1;
var startTileType = -1;
var currentTileType = -1;
var startLine = 202;
var newLine = startLine; //Starting gridcell. 
var lineHeight = 3; //grid rows per line; assuming letter tiles
var boards = []; //syllaboard array
var currentSyllaboardInt = -1;
var vowelColor = true;
var resize = true;
var tilePresetJSONString = '';
var touchStartX, touchStartY, deltaX, deltaY, touchEndX, touchEndY;
var touched = false;

function makePreset() {
    alert(JSON.stringify(tiles));
}
function pmFilter() {
    var pmString = '';
    $('.lt .sub').each(function (e) {
        if (!$(this).parent().hasClass('syllaboardText')) {
            pmString += $(this).html();
        }
    });
    //testing for most common potty word
    var pmIndex = pmString.indexOf('fuck', pmString.toLowerCase());
    if (pmIndex > -1) {
        tiles = [];
        renderTiles();
        //$('#pmWarning').fadeIn(200);
    }
}

function toggleGrid(toggle) {
    if (toggle) {
        // $('.grid').show(0);
        //$('#dot' + $('#lt' + currentTile).attr('gc')).focus();
    } else {
        $('.grid').hide(0);
        //$('.grid').fadeOut(200);
    }
    gridActive = toggle;
}

function buildGrid() {
    var gridString = '';
    for (i = 0; i < 10000; i++) {
        var left = i % 100;
        var top = parseInt(i / 100);
        gridString += '<div id="dot' + (i) + '" class="gridDot"  tabindex="-1" style="left:' + left + 'em;top:' + top + 'em"><div class="indicator"></div></div>';
        gridString += '<br/>';
    }
    $('.grid').html(gridString);
    $('.gridDot').bind('mouseover', function (e) {
        if (lastGC == -1) {
            startRefGC = parseInt($(this).attr('id').substr(3))
        }
        lastGC = parseInt($(this).attr('id').substr(3));
    });
    $('.gridDot').bind('mouseup', function (e) {
        toggleGrid(false)
    });

}

function sortTiles() {
    var sort = true;
    var swapData;
    while (sort) {
        sort = false;
        for (var i = 0; i < tiles.length - 1; i++) {
            if (parseInt(tiles[i].gc) > parseInt(tiles[i + 1].gc)) 
             {
                swapData = tiles[i];
                tiles[i] = tiles[i + 1];
                tiles[i + 1] = swapData;
                sort = true;
            } 
        }
    }
    //sort syllaboards to top
    sort = true;
        while (sort) {
        sort = false;
        for (var i = 0; i < tiles.length - 1; i++) {
            if (parseInt(tiles[i].gc) == parseInt(tiles[i + 1].gc) && tiles[i+1].type.substr(3,10) == 'syllaboard' && !(tiles[i].type.substr(3,10) == 'syllaboard')) 
             {
                swapData = tiles[i];
                tiles[i] = tiles[i + 1];
                tiles[i + 1] = swapData;
                sort = true;
            } 
        }
    }
    console.log('sort');
    console.log(tiles);
}

function computeGC(x, y) {
    var gridSize = parseInt($('.grid').width());
    var cellSize = Math.round(gridSize / 100);
    var col = Math.round(x / cellSize);
    return col;

}

function nextGridCell() {
    if (tiles.length < 1) {
        return newLine
    } else {
        var newGC = 0;
        var newWidth = 0;
        for (i = 0; i < tiles.length; i++) {
            if (newGC < parseInt(tiles[i].gc)) {
                newGC = parseInt(tiles[i].gc);

                newWidth = parseInt(tiles[i].width);
            }
        }
        newGC += newWidth;
        currentTileType = tiles[0].type;
        if (newGC % 100 > lineBreak && !(startTileType != -1 && (startTileType != lastTileType))) {
            newLine += 300;
            newGC = newLine + 1;
        }
        if (startTileType != -1 && (startTileType != lastTileType)) {
            //newLine += 300;
            newLine = Math.round(parseInt(newGC) / 100) * 100;
            newGC = newLine + 302;
        }
        return String(newGC);
    }

}

function addTile(newTile) {
    startTileType = lastTileType;
    var newType = 'lt';

    if ($(newTile).hasClass('color')) {
        lastTileType = 2;
        newType = 'lt color';
        if ($(newTile).hasClass('Red')) {
            newType += ' red';
        }
        if ($(newTile).hasClass('Blue')) {
            newType += ' blue';
        }
        if ($(newTile).hasClass('Green')) {
            newType += ' green';
        }
        if ($(newTile).hasClass('Yellow')) {
            newType += ' yellow';
        }
        if ($(newTile).hasClass('Orange')) {
            newType += ' orange';
        }
        if ($(newTile).hasClass('Purple')) {
            newType += ' purple';
        }
        if ($(newTile).hasClass('Cyan')) {
            newType += ' cyan';
        }
        if ($(newTile).hasClass('Gray')) {
            newType += ' gray';
        }
    } else {
        lastTileType = 1;
    }
    if ($(newTile).hasClass('vowel')) {
        newType = 'lt vowel'
    }
    var newWidth = 2;
    if ($(newTile).hasClass('syllaboard')) {
        newType = 'lt syllaboard'
        lastTileType = 3;
        newWidth = 4;
    }
    if ($(newTile).hasClass('w3')) {
        newType += ' w3';
        newWidth = 3;
    }
    if ($(newTile).hasClass('w4')) {
        newType += ' w4';
        newWidth = 4;
    }
    if ($(newTile).hasClass('w5')) {
        newType += ' w5';
        newWidth = 5;
    }
    if ($(newTile).hasClass('syllaboard')) {
        newType = 'lt syllaboard'
        lastTileType = 3;
        newWidth = 4;
        if ($(newTile).hasClass('w3')) {
            newType += ' w3';
            newWidth = 3;
        }
        if ($(newTile).hasClass('w4')) {
            newType += ' w4';
            newWidth = 4;
        }
        if ($(newTile).hasClass('w5')) {
            newType += ' w5';
            newWidth = 5;
        }
        if ($(newTile).hasClass('w6')) {
            newType += ' w6';
            newWidth = 6;
        }
        if ($(newTile).hasClass('w10')) {
            newType += ' w10';
            newWidth = 10;
        }
        if ($(newTile).hasClass('w20')) {
            newType += ' w20';
            newWidth = 20;
        }
    }
    var newContent = $(newTile).html();
    var newGC = nextGridCell();
    if ($(newTile).hasClass('syllaboard')) {
        newGC = parseInt(newGC);
        if (tiles.length > 0) {
            newGC -= 1;
        }
    } else {
        if (sylSelect) {
            newGC = sylStart;
        }
    }

    /*if (startTileType != -1 && (startTileType != lastTileType)) {
        //newLine += 300;
        newLine = Math.round(parseInt(newGC) / 100) * 100;
        newGC = newLine + 302;
    }*/

    //Check for a Preselected Syllaboard and adjust newGC accordingly
    //var sylSelect = false;//flag to indicate if syllaboard is selected
    //var sylStart = 0;//counter for adding tiles directly to syllaboard

    updateBackTiles();
    tiles.push({ 'type': newType, 'gc': parseInt(newGC), 'width': newWidth, 'content': newContent, 'sub': 0 });
    renderTiles();
}
function updateBackTiles() {
    backTiles = [];
    for (i = 0; i < tiles.length; i++) {
        backTiles.push(tiles[i]);
    }
}
function getBoards() {
    boards = [];
    for (i = 0; i < tiles.length; i++) {
        if (tiles[i].type.substr(0, 13) == 'lt syllaboard') {
            boards.push({ 'type': tiles[i].type, 'gc': tiles[i].gc, 'width': tiles[i].width, 'content': tiles[i].content, 'tileid': i });

            //boards.push(tiles[i],i);
        }
    }
}

function syllaboardIn(tile) {
    var foundFlag = false;
    currentSyllaboardInt = -1;
    for (i = 0; i < boards.length; i++) {
        var tGC = parseInt($('#' + tile).attr('gc'));
        var sbl = boards[i].width - 3;
        var intersect = (tGC >= parseInt(boards[i].gc) && tGC < parseInt(boards[i].gc) + sbl) || (tGC >= parseInt(boards[i].gc) + 100 && tGC < parseInt(boards[i].gc) + 100 + sbl) || (tGC >= parseInt(boards[i].gc) + 200 && tGC < parseInt(boards[i].gc) + 200 + sbl);
        //if (parseInt($('#' + tile).attr('gc')) >= parseInt(boards[i].gc) && parseInt($('#' + tile).attr('gc')) < parseInt(boards[i].gc) + 7) {
        var idNum = boards[i].tileid + 1;
        var idString = '' + idNum;
        if (idNum < 10) {
            idString = '0' + idNum;
        }
        if (intersect) {
            foundFlag = true;
            currentSyllaboardInt = i;
            if (!$('#' + tile).hasClass('syllaboard')) {
                if ($('#' + tile).attr('gc') > boards[i].gc + sbl) {
                    //tiles[boards[i].tileid].gc = tGC;
                    //$('#' + tile).attr('gc', tGC);
                }
                if ($('#' + tile).attr('gc') > boards[i].gc + 10 + sbl) {
                    // $('#' + tile).attr('gc', tGC - 100);
                    //tiles[boards[i].tileid].gc = tGC-100;
                }

                if ($('#' + tile).attr('gc') > boards[i].gc + 20 + sbl) {
                    //$('#' + tile).attr('gc', tGC - 200);
                    //tiles[boards[i].tileid].gc = tGC-200;
                }
                if ($('#' + tile).attr('gc') > boards[i].gc + 30 + sbl) {
                    //$('#' + tile).attr('gc', tGC - 300);
                    //tiles[boards[i].tileid].gc = tGC-300;
                }
                //$('#' + tile).attr('gc', boards[i].gc + tGC%100);
            }
            $('#' + tile).addClass('syl' + idString);
        }
    }
    return foundFlag;
}
function fixOverlap(e, gc) {
    var activeTile = parseInt($(e.target).attr('id').substr(2)) - 1;
    //alert(activeTile);
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].sub = 0;
        if (i == activeTile) {
        } else {
            var compTile = parseInt(tiles[i].gc);
            //compare gc for overlap
            if (gc == compTile) {
                //alert(tiles[i].type.substr(0,13));
                if (tiles[i].type.substr(0, 13) == 'lt syllaboard') {
                    //alert('fix it');
                } else {
                    //tiles[i].gc = parseInt(tiles[i].gc) + 2;
                    //Handle overlap
                    if (i > 0) {
                        if (tiles[i - 1].type.substr(3, 10) != 'syllaboard') {
                            subCount++;
                            tiles[i].sub = subCount;
                        }
                    }

                }
            } else {

                subCount = 0;

            }
        }
    }
}

function renderTiles() {
    sortTiles();
    var tileString = '<div id="tileBack"></div>';
    $('.tool.delete').addClass('disabled');
    if (tiles.length < 1) {
        $('.tool.clear').addClass('disabled');
    } else {
        $('.tool.clear').removeClass('disabled');
    }
    var nextGC = 0;
    var prevGC = 0;
    var gcCount = 0;
    var lastSyl = false;
    for (i = 0; i < tiles.length; i++) {
        ////////////////////////////////////////////////////////////


        //If possible look ahead to next tile position
        if (i < tiles.length - 1) {
            nextGC = tiles[i + 1].gc;
        } else {
            nextGC = 0;
        }
        if (i > 0) {
            prevGC = tiles[i - 1].gc;
        } else {
            prevGC = 0;
        }

        //construct tile num from counter
        var tileNum = i + 1;
        var tileNumString = tileNum;

        //gcCount is incremented if previous or next tile has same gc unless it is a syllaboard
        //first check for syllaboards
        var sylCurrent = false;
        var sylPrev = false;
        var sylNext = false;
        if (tiles[i].type.substr(3, 10) == 'syllaboard') {
            console.log('Syllaboard Current');
            sylCurrent = true;
        }

        if (i > 0 && tiles[i - 1].type.substr(3, 10) == 'syllaboard') {
            console.log('Syllaboard Previous');
            sylPrev = true;
        }

        if (i < tiles.length - 1 && tiles[i + 1].type.substr(3, 10) == 'syllaboard') {
            console.log('Syllaboard Next');
            sylNext = true;
        }

        //Check for overlap by comparing tile positions; Calculate sub tab position
        if (!sylCurrent) {

            console.log('possible subtab')
            if ((tiles[i].gc == nextGC && !sylNext) || (tiles[i].gc == prevGC && !sylPrev)) {
                console.log('add to gcCount');
                console.log('gcCount:' +gcCount);
                gcCount++;
                if ((tiles[i].gc == nextGC) && (tiles[i].gc != prevGC)) {
            gcCount = 1;
        }
                tiles[i].sub = gcCount;
            } else {
                gcCount = 0;
                tiles[i].sub = gcCount;
            }
        } else {
            tiles[i].sub = 0;
            gcCount = 0;
        }
       
       /* if ((tiles[i].gc == prevGC) && (tiles[i].gc != nextGC)) {
            gcCount = 1;
        }*/

        //tiles[i].sub = gcCount;

       /* if ((tiles[i].gc != nextGC) && (tiles[i].gc != prevGC)) {
            gcCount = 0;
        }*/
        /*if (tiles[i].gc == nextGC && tiles[i].type.substr(3, 10) != 'syllaboard') {
            gcCount++;


        } else {
            if (tiles[i].gc == prevGC && !lastSyl && tiles[i].type.substr(3, 10) != 'syllaboard') {
                gcCount++;
            }

        }
        if (lastSyl && tiles[i].gc != nextGC) {
            gcCount = 0;
            tiles[i].sub = gcCount;
            prevGC = tiles[i].gc;
            lastSyl = false;
        } else {
            if (tiles[i].type.substr(3, 10) == 'syllaboard') {
                tiles[i].sub = 0;
                gcCount = 0;
                prevGC = 0;
                lastSyl = true;
            } else {
                tiles[i].sub = gcCount;
                prevGC = tiles[i].gc;
                lastSyl = false;
            }

            if (tiles[i].gc != nextGC) {
                gcCount = 0;
            }
        }*/





        /////////////////////////////////////////////


        if (tileNum < 10) {
            tileNumString = '0' + tileNum;
        }
        if (tiles[i].type.substr(0, 8) == 'lt vowel') {
            if (!vowelColor) {
                tileString += '<div id="lt' + tileNumString + '" class="' + tiles[i].type + ' vowelBlack" tabindex="0" role="button" gc="' + tiles[i].gc + '" tw="' + tiles[i].width + '"><div class="ltStackTab sub' + tiles[i].sub + '"></div><div class="ltMove"></div><div class="ltSub ltSub00">' + tiles[i].content + '</div></div>';
            } else {
                tileString += '<div id="lt' + tileNumString + '" class="' + tiles[i].type + '  vowelRed" tabindex="0" role="button" gc="' + tiles[i].gc + '" tw="' + tiles[i].width + '"><div class="ltStackTab sub' + tiles[i].sub + '"></div><div class="ltMove"></div><div class="ltSub ltSub00">' + tiles[i].content + '</div></div>';
            }
        } else {
            tileString += '<div id="lt' + tileNumString + '" class="' + tiles[i].type + '" aria-label="' + tiles[i].type.substr(9) + ' tile" tabindex="0" role="button" gc="' + tiles[i].gc + '" tw="' + tiles[i].width + '"><div class="ltStackTab sub' + tiles[i].sub + '"></div><div class="ltMove"></div><div class="ltSub ltSub00">' + tiles[i].content + '</div></div>';
        }



    }
    $('#tiles').html('');
    $('#tiles').html(tileString);
    $('.lt').each(function (e) {
        getBoards();
        if (syllaboardIn($(this).attr('id')) && !$(this).hasClass('syllaboard')) {
            $(this).addClass('inBoard');
            //populate syllaboard here
            var syllaboardID = boards[currentSyllaboardInt].tileid + 1;
            var syllaboardString = '';
            if (syllaboardID < 10) {
                syllaboardString += '0';
            }
            syllaboardString += syllaboardID;
            var tileNum = $(this).attr('id');
            if ($(this).hasClass('color')) {
                var tileStyleString = $(this).attr('class');
                var tileStyleArray = $(this).attr('class').split(' ');
                var tileColor = tileStyleArray[2];
                $('#lt' + syllaboardString + ' .syllaboardText').append('<span class="inBoard color ' + tileColor + '"></span>');

            } else {
                $('#lt' + syllaboardString + ' .syllaboardText').append($('#' + tileNum + ' .ltSub').html());

            }

        }
        var tempGC = parseInt($(this).attr('gc'));
        var newLeft = tempGC % 100;
        var newTop = Math.floor(tempGC / 100);
        $(this).attr('style', 'left:' + newLeft + 'em;top:' + newTop + 'em;');
    });

    pmFilter();

    $('.lt').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            currentTile = $(this).attr('id').substr(2);

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');




                renderTiles();


            } else {
                $('.lt').removeClass('selected');
                $('.tool.delete').removeClass('disabled');
                gridActive = true;
                toggleGrid(true);
                $(this).addClass('selected');
            }


        }

        var current = parseInt($('#lt' + currentTile).attr('gc'));
        if (gridActive) {
            if (e.keyCode == 38) {
                if (current > 100) {
                    current -= 100;
                }

            }

            if (e.keyCode == 39) {
                if (current < 10000) {
                    current += 1;
                }
            }

            if (e.keyCode == 40) {

                if (current < 4000) {
                    current += 100;
                }

            }
            if (e.keyCode == 37) {
                if (current > 0) {
                    current -= 1;
                }

            }

            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                var newTop = Math.round(current / 100);
                var newLeft = current % 100;
                var oldGC = parseInt($('#lt' + currentTile).attr('gc'));
                var oldTop = Math.round(oldGC / 100);
                var oldLeft = oldGC % 100;
                var deltaX = newLeft - oldLeft;
                var deltaY = newTop - oldTop;
                $('#lt' + currentTile).attr('style', 'left:' + newLeft + 'em;top:' + newTop + 'em;');

                $('#lt' + currentTile).attr('gc', current);
                tiles[parseInt(currentTile) - 1].gc = current;


                //Check for Subs here
                for (var i = 0; i < tiles.length; i++) {
                    if (parseInt($(this).attr('id').substr(2)) != (i + 1)) {

                        var tempTile = 'lt';
                        if (i + 1 < 10) {
                            tempTile += '0';
                        }
                        tempTile += i + 1;
                        var parentSyl = 'syl' + $(this).attr('id').substr(2);

                        if ($('#' + tempTile).hasClass(parentSyl)) {
                            var thisGC = parseInt($('#' + tempTile).attr('gc'));
                            var offset = deltaX + deltaY * 100;
                            var updateGC = thisGC + offset;
                            $('#' + tempTile).attr('gc', updateGC);
                            tiles[i].gc = updateGC;
                        }
                    }
                }

                //End check for subs

            }
        }
    });

    /*Try straight swap of lt for ltmove*/
    $('.lt').draggable({

        containment: "#tileArea",
        start: function (e, ui) {
            //$(this).draggable("option", "containment", "#tileArea");
            startDragX = ui.position.left;
            startDragY = ui.position.top;
        },
        stop: function (e, ui) {

            stopDragX = ui.position.left;
            stopDragY = ui.position.top;
            //stopDragX = ui.position.left;
            //stopDragY = ui.position.top;

            //check for tileArea boundaries
            if (stopDragX > Math.floor($('#tileArea').width())) {
                stopDragX = Math.floor($('#tileArea').width());
            }
            if (stopDragY > Math.floor($('#tileArea').height())) {
                stopDragY = Math.floor($('#tileArea').height());
            }

            var dotWidth = $('#refDot').width();

            var deltaX = -1 * Math.round((startDragX - stopDragX) / dotWidth);
            var deltaY = -1 * Math.round((startDragY - stopDragY) / dotWidth);

            endGC = parseInt(startGC) + deltaX + deltaY * 100;

            //Check for overlap
            //send
            fixOverlap(e, endGC);

            //Check for Subs here
            for (var i = 0; i < tiles.length; i++) {
                if (parseInt($(this).attr('id').substr(2)) != (i + 1)) {

                    var tempTile = 'lt';
                    if (i + 1 < 10) {
                        tempTile += '0';
                    }
                    tempTile += i + 1;
                    var parentSyl = 'syl' + $(this).attr('id').substr(2);

                    if ($('#' + tempTile).hasClass(parentSyl)) {
                        var subTileGC = parseInt($('#' + tempTile).attr('gc'));
                        subTileGC += deltaX + deltaY * 100;
                        tiles[i].gc = subTileGC;

                    }
                }
            }

            //End check for subs
            tiles[parseInt(currentTile) - 1].gc = endGC;

            toggleGrid(false);
            renderTiles();

        }
    });
    $('.lt').bind('mousedown', function (e) {
        if ($(this).hasClass('syllaboard')) {
            //Set syllaboard flags
            sylSelect = true;


            const offset = $(this).offset();

            // Coordinates inside the element
            const x = e.pageX - offset.left;   // distance from left edge
            const y = e.pageY - offset.top;    // distance from top edge

            //x/$(this).width();

            //alert(Math.round(parseInt($(this).attr('tw'))*(x/$(this).width())));
            var sylOffset = Math.ceil((parseInt($(this).attr('tw')) - 1) * (x / $(this).width())) - 1;
            if (sylOffset < 0) {
                sylOffset = 0;
            }
            if (sylOffset > parseInt($(this).attr('tw')) - 4) {
                sylOffset = parseInt($(this).attr('tw')) - 4;
            }
            // alert($(this).position.left);
            sylStart = parseInt($(this).attr('gc')) + sylOffset;
        } else {
            sylSelect = false;
        }
        startDragX = e.pageX;
        startDragY = e.pageY;
        $('.syl' + $(this).attr('id').substr(2)).addClass('ltSylDrag');
        currentTile = $(this).attr('id').substr(2);

        $('.lt').removeClass('selected');
        $(this).addClass('selected');
        gridActive = true;
        toggleGrid(true);
        startGC = $(this).attr('gc');
        lastGC = -1;
        $('.tool.delete').removeClass('disabled');
    });

    $('.lt').bind('mouseup', function (e) {
        gridActive = false;
        toggleGrid(false);
    });
    $('.lt.inboard').bind('mouseover', function (e) {
        $('.syl' + $(this).attr('id').substr(2)).addClass('ltSylShowGhost');
    });
    $('.lt.syllaboard').bind('mouseover', function (e) {
        $('.syl' + $(this).attr('id').substr(2)).addClass('ltSylShowGhost');
    });
    $('.lt.syllaboard').bind('focus', function (e) {
        $('.syl' + $(this).attr('id').substr(2)).addClass('ltSylShowGhost');
    });
    $('#tileBack').bind('mouseover', function (e) {
        $('.inBoard').removeClass('ltSylShowGhost');
    });
    $('.lt.syllaboard').bind('mouseout', function (e) {
        //$('.syl' + $(this).attr('id').substr(2)).removeClass('ltSylShowGhost');
    });
    $('.lt.syllaboard').bind('focusout', function (e) {
        $('.syl' + $(this).attr('id').substr(2)).removeClass('ltSylShowGhost');
    });

    $('.lt').bind('touchstart', function (e) {
        //$('#debug').html($(this).position().left);
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        touchStartY = touch.pageY;
        touchStartX = touch.pageX;
    });
    $('.lt').bind('touchmove', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        deltaX = touch.pageX - touchStartX;
        deltaY = touch.pageY - touchStartY;
        var dotWidth = $('#refDot').width();
        var touchGC = parseInt($(this).attr('gc'));
        var touchRows = Math.round(deltaY / dotWidth);
        var touchCols = Math.round(deltaX / dotWidth);

        var touchStartRow = Math.round(touchGC / 100);
        var touchStartCol = (touchGC % 100);
        var touchLeft = touchStartCol + touchCols;
        var touchTop = touchStartRow + touchRows;

        $(this).attr('style', 'left:' + touchLeft + 'em; top:' + (touchStartRow + touchRows) + 'em;');
        $('#debug').html(deltaX + ' touchmove ' + deltaY);
        touched = true;
    });
    $('.lt').bind('touchend', function (e) {
        if (touched) {
            var dotWidth = $('#refDot').width();
            var cols = Math.round(deltaX / dotWidth);
            var rows = Math.round(deltaY / dotWidth);
            var newDragGC = parseInt($(this).attr('gc')) + cols + rows * 100;
            $('#debug').html('rows:' + rows + '  cols:' + cols);
            $(this).attr('gc', newDragGC);
            var tileIndex = parseInt($(this).attr('id').substr(2)) - 1;
            tiles[tileIndex].gc = newDragGC;
            //update subs here
            for (var i = 0; i < tiles.length; i++) {
                if (parseInt($(this).attr('id').substr(2)) != (i + 1)) {

                    var tempTile = 'lt';
                    if (i + 1 < 10) {
                        tempTile += '0';
                    }
                    tempTile += i + 1;
                    var parentSyl = 'syl' + $(this).attr('id').substr(2);

                    if ($('#' + tempTile).hasClass(parentSyl)) {
                        var subTileGC = parseInt($('#' + tempTile).attr('gc'));
                        subTileGC += cols + rows * 100;
                        tiles[i].gc = subTileGC;

                    }
                }
            }
            touched = false;
        }
        //end subs update
        renderTiles();
    });


}

function moveInBoardTiles(boardID, rows, cols) {
    var subTileClass = 'syl' + boardID.substr(2);

    for (var i = 0; i < tiles.length; i++) {

        if (parseInt(boardID.substr(2)) != (i + 1)) {

            var tempTile = 'lt';
            if (i + 1 < 10) {
                tempTile += '0';
            }
            tempTile += i + 1;

            var parentSyl = 'syl' + boardID.substr(2);


            if ($('#' + tempTile).hasClass(parentSyl)) {

            }
        }
    }
}
$(document).ready(function (e) {
    //buildGrid();
    document.ontouchmove = function (event) {
        event.preventDefault();
    };
    /* $('body').bind('keydown', function (e) {
         if (e.keyCode == 32) {
             makePreset()
         }
     });*/

})