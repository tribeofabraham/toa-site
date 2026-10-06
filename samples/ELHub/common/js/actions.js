function toggleMulti(trgt) {
	$(trgt).slideToggle(500);
}

function toggleSingle(trgt) {
   $('.object.icn').css('z-index','100');
    console.log(trgt);
    $(trgt).parent().css('z-index','1000');
    $('.obj').not(trgt).fadeOut(500);
	$(trgt).fadeIn(500);
}

function openSingle(trgt, trigger) {
    console.log('openSingle--------');
    console.log(trgt);
    console.log(trigger);
   $('.object.icn').css('z-index','100');
    $(trgt).css('z-index','1000');
    //$('.obj').not(trgt).fadeOut(500);
	$(trgt).fadeIn(500);
    $(trgt + ' .playOverlay').bind('click', function(e){
        //alert('play video');
        $(trgt + ' .playOverlay .playOverlay').fadeOut(200);
        document.getElementById('vidA1').play();
    });
    $(trgt + ' .btn.closeX').bind('click', function(e){
        closeSingle(trgt);
    });
}

function closeSingle(trgt) {
    $(trgt).fadeOut(250);
}

function openURL(trgt){
    window.open(trgt, '_blank');
}

function openURLNew(trgt){
    window.open('../../../'+ trgt, '_blank');
}

/*function openVideoFull(target, url, parent){
   $('#' + parent + ' .icn').hide();
    $('#' + parent + ' .btnClose').hide();
    //alert(url);
    $('#' + target + ' source').attr('src', url);
    $('#' + target).attr('autoplay', true);
    $('.vidFull').fadeIn(500);  
    $('.vidFull input').val(0);
    $('.vidFull .btn[action="playVid"]').addClass('paused');
}*/