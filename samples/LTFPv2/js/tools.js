var subSelect = false;

function tileDelete(tileID) {
    var targetTile = parseInt(tileID);
    if (targetTile > 0) {
        backTiles = tiles;
        var tempTiles = [];
        for (var i = 0; i < tiles.length; i++) {
            if (i != targetTile - 1) {
                tempTiles.push(tiles[i]);
            }
        }
        tiles = tempTiles;
        renderTiles();
    }
}

function tileUndo() {
    tiles = [];
    for (i = 0; i < backTiles.length; i++) {
        tiles.push(backTiles[i]);
    }
    renderTiles();
}

function tileClear() {
    newLine = startLine;
    lastTileType = -1;
    tiles = [];
    renderTiles();
}

function toggleTileSize() {
    if ($('.tileSize').hasClass('tileLarge')) {
        $('.tileSize').removeClass('tileLarge');
        //Make Normal
        lineBreak = 40;
        $('#tiles').css('font-size', '.5rem');
        $('#refDot').css('height', '.5rem');
        $('#refDot').css('width', '.5rem');
        vowelColor = true;
    } else {
        $('.tileSize').addClass('tileLarge');
        //Make Big
        lineBreak = 24;
        $('#tiles').css('font-size', '.8rem');
        $('#refDot').css('height', '.8rem');
        $('#refDot').css('width', '.8rem');
        vowelColor = false;
    }

}

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

function toggleResize() {
    resize = !resize;
    if (resize) {
        $('.tool.resize').removeClass('resizeOff');
    } else {
        $('.tool.resize').addClass('resizeOff');
    }
    sizer();
}

function toggleControls() {
    $('.tool').slideToggle(500);
}
function initTools() {
    $('.controlButton').bind('click', function (e) {
        toggleControls();
    });
    $('.controlButton').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleControls();
        }
    });
    $('.tool.delete').bind('click', function () {
        //Delete currentTile
        if (currentTile.length > 0) {
            tileDelete(currentTile);
        }
    })
    $('.tool.delete').bind('keydown', function (e) {
        //Delete currentTile
        if (e.keyCode == 13) {
            if (currentTile.length > 0) {
                tileDelete(currentTile);
            }
        }
    })
    $('.tool.undo').bind('click', function () {
        tileUndo();
    })
    $('.tool.undo').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            tileUndo();
        }
    })
    $('.tool.clear').bind('click', function () {
        tileClear();
    })
    $('.tool.clear').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            tileClear();
        }
    })

    $('.tool.tileSize').bind('click', function () {
        toggleTileSize();
    })
    $('.tool.tileSize').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleTileSize();
        }
    })

    $('.tool.vowelColor').bind('click', function () {
        toggleVowel();
    })
    $('.tool.vowelColor').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleVowel();
        }
    })



    $('.tool.video').bind('click', function () {
        //tileClear();
        //alert('popVideo');
        addVideoBubble16x9('49c902b8-aaad-4b77-8a23-2a46d23146fb');
    })
    $('.tool.video').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            addVideoBubble16x9('49c902b8-aaad-4b77-8a23-2a46d23146fb');
            //tileClear();
            //alert('popVideo');
        }
    })

    $('.tool.ai').bind('click', function () {
        //tileClear();
        //alert('popVideo');
        //addVideoBubble16x9('d06ce940-8a68-4ff0-ba6f-67645923f914');
        addAvatar();

    })
    $('.tool.ai').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            //addVideoBubble16x9('d06ce940-8a68-4ff0-ba6f-67645923f914');
            addAvatar();
            //tileClear();
            //alert('popVideo');
        }
    })


    $('.tool.resize').bind('click', function () {
        toggleResize();
    })

    $('.tool.resize').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            toggleResize();
        }
    })

    $('.tool').bind('mouseover', function () {
        $(this).focus();
    })

    $('.toolLogo').bind('mouseover', function () {
        $(this).focus();
    })

}

$(document).ready(function (e) {
    initTools();
    $('.tool').slideDown(500);
})