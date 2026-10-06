var currentWidth;
var referenceWidth = 1024;
var active = true;
var resize = true;
function sizer() {
	if (resize) {
		currentWidth = $('body').width();
		sizePercent = (currentWidth / referenceWidth) * 100;
		$('body').css('font-size', sizePercent + '%');
	} else {
		$('body').css('font-size', '14px');
	}
}


$(document).ready(function () {
	
	$('#toggleSizer').bind('click', function(){
		active = !active;
		sizer();
	});

	sizer();
    // window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
	$(window).resize(function () {
		sizer();
	});
})
