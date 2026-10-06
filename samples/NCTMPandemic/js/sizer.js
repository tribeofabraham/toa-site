var currentWidth;
var referenceWidth = 1024;

function sizer()
{
    
    var cWidth = $('body').width();
    var cHeight = $('body').height();
    //watch for screen being stretched. breakpoint is .5
    if (cHeight/cWidth <1) {
        $('#wrapper').css('width', (cHeight) + 'px');
         $('#wrapper').css('height', '98%');
        $('#wrapper').css('margin-top', '.25em'); 
        //console.log('horiz')
    } else {
        $('#wrapper').css('height', (cWidth) + 'px');
        $('#wrapper').css('width', '98%');
        $('#wrapper').css('margin-top', (cHeight-cWidth)/3 + 'px');
        //console.log('vert')
    }
    
    
	currentWidth = $('#wrapper').width();
	sizePercent = (currentWidth/referenceWidth)*100;
	$('#wrapper').css('font-size', sizePercent+'%');
    
    $('#graphCanvas').css('height', $('#graphCanvas').width/2 + 'px');
} 





$(document).ready(function(e) {
	sizer();

});
$(window).resize(function()
{
	sizer();
});
