//Overall tabindex count used for menus and content loading
var tabCount = 1;

function toggleControls() {
    $('#controller').toggleClass('opened');
    $('.tools').toggleClass('opened');
}

function toggleMove() {
    $('#btnMoveToggle').toggleClass('opened');
    if ($('#btnMoveToggle').hasClass('opened')) {
        $('#wrapper > .object').draggable(true);
        $('#wrapper > .object').draggable({
            disabled: false
        });
        console.log('dragging on');
    } else {
        $('#wrapper > .object').draggable({
            disabled: true
        });
        console.log('dragging off');
    }
}
var ssoData;
var srchData;


function loadPreset(url) {
    presetData = [];
    //$.getJSON(url, function (data) {
    switch (url) {

        case 'suproom':
            console.log('ssoData:');
            console.log(ssoData);
            if (ssoData) {
                presetData = ssoData[0].suproom;
                
            }
        
            break;

    }

    if (presetData) {
        buildObjects(presetData);
    }
}
function buildSearchData(searchInput){
    for (i=0; searchInput.length; i++){
        if (searchInput[i].type == 'link') {
            srchData.push
        }
    }
}
function buildPresetControls(url) {
    console.log('url:' + url);
    $.getJSON('data/' + url + '.json', function (data) {
        console.log(data);
        ssoData = data;
        var menuString = '';
        var htmlString = '';
        for (i = 0; i < data[0].menu.length; i++) {
            if (data[0].menu[i].type == 'item') {
                menuString += '<li class="' + data[0].menu[i].source + '" tabindex="' + tabCount + '">';
                menuString += '<h1>' + data[0].menu[i].label + '</h1></li>';
                tabCount++;
            }
            if (data[0].menu[i].type == 'link') {
                menuString += '<a href="' + data[0].menu[i].target + '" target="_new"  tabindex="' + tabCount + '"><li class="' + data[0].menu[i].source + '">';
                menuString += '<h1>' + data[0].menu[i].label + '</h1></li></a>';
                tabCount++;
            }
            if (data[0].menu[i].type == 'img') {
                htmlString += '<img class="img ' + data[0].menu[i].style + '" style="' + buildProps(data[0].menu[i]) + '"  src="' + data[0].menu[i].content + '">';
            }
            if (data[0].menu[i].type == 'txt') {
                htmlString += '<div class="txt ' + data[0].menu[i].style + '" style="' + buildProps(data[0].menu[i]) + '">' + data[0].menu[i].content + '</div>';
            }

        }
        $('#presets ul').html(menuString);
        $('#presets').append(htmlString);

        $('#presets li.downloadLink').bind('click', function(){
            alert('download here');
        });
        
   

        if (ssoData[0].suproom) {
            loadPreset('suproom');
        }

    

        for (j = 0; j < data[0].menu.length; j++) {

            if (data[0].menu[j].action == 'openSlide') {
                var tempClass = data[0].menu[j].source + '';
                
                $('.' + tempClass).click(function () {
                    $('.presetList li').removeClass('current');
                    loadPreset($(this).attr('class'));
                    $(this).addClass('current');
                });

                $('.' + data[0].menu[j].source).bind('keydown', function (e) {
                    if (e.keyCode == 13) {
                        loadPreset($(this).attr('class'));
                    }
                });
                
            }

            if (data[0].menu[j].action == 'openLink') {
                var tempClass = data[0].menu[j].source + '';
                $('.' + tempClass).click(function () {
                    alert('click link');
                });
                $('.' + data[0].menu[j].source).bind('keydown', function (e) {
                    if (e.keyCode == 13) {
                        alert('click link keyboard');
                    }
                });
            };




        }
    });
}

function initControls(url) {
    buildPresetControls(url);
}

$(document).ready(function () {
 

    if ($('body').hasClass('sup')) {
        initControls('suproom');
        toggleControls();
        loadPreset('suproom');
    }

    $('.announcementClose').bind('click', function(e){
        $('#announcement').fadeOut(500);
    });

    $('.announcementClose').bind('keydown', function(e){
        if (e.keyCode==13) {
            $('#announcement').fadeOut(500);
        }
     
    });

    $('.announcementClose').focus();
    
    //$('#announcement').delay(10000).fadeOut(500);

});
