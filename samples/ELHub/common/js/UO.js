var objString = '';
var tabIndex = 2;



function buildProps(data) {
    var propString = '';
    if (data.top) {
        propString += ' top:' + data.top + ';';
    };

    if (data.left) {
        propString += ' left:' + data.left + ';';
    };
    if (data.bottom) {
        propString += ' bottom:' + data.bottom + ';';
    };

    if (data.right) {
        propString += ' right:' + data.right + ';';
    };

    if (data.opacity) {
        propString += ' opacity:' + data.opacity + ';';
    };


    if (data.height) {
        propString += ' height:' + data.height + ';';
    };

    if (data.width) {
        propString += ' width:' + data.width + ';';
    };

    if (data.visible) {
        if (data.visible == "false") {
            propString += ' display:none;';
        }

    };
    return propString;
}

function buildObjectString(data) {

    var htmlString = '';

    for (var o = 0; o < data.length; o++) {

        switch (data[o].type) {
            case 'sld':
                htmlString += '<div class="object ' + data[o].type;

                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };

                if (data[o].id) {
                    htmlString += '" id="' + data[o].id + '" ';
                };

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                htmlString += '" style="';
                htmlString += buildProps(data[o]);
                htmlString += '">';
                if (data[o].action == 'closeParent') {
                    //htmlString += '<div role="button" alt="close" aria-label="close" name="close" class="btnClose" tabindex="' + tabIndex + '"><div class="btnCloseFocus"></div><div class="btnCloseBack" role="button" alt="close" aria-label="close" name="close"></div></div>';
                    htmlString += '<div role="button" alt="close" aria-label="close" name="close" class="btnClose" tabindex="0"><div class="btnCloseFocus"></div><div class="btnCloseBack" role="button" alt="close" aria-label="close" name="close"></div></div>';

                    tabIndex++;
                }
                break;
            case 'ebk':
                htmlString += '<div class="object ebk ebkParent';

                htmlString += '" style="';
                htmlString += buildProps(data[o]);

                if (data[o].action) {
                    htmlString += '" action="' + data[o].action
                }

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target
                }

                tabIndex++;
                //  htmlString += '" tabindex="' + tabIndex + '"';

                htmlString += '" ';

                htmlString += '>';

                if (data[o].target != 'none') {
                   // htmlString += '<a href="' + data[o].target + '" target="_self" tabindex="' + tabIndex + '" class="ebkLink" ';
                    htmlString += '<a href="' + data[o].target + '" target="_self" tabindex="0" class="ebkLink" ';

                    if (data[o].alt) {
                        htmlString += 'alt="' + data[o].alt + '" ';
                    };

                    if (data[o].role) {
                        htmlString += 'role="' + data[o].role + '" ';
                    };
                    htmlString += '>';
                } else {
                    htmlString += '<div class="ebkLink blank"><div class="lockedGhost"><div class="image"></div></div>';
                }



                htmlString += '<div class="object ebk ebkBlank"></div><div class="object ebk ebkBlank2"></div><div class="object ebk ebkBlank3"></div><div class="object ebk ' + data[o].style + '" style="background-image: url(' + data[o].cover + ')"></div><div class="ebkLabel">' + data[o].label + '</div>';

                if (data[o].target != 'none') {
                    htmlString += '</a>';
                } else {
                    htmlString += '</div>';
                }

                break
            case 'ebkPlayer':
                htmlString += '<div class="object ebkPlayer ';
                /*if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };*/
                htmlString += '" style="';
                htmlString += buildProps(data[o]);

                if (data[o].action) {
                    htmlString += '" action="' + data[o].action
                }

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target
                }

                tabIndex++;
               // htmlString += '" tabindex="' + tabIndex + '"';
                htmlString += '" tabindex="0"';
                htmlString += '><iframe src=""></iframe>';
                if (data[o].action == 'closeParent') {
                    htmlString += '<div class="btnClose"></div>';
                }

                break
            case 'pge':
                htmlString += '<div class="object pge';
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';
                htmlString += buildProps(data[o]);

                if (data[o].action) {
                    htmlString += '" action="' + data[o].action
                }

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target
                }


                htmlString += '">';
                htmlString += buildPage(data[o], data[o].style);
                break
            case 'icn':
                htmlString += '<div ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                };
                /*if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };*/


                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].alt) {
                    htmlString += 'name="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                htmlString += 'class="object icn ' + data[o].content;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';
                htmlString += buildProps(data[o]);

                if (data[o].action) {
                    htmlString += '" action="' + data[o].action
                }

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target
                }


                htmlString += '">';
                break
            case 'grp':
                htmlString += '<div ';

                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" '
                }

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                htmlString += 'class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';
                htmlString += buildProps(data[o]);
                htmlString += '">';
                break
            case 'lst':
                htmlString += '<ul ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                }

                htmlString += 'class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);

                htmlString += '" ';

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                htmlString += '>';
                break;
            case 'itm':

                htmlString += '<li ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                }

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                if (data[o].action != "toggleChild") {
                    tabIndex++;
                    //htmlString += '" tabindex="' + tabIndex + '" ';
                    htmlString += '" tabindex="0" ';
                }


                htmlString += 'class="object ' + data[o].type;

                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                if (data[o].action) {
                    //console.log(data[o]);
                    htmlString += '" action="' + data[o].action;
                };
                if (data[o].target) {
                    //console.log(data[o]);
                    htmlString += '" target="' + data[o].target;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);

                htmlString += '">';
                htmlString += data[o].label;
                if (data[o].action == 'toggleChild') {
                    tabIndex++;
                    //htmlString += '<div class="toggleChildTrigger" tabindex="' + tabIndex + '"></div>' + data[o].content;
                    htmlString += '<div class="toggleChildTrigger" tabindex="0"></div>' + data[o].content;

                }
                if (data[o].action == 'openLink') {

                    tabIndex++;
                    //htmlString += '<a href="' + data[o].target + '" target="_blank" tabindex="' + tabIndex + '">' + data[o].content + '</a>';
                    htmlString += '<a href="' + data[o].target + '" target="_blank" tabindex="0">' + data[o].content + '</a>';
                }
                //htmlString += data[o].content;

                break

            case 'drp':
                htmlString += '<select ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                }

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };
                tabIndex++;
                //htmlString += 'tabindex="' + tabIndex + '" ';
                htmlString += 'tabindex="0" ';
                if (data[o].target) {
                    htmlString += 'target="' + data[o].target + '" ';
                };
                if (data[o].action) {
                    htmlString += 'action="' + data[o].action + '" ';
                };
                htmlString += 'class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';
                htmlString += buildProps(data[o]);
                htmlString += '">';
                break;
            case 'opt':

                htmlString += '<option ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                }

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };


                htmlString += 'class="object ' + data[o].type;

                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target;
                };
                if (data[o].value) {
                    htmlString += '" value="' + data[o].value;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);

                htmlString += '">';
                htmlString += data[o].label;
                if (data[o].action == 'toggleChild') {
                    tabIndex++;
                    //htmlString += '<div class="toggleChildTrigger" tabindex="' + tabIndex + '"></div>' + data[o].content;
                    htmlString += '<div class="toggleChildTrigger" tabindex="0"></div>' + data[o].content;

                }
                if (data[o].action == 'openLink') {

                    tabIndex++;
                    //htmlString += '<a href="' + data[o].target + '" target="_blank" tabindex="' + tabIndex + '">' + data[o].content + '</a>';
                    htmlString += '<a href="' + data[o].target + '" target="_blank" tabindex="0">' + data[o].content + '</a>';

                }
                //htmlString += data[o].content;

                break

            case 'btn':
                htmlString += '<div class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" ';
                tabIndex++;
                //htmlString += 'tabindex="' + tabIndex + '" ';
                htmlString += 'tabindex="0" ';

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                    htmlString += 'label="' + data[o].alt + '" ';
                    htmlString += 'name="' + data[o].alt + '" ';
                    htmlString += 'aria-label="' + data[o].alt + '" ';
                };


                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                };
                if (data[o].target) {
                    htmlString += 'target="' + data[o].target + '" ';
                }
                if (data[o].link) {
                    htmlString += 'link="' + data[o].link + '" ';
                }

                if (data[o].vlink) {
                    htmlString += 'vlink="' + data[o].vlink + '" ';
                }

                if (data[o].clink) {
                    htmlString += 'clink="' + data[o].clink + '" ';
                }

                if (data[o].tlink) {
                    htmlString += 'tlink="' + data[o].tlink + '" ';
                }

                if (data[o].action) {
                    htmlString += 'action="' + data[o].action + '" '
                }


                htmlString += 'style="';

                htmlString += buildProps(data[o]);
                htmlString += '"><div class="btnIcBack ' + data[o].style + '"></div>';
                if (data[o].alt) {
                    htmlString += '<div class="toolTip">' + data[o].alt + '</div>';
                };
                if (data[o].content) {
                    htmlString += data[o].content;
                }

                break

            case 'lnk':
                htmlString += '<a href=" ' + data[o].target + '" target="_blank" class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex + '" ';
                htmlString += '" tabindex="0" ';
                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                if (data[o].action) {
                    htmlString += '" action="' + data[o].action
                }

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target
                }
                htmlString += '" style="';

                htmlString += buildProps(data[o]);
                htmlString += '">' + data[o].content;
                break

            case 'txt':
                htmlString += '<div ';
                if (data[o].id) {
                    htmlString += 'id="' + data[o].id + '" ';
                };

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };
                htmlString += 'class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">' + data[o].content;
                break
            case 'img':
                htmlString += '<img src="' + data[o].content + '"  class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);

                htmlString += '" ';
                //htmlString += 'alt="default" ';
                htmlString += 'alt="' + data[o].alt + '" ';
                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };

                htmlString += '/>';
                break
            case 'htm':
                htmlString += '<iframe src="' + data[o].url + '" class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';


                htmlString += buildProps(data[o]);

                htmlString += '" ';

                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                if (data[o].role) {
                    htmlString += 'role="' + data[o].role + '" ';
                };


                htmlString += '>';
                break
            case 'med':
                htmlString += '<div class="object ' + data[o].type + ' container';
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">';
                break
            case 'chat':
                htmlString += '<div class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">' + data[o].content;
                break
            case 'chatInput':
                htmlString += '<input type="text" placeholder="' + data[o].content + '" class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex;
                htmlString += '" tabindex="' + 0;
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '"/>';
                break
            case 'window':
                htmlString += '<iframe src="' + data[o].content + '" class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">';
                break
            case 'slider':
                htmlString += '<input type="range" min="1" max="1000" ';
                if (data[o].value) {
                    htmlString += 'value="' + data[o].value + '" ';
                    htmlString += 'value="500" ';
                };
                if (data[o].alt) {
                    htmlString += 'alt="' + data[o].alt + '" ';
                };

                htmlString += 'class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };



                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex;
                htmlString += '" tabindex="' + 0;
                htmlString += '" style="';

                htmlString += buildProps(data[o]);

                if (data[o].target) {
                    htmlString += '" target="' + data[o].target;
                }
                if (data[o].action) {
                    htmlString += '" action="' + data[o].action;
                }
                htmlString += '"/>';
                break
            case 'inputRadio':
                htmlString += '<input type="radio" value="0" class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex;
                htmlString += '" tabindex="' + 0;
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '"/>';
                break
            case 'inputCheck':
                htmlString += '<input type="checkbox" value="0" class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex;
                htmlString += '" tabindex="' + 0;
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '"/>';
                break
            case 'inputDateTime':
                htmlString += '<input type="datetime-local" class="' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                tabIndex++;
                //htmlString += '" tabindex="' + tabIndex;
                htmlString += '" tabindex="' + 0;
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '"/>';
                break
            case 'aud':
                htmlString += '<div class="object ' + data[o].type;
                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };
                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">';




                htmlString += '<audio nocontrols';

                if (data[o].id) {
                    htmlString += ' id="' + data[o].id + '" ';
                }


                htmlString += '>';
                htmlString += '<source src="' + data[o].content + '" type="audio/mp3" />';
                htmlString += '</audio>';

                break

            case 'vid':
                htmlString += '<div class="object ' + data[o].type;

                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };

                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">';


                htmlString += '<div class="vid"><video id="' + data[o].id + '" data-dashjs-player="" src="' + data[o].content + '"  >';
                htmlString += '<track default kind="captions" srclang="en" src="' + data[o].track + '" crossorigin="anonymous" />';
                if (data[o].states) {
                    htmlString += '<track kind="actions" srclang="en" src="' + data[o].states + '" />';
                }
                //htmlString += '</video></div><script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>';
                htmlString += '</video></div><script src="common/js/dash.all.min.js"></script>';

                break;
            case 'vidLocal':
                htmlString += '<div class="object ' + data[o].type;

                if (data[o].style) {
                    htmlString += ' ' + data[o].style;
                };

                htmlString += '" style="';

                htmlString += buildProps(data[o]);


                htmlString += '">';


                //BUILD VIDEO PLAYER HERE

                htmlString += '<video nocontrols';

                if (data[o].id) {
                    htmlString += ' id="' + data[o].id + '" ';
                }
                if (data[o].bounce) {
                    htmlString += ' bounce="' + data[o].bounce + '" ';
                }

                htmlString += ' style="';

                htmlString += buildProps(data[o]);


                htmlString += '" crossorigin="anonymous">';



                htmlString += '<source src="' + data[o].content + '" />';

                htmlString += '<track default kind="captions" srclang="en" src="' + data[o].track + '" />';
                if (data[o].states) {
                    htmlString += '<track kind="actions" srclang="en" src="' + data[o].states + '" />';
                }
                htmlString += '</video>';

                if (data[o].style) {

                    if (data[o].style == 'playOverlay') {
                        htmlString += '<div class="playOverlay">PLAY</div>';
                    }

                }


                break


        }


        if (data[o].children) {
            htmlString += buildObjectString(data[o].children);
        }

        switch (data[o].type) {
            case 'sld':
                htmlString += '</div>';
                break;
            case 'ebk':
                htmlString += '</div></a>';
                break
            case 'ebkPlayer':
                htmlString += '</div>';
                break
            case 'pge':
                htmlString += '</div>';
                break
            case 'icn':
                htmlString += '</div>';
                break
            case 'grp':
                htmlString += '</div>';
                break
            case 'lst':
                htmlString += '</ul>';
                break
            case 'itm':
                htmlString += '</li>';
                break
            case 'drp':
                htmlString += '</select>';
                break
            case 'opt':
                htmlString += '</option>';
                break
            case 'btn':
                htmlString += '</div>';
                break
            case 'lnk':
                htmlString += '</a>';
                break
            case 'txt':
                htmlString += '</div>';
                break
            case 'med':
                htmlString += '</div>';
                break
            case 'chat':
                htmlString += '</div>';
                break
            case 'window':
                htmlString += '</iframe>';
                break
            case 'slider':
                htmlString += '';
                break
            case 'aud':
                htmlString += '</div>';
                break
            case 'vid':
                htmlString += '</div>';
                break
            case 'vidLocal':
                htmlString += '</div>';
                break
            case 'img':
                htmlString += '';
                break
            case 'htm':
                htmlString += '</iframe>';
                break

        }

    }


    return htmlString;
}

function buildObjects(data) {
    console.log('buildObjects Data:');
    console.log(data);
    tabIndex = tabCount;
    var testString = '';
    if (data.length > 0) {
        testString = buildObjectString(data[0].content);
    }

    $('#wrapper').html(testString);


    //
    $('.slider.audio').val(500);

    //SDW ADV Subgroup with Ghost
    $('.icn[action="openGroupGhost"]').bind('click', function () {
        var target = $(this).attr('target');
        $('#' + target).fadeIn(200);
        $('.grpGhost').fadeIn(300);

    });
    $('.icn[action="openGroupGhost"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('#' + target).fadeIn(200);
            $('.grpGhost').fadeIn(300);

        };
    });
    $('.btn[action="closeGroupGhost"]').bind('click', function () {
        var target = $(this).attr('target');
        $('#' + target).fadeOut(200);
        $('.grpGhost').fadeOut(300);

    });
    $('.btn[action="closeGroupGhost"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('#' + target).fadeOut(200);
            $('.grpGhost').fadeOut(300);

        };
    });



    $('.btn[action="closeVideoFull"]').bind('click', function (e) {
        $(this).parent().fadeOut(500);
        var parent = $(this).parent().parent().attr('id');
        $('#' + parent + ' .icn').show();
        $('#' + parent + ' .btnClose').show();
        var target = 'video_html5_api';
        var video = $('#' + target).get(0);
        video.pause();
    });

    $('.btn[action="closeVideoFull"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $(this).parent().fadeOut(500);
            var parent = $(this).parent().parent().attr('id');
            $('#' + parent + ' .icn').show();
            $('#' + parent + ' .btnClose').show();
            var target = 'video_html5_api';
            var video = $('#' + target).get(0);
            video.pause();
        }
    });


    $('.icn[action="toggleSingle"]').bind('click', function () {
        toggleSingle('#' + $(this).attr('target'));
    });

    //Code for drop downs in soundwall basic
    $('.icn[action="toggleMulti"] .hotspot').bind('click', function () {
        $('#' + $(this).parent().attr('target')).slideToggle(500);
    });

    $('.icn[action="toggleMulti"] .hotspot').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            console.log('keyDown toggleMulti');
            $('#' + $(this).parent().attr('target')).slideToggle(500);
        };
    });

    //List Stuff here
    $('.btn[action="showList"]').bind('click', function (e) {
        var target = $(this).attr('target');
        var top = $(this).parent().attr('id');
        $('#' + top + ' ul').not(document.getElementById(target)).hide();
        $('#' + target).slideToggle(250);
    });

    $('.icn[action="showList"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            var top = $(this).parent().attr('id');
            $('#' + top + ' ul').not(document.getElementById(target)).hide();
            $('#' + target).slideToggle(250);
        };
    });

    $('.btn[action="toggleList"]').bind('click', function (e) {
        var target = $(this).attr('target');
        $('#' + target).slideToggle(250);
    });

    $('.btn[action="toggleList"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('#' + target).slideToggle(250);
        };
    });

    /*SHOW GROUP FOR EL SUPPLEMENTAL */

    $('.btn[action="supShowGroup"]').bind('click', function (e) {
        var target = $(this).attr('target');
        $('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        $('#' + target).fadeIn(500);
    });

    $('.btn[action="supShowGroup"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('.grp:not(#grp0,#' + target + ')').slideUp(100);
            $('#' + target).slideDown(250);
        };
    });

    $('.itm[action="supShowGroup"]').bind('click', function (e) {
        var target = $(this).attr('target');
        $('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        $('#' + target).fadeIn(500);
    });

    $('.itm[action="supShowGroup"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('.grp:not(#grp0,#' + target + ')').slideUp(100);
            $('#' + target).slideDown(250);
        };
    });

    /*SHOW VIDEO FOR EL SUPPLEMENTAL */

    $('.btn[action="supShowVideo"]').bind('click', function (e) {
        //var target = $(this).attr('target');
        //$('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        //$('#' + target).fadeIn(500);
        var stubLength = $(this).attr('id').length;
        var stub = $(this).attr('id').substr(3, stubLength - 6);
        var parent = '#grp' + stub;
        $(parent).hide();
        $('#video0').attr('parent', parent);

        //swap video here

        var video = $('#video1').get(0);
        var vlink = $(this).attr('vlink');

        var clink = $(this).attr('clink');
        var tlink = $(this).attr('tlink');
        supVideoLoad(vlink, clink, tlink);
        //video.attachSource(vlink);

        //$('#video1').attr('src',vlink);


        $('#video0').fadeIn(500);
    });

    $('.btn[action="supShowVideo"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var stubLength = $(this).attr('id').length;
            var stub = $(this).attr('id').substr(3, stubLength - 6);
            var parent = '#grp' + stub;
            $(parent).hide();
            $('#video0').attr('parent', parent);

            //swap video here

            var video = $('#video1').get(0);
            var vlink = $(this).attr('vlink');

            var clink = $(this).attr('clink');
            var tlink = $(this).attr('tlink');
            supVideoLoad(vlink, clink, tlink);
            //video.attachSource(vlink);

            //$('#video1').attr('src',vlink);


            $('#video0').fadeIn(500);
        };
    });

    $('.itm[action="supShowVideo"]').bind('click', function (e) {
        //var target = $(this).attr('target');
        //$('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        //$('#' + target).fadeIn(500);

        $('#video0').fadeIn(500);
    });

    $('.itm[action="supShowVideo"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            // var target = $(this).attr('target');
            // $('.grp:not(#grp0,#' + target + ')').slideUp(100);
            //$('#' + target).slideDown(250);
            $('#video0').fadeIn(500);
        };
    });

    /*EL Resource Hide Video*/
    $('.btn[action="supCloseVideo"]').bind('click', function (e) {
        //var target = $(this).attr('target');
        //$('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        //$('#' + target).fadeIn(500);
        /*var video = $('#video1').get(0);
        video.currentTime = 0;
        video.pause();
        var parent = $('#video0').attr('parent');
        $('.supSlideNavigation').show();
        $('#video0').fadeOut(250);
        $(parent).fadeIn(500);*/
        $('#video0').fadeOut(200);
        $('.vidBox').html('');
        var parent = $('#video0').attr('parent');
        $('.supSlideNavigation').show();
        $('#video0').fadeOut(250);
        $(parent).fadeIn(500);
    });

    $('.btn[action="supCloseVideo"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            //var target = $(this).attr('target');
            //$('.grp:not(#grp0,#' + target + ')').slideUp(100);
            //$('#' + target).slideDown(250);
            var video = $('#video1').get(0);
            video.currentTime = 0;
            video.pause();
            var parent = $('#video0').attr('parent');
            $('.supSlideNavigation').show();
            $('#video0').fadeOut(250);
            $(parent).fadeIn(500);
        };
    });

    $('.itm[action="supCloseVideo"]').bind('click', function (e) {
        //var target = $(this).attr('target');
        //$('.grp:not(#grp0,#' + target + ')').fadeOut(100);
        //$('#' + target).fadeIn(500);
        var video = $('#video1').get(0);
        video.currentTime = 0;
        video.pause();
        var parent = $('#video0').attr('parent');
        $('.supSlideNavigation').show();
        $('#video0').fadeOut(250);
        $(parent).fadeIn(500);
    });

    $('.itm[action="supCloseVideo"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            // var target = $(this).attr('target');
            // $('.grp:not(#grp0,#' + target + ')').slideUp(100);
            //$('#' + target).slideDown(250);
            var video = $('#video1').get(0);
            video.currentTime = 0;
            video.pause();
            var parent = $('#video0').attr('parent');
            $('.supSlideNavigation').show();
            $('#video0').fadeOut(250);
            $(parent).fadeIn(500);
        };
    });






    $('.supNav0').bind('click', function (e) {

        $('.supNav0').removeClass('active');
        $(this).addClass('active');

    });

    $('.supNav0').bind('keydown', function (e) {
        if (e.keyCode == 13) {

            $('.supNav0').removeClass('active');
            $(this).addClass('active');

        };
    });


    /*PUTTING TRIGGERS HERE FOR SHOWING EL STUFF*/


    $('.itm[action="showGroup"]').bind('click', function (e) {
        var target = $(this).attr('target');
        $('#' + target).slideDown(250);
        $('#' + $(this).parent().attr('id')).fadeOut(200);
        // (".thisclass:not(#thisid,#thatid)").doAction();
    });

    $('.itm[action="showGroup"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('#' + target).slideDown(250);
        };
    });


    //End List Stuff

    //VITC2 Menu
    $('.vtc .btn[action="supShowSub"]').bind('click', function (e) {
        var target = $(this).attr('target');
        $('.vtc .grp').css('z-index', '0');
        $('#' + target).css('z-index', '2');
        $('.subOpen').parent().css('z-index', '1');
        //$('.vtc .btnVITCSub').slideUp(200);
        $(this).toggleClass('subOpen');
        //$('.vtc .btnVITCSubShow').slideDown(200);
        //$('.vtc #'+target+' .btnVITCSubShow').slideUp(200);
        if ($(this).hasClass('subOpen')) {
            $('.vtc #' + target + ' .btnVITCSub').slideDown(200);

        } else {
            $('.vtc #' + target + ' .btnVITCSub').slideUp(200);

        }


    });

    $('.vtc .btn[action="supShowSub"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('.vtc .grp').css('z-index', '0');
            $('#' + target).css('z-index', '2');
            $('.subOpen').parent().css('z-index', '1');
            //$('.vtc .btnVITCSub').slideUp(200);
            $(this).toggleClass('subOpen');
            //$('.vtc .btnVITCSubShow').slideDown(200);
            //$('.vtc #'+target+' .btnVITCSubShow').slideUp(200);
            if ($(this).hasClass('subOpen')) {
                $('.vtc #' + target + ' .btnVITCSub').slideDown(200);

            } else {
                $('.vtc #' + target + ' .btnVITCSub').slideUp(200);

            }

        }
    });

    $('.icn[action="toggleMulti"] .vidImgBtn').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('.vtc #' + target + ' .btnVITCSub').slideToggle(200);
        };
    });
    /////LAUNCH VIDEO PLAYER FROM BUTTON HERE
    $('.icn[action="toggleMulti"] .vidImgBtn').bind('click', function (e) {
        var target = $(this).parent().attr('target');
        var url = $(this).parent().attr('link');
        var parent = $(this).parent().parent().parent().parent().attr('id');
        openVideoFull(target, url, parent);
    });

    $('.icn[action="toggleMulti"] .vidImgBtn').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).parent().attr('target');
            var url = $(this).parent().attr('link');
            var parent = $(this).parent().parent().parent().parent().attr('id');
            openVideoFull(target, url, parent);
        };
    });

    $('.icn[action="buttonCtrl"]').bind('click', function () {
        openSingle('#' + $(this).attr('target'), $(this).attr('id'));
    });

    $('.btn[action="openURL"]').bind('click', function () {
        openURL($(this).attr('target'));
    });

    $('.btn[action="openURL"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            openURL($(this).attr('target'));
        };
    });

    $('.btn[action="openURLNew"]').bind('click', function () {
        openURLNew('#' + $(this).attr('target'), $(this).attr('id'));
    });

    $('.btn[action="openURLNew"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            openURLNew('#' + $(this).attr('target'), $(this).attr('id'));
        };
    });

    $('li').bind('click', function () {
        //alert('toggleTarget');
    });



    $('.btn[action="videoFullScreen"]').bind('click', function () {
        var video = $('#video1').get(0);
        video.requestFullscreen();
    });
    $('.btn[action="videoFullScreen"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {

        };
    });



    $('.btn[action="videoCaptionsToggle"]').bind('click', function () {
        $(this).toggleClass('captionsOff');
        if ($(this).hasClass('captionsOff')) {
            $('#' + $(this).attr('target')).fadeOut(250);
        } else {
            $('#' + $(this).attr('target')).fadeIn(200);
        }
    });
    $('.btn[action="videoCaptionsToggle"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $(this).toggleClass('captionsOff');
            if ($(this).hasClass('captionsOff')) {
                $('#' + $(this).attr('target')).fadeOut(250);
            } else {
                $('#' + $(this).attr('target')).fadeIn(200);
            }
        };
    });


    $('.btn[action="replayVid"]').bind('click', function () {
        var target = 'video_html5_api';
        var video = $('#' + target).get(0);
        video.currentTime = 0;
    });
    $('.btn[action="replayVid"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = 'video_html5_api';
            var video = $('#' + target).get(0);
            video.currentTime = 0;
        };
    });

    $('.btn[action="playVid"]').bind('click', function () {
        var target = $(this).attr('target');
        // $('#' + target).requestFullscreen();
        var video = $('#video1').get(0);
        video.play();

        if ($(this).hasClass('paused')) {
            console.log('pause');
            $(this).removeClass('paused');
            video.pause();
        } else {
            console.log('play');
            $(this).addClass('paused');
            video.play();
        }
    });

    $('.btn[action="playVid"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            var video = $('#' + target).get(0);
            if ($(this).hasClass('paused')) {
                $(this).removeClass('paused');
                video.pause();
            } else {
                $(this).addClass('paused');
                video.play();
            }
        };
    });

    $('.btn[action="muteVid"]').bind('click', function () {
        var target = $(this).attr('target');
        $('.audio').slideDown(500);
        var video = $('#' + target).get(0);
        if ($(this).hasClass('muted')) {
            $(this).removeClass('muted');
            if ($(this).attr('prevLevel')) {
                video.volume = $(this).attr('prevLevel');
            } else {
                video.volume = .75;
            }

        } else {
            $(this).addClass('muted');
            $(this).attr('prevLevel', video.volume);
            video.volume = 0;
        }

    });
    $('.btn[action="muteVid"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var target = $(this).attr('target');
            $('.audio').slideDown(500);
            var video = $('#' + target).get(0);
            if ($(this).hasClass('muted')) {
                $(this).removeClass('muted');
                if ($(this).attr('prevLevel')) {
                    video.volume = $(this).attr('prevLevel');
                } else {
                    video.volume = .75;
                }

            } else {
                $(this).addClass('muted');
                $(this).attr('prevLevel', video.volume);
                video.volume = 0;
            }
        };
    });

    $('.btn[action="openTranscript"]').bind('click', function () {
        openURL($(this).attr('target'));
    });

    $('.btn[action="openTranscript"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            openURL($(this).attr('target'));
        }
    });

    $('.btn[action="openPDF"]').bind('click', function () {
       // window.location = $(this).attr('target');
       openURL($(this).attr('target'));
    });

    $('.btn[action="openPDF"]').bind('keydown', function (e) {
        if (e.keyCode == 13) {
           // window.location = $(this).attr('target');
           openURL($(this).attr('target'));
        }
    });

    $('.drp[action="setVideoSource"]').bind('change', function () {
        var target = $(this).attr('target');
        //alert($(this + ' option:selected').index());
        $('#' + target).attr('src', $(this).val());
        // $("#dropDownMenuKategorie option:selected").index()
    });


    //END VIDEO OBJECTS//


    initializeObjects(data);
}

function positionObjects(data) {
    for (var o = 0; o < data.length; o++) {

    }
}

function initializeObjects(data) {

    $('.sdw .sld').draggable(true);
    //$('.med .sld').draggable(true);

    $('.book1').click(function () {
        $('.book1 .pge').slideDown(500);
    });

    $('.btnClose').bind('click', function () {
        $('#wrapper').html('');
    });

    $('.btnClose').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            $('#wrapper').html('');
        }
    });


}
