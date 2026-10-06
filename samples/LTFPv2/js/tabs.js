var uppercase = false;

function addWeb(url) {
    $('#widgets').html('<iframe class="webFrame" src="' + url + '" aria-label="webview asset">');
    $('#widgets').fadeIn(500);
}
function loadPre(url) {
    $.getJSON('data/' + url, function (data) {
        tiles = [];
        for (i = 0; i < data.length; i++) {
            tiles[i] = data[i];
        }
        $('.tiles').hide();
        renderTiles();
        $('.tiles').fadeIn(500);
    });

}
function initTabs(set) {

    $.getJSON('data/' + set + '.json', function (data) {

        var tabString = '';
        var widgetString = '';

        for (i = 0; i < data[0].tabs.length; i++) {
            tabString += '<div id="t' + (i + 1) + '" class="tab">';
            tabString += '<div class="tLabel" tabindex="0" role="button" style="width:' + data[0].tabs[i].width + 'em; left:' + data[0].tabs[i].position + 'em">' + data[0].tabs[i].title + '</div>';
            tabString += '<div class="tabContent"><div class="subBox">';
            for (j = 0; j < data[0].tabs[i].tiles.length; j++) {
                switch (data[0].tabs[i].tiles[j].type) {
                    case 'break':
                        tabString += '<br/>';
                        break;
                    case 'syllaboard':
                        tabString += '<div class="preset syllaboard w' + data[0].tabs[i].tiles[j].width + '"><div class="syllaboardText"></div></div>';
                        break;
                    case 'div':
                        tabString += '</div><div class="divider"></div><div class="subBox">';
                        break;
                    case 'txt':
                        tabString += '</div><div class="txt">' + data[0].tabs[i].tiles[j].content + '</div><div class="divider"></div><div class="subBox">';
                        break;
                    case 'color':
                        tabString += '<div class="preset color ' + data[0].tabs[i].tiles[j].content + '" aria-label="' + data[0].tabs[i].tiles[j].content + '" role="button" tabindex="-1"></div>';
                        break;
                    case 'divHalf':
                        tabString += '</div><div class="dividerHalf"></div><div class="subBox">';
                        break;
                    case 'vid':
                        //widgetString += '<iframe class="mediaFrame" src="../widgets/mediaplayer/index.html?vid='+data[0].tabs[i].tiles[j].content+'></iframe>';
                        tabString += '<div class="widget vid" aria-label="Video Player" vplay="false" vid="' + data[0].tabs[i].tiles[j].vid + '" role="button" tabindex="-1"><div class="widgetLabel">' + data[0].tabs[i].tiles[j].content + '</div><div class="ghoster"></div></div>';
                        break;
                    case 'web':
                        //widgetString += '<iframe class="mediaFrame" src="../widgets/mediaplayer/index.html?vid='+data[0].tabs[i].tiles[j].content+'></iframe>';
                        tabString += '<div class="widget web" aria-label="Webview Player" linkOpen="false" link="' + data[0].tabs[i].tiles[j].url + '" role="button" tabindex="-1"><div class="widgetLabel">' + data[0].tabs[i].tiles[j].content + '</div><div class="ghoster"></div></div>';
                        break;
                    case 'pre':
                        //widgetString += '<iframe class="mediaFrame" src="../widgets/mediaplayer/index.html?vid='+data[0].tabs[i].tiles[j].content+'></iframe>';
                        tabString += '<div class="widget pre" aria-label="Tiles Preset" linkOpen="false" link="' + data[0].tabs[i].tiles[j].url + '" role="button" tabindex="-1"><div class="widgetLabel">' + data[0].tabs[i].tiles[j].content + '</div><div class="ghoster"></div></div>';
                        break;
                    case 'vidBub':
                        tabString += '<div class="vidBub" aria-label="' + data[0].tabs[i].tiles[j].content + '" role="button" tabindex="-1"><div class="label">' + data[0].tabs[i].tiles[j].content + '</div></div>';
                        break;
                    case 'uclc':
                        tabString += '<div class="uclc" aria-label="Uppercase Lowercase Toggle" role="button" tabindex="-1"></div>';
                        break;
                    case 'digraph':
                        var classString = '';
                        if (data[0].tabs[i].tiles[j].type == 'vowel') {
                            classString += ' vowel';
                        }
                        if (data[0].tabs[i].tiles[j].type == 'vowelChunk') {
                            classString += ' vowelChunk';
                        }
                        if (data[0].tabs[i].tiles[j].width) {
                            classString += ' w' + data[0].tabs[i].tiles[j].width;
                        }

                        tabString += '<div class="digraph' + classString + '" role="button" aria-label="' + data[0].tabs[i].tiles[j].content + '" tabindex="-1"><div class="sub">' + data[0].tabs[i].tiles[j].content + '</div></div>';
                        break;
                    default:
                        var classString = '';
                        if (data[0].tabs[i].tiles[j].type == 'vowel') {
                            classString += ' vowel';
                        }
                        if (data[0].tabs[i].tiles[j].type == 'vowelChunk') {
                            classString += ' vowelChunk';
                        }
                        if (data[0].tabs[i].tiles[j].width) {
                            classString += ' w' + data[0].tabs[i].tiles[j].width;
                        }

                        tabString += '<div class="preset' + classString + '" role="button" aria-label="' + data[0].tabs[i].tiles[j].content + '" tabindex="-1"><div class="sub">' + data[0].tabs[i].tiles[j].content + '</div></div>';
                        break;
                }
            }
            tabString += '</div>';
            tabString += '</div>';
            tabString += '</div>';
        };

        $('.tabs').html(tabString);

        $('.uclc').bind('click', function (e) {
            if (uppercase) {
                uppercase = false;
                $(this).removeClass('uppercase');
                $('#t1 .sub').each(function (e) {
                    $(this).text($(this).text().toLowerCase());
                })
            } else {
                uppercase = true;
                $(this).addClass('uppercase');
                $('#t1 .preset .sub').each(function (e) {
                    $(this).text($(this).text().toUpperCase());
                });
                $('#t1 .digraph .sub').each(function (e) {
                    //$(this).text($(this).text().substr(0, 1).toUpperCase() + $(this).text().substr(1).toUpperLowercase());
                    var digraphCaps = $(this).text().substr(0,1).toUpperCase() + $(this).text().substr(1).toLowerCase();
                    $(this).text(digraphCaps);
                })
            }
            // alert('togglecase');
        });

        $('.uclc').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                if (uppercase) {
                    uppercase = false;
                    $(this).removeClass('uppercase');
                    $('#t1 .sub').each(function (e) {
                        $(this).text($(this).text().toLowerCase());
                    })
                } else {
                    uppercase = true;
                    $(this).addClass('uppercase');
                    $('#t1 .sub').each(function (e) {
                        $(this).text($(this).text().toUpperCase());
                    })
                }
            }
            // alert('togglecase');
        });
        //$('#widgets').html(widgetString);
        $('.widget.vid').each(function (e) {
            $(this).css('background-image', 'url(https://manager.media.reallygreatreading.com/object/preview-link/' + $(this).attr('vid') + ')');
        })

        $('.tLabel').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                var parentID = $(this).parent().attr('id');
                if ($(this).parent().attr('style') == 'bottom: 0em;') {
                    $(this).parent().css('bottom', '-9.8em');
                    $('.tabs .preset').attr('tabindex', '-1');
                    $('.tabs .widget').attr('tabindex', '-1');
                    $('.tabs .vidBub').attr('tabindex', '-1');
                    $('.tabs .uclc').attr('tabindex', '-1');
                } else {
                    $(this).parent().css('bottom', '0em');
                    $(this).parent().css('bottom', '0em');
                    $('.tabs .preset').attr('tabindex', '-1');
                    $('.tabs .widget').attr('tabindex', '-1');
                    $('#' + parentID + ' .preset').attr('tabindex', '0');
                    $('#' + parentID + ' .widget').attr('tabindex', '0');
                    $('.tabs .uclc').attr('tabindex', '0');
                    $('.tabs .vidBub').attr('tabindex', '0');
                    $('.tab:not(#' + parentID + ')').css('bottom', '-9.8em');
                }
            }
        });
        $('.tLabel').bind('click', function (e) {
            var parentID = $(this).parent().attr('id');
            if ($(this).parent().attr('style') == 'bottom: 0em;') {
                $(this).parent().css('bottom', '-9.8em');
                $('.tabs .preset').attr('tabindex', '-1');
                $('.tabs .widget').attr('tabindex', '-1');
                $('.tabs .vidBub').attr('tabindex', '-1');
                $('.tabs .uclc').attr('tabindex', '-1');

            } else {
                $(this).parent().css('bottom', '0em');
                var parentID = $(this).parent().attr('id');
                $('.tabs .preset').attr('tabindex', '-1');
                $('.tabs .widget').attr('tabindex', '-1');
                $('#' + parentID + ' .preset').attr('tabindex', '0');
                $('#' + parentID + ' .widget').attr('tabindex', '0');
                $('.tabs .uclc').attr('tabindex', '0');
                $('.tabs .vidBub').attr('tabindex', '0');

                $('.tab:not(#' + parentID + ')').css('bottom', '-9.8em');
            }
        });

        $('.preset').bind('click', function (e) {
            addTile(this);
        });

        $('.preset').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                addTile(this);
            }
        });
                $('.digraph').bind('click', function (e) {
            addTile(this);
        });

        $('.digraph').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                addTile(this);
            }
        });
        $('.vidBub').bind('click', function (e) {
            //alert('add video');
            addVideoBubble16x9('d06ce940-8a68-4ff0-ba6f-67645923f914');
            //$('#widgets').html('video  here');
        });
        $('.vidBub').bind('keydown', function (e) {
            //alert('add video');
            if (e.keyCode == 13) {
                addVideoBubble16x9('d06ce940-8a68-4ff0-ba6f-67645923f914');

            }
            //$('#widgets').html('video  here');
        });
        $('.widget.vid').bind('click', function (e) {
            //alert('add video');
            //if ($(this).attr('vplay') == 'false') {
            //addVideo('23189c13-078d-425b-b24c-dd57f40740a3');
            //$(this).attr('vplay', 'true');
            // } else {
            //    $('#widgets').html('');
            //    $('#widgets').hide();
            //    $(this).attr('vplay', 'false');
            // }
            //$('#widgets').html('video  here');
            addVideoBubble16x9($(this).attr('vid'));

        });

        $('.widget.vid').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                //if ($(this).attr('vplay') == 'false') {
                addVideoBubble16x9($(this).attr('vid'));
                //} else {
                //    $('#widgets').html('');
                //    $('#widgets').hide();
                //    $(this).attr('vplay', 'false');
                //}
            }
        });


        $('.widget.web').bind('click', function (e) {
            //alert('add video');
            if ($(this).attr('linkOpen') == 'false') {
                addWeb($(this).attr('link'));
                $(this).attr('linkOpen', 'true');
            } else {
                $('#widgets').html('');
                $('#widgets').hide();
                $(this).attr('linkOpen', 'false');
            }
            //$('#widgets').html('video  here');
        });

        $('.widget.web').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                if ($(this).attr('linkOpen') == 'false') {
                    addWeb($(this).attr('link'));
                    $(this).attr('linkOpen', 'true');
                } else {
                    $('#widgets').html('');
                    $('#widgets').hide();
                    $(this).attr('linkOpen', 'false');
                }
            }
        });


        $('.widget.pre').bind('click', function (e) {
            //alert('add video');
            loadPre($(this).attr('link'));

            //$('#widgets').html('video  here');
        });

        $('.widget.pre').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                loadPre($(this).attr('link'));

            }
        });

    });
}
function loadTabs() {
    const urlParams = new URLSearchParams(window.location.search);
    // Extract the value of the 'video' parameter
    // Extract the value of the 'video' parameter
    const tabSet = urlParams.get('tabs');
    switch (tabSet) {
        case 'full':
            initTabs('tabs');
            break;
        default:
            initTabs('tabs');
            //initTabs('tabsBasic');
            break;
    }
}
$(document).ready(function () {
    loadTabs()
});