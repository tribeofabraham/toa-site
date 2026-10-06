var currentWidth;
var referenceWidth = 400;

function sizer() {
	if (resize) {
		currentWidth = $('body').width();
		sizePercent = (currentWidth / referenceWidth) * 100;
		var sizeEm = (currentWidth / referenceWidth);
		$('html').css('font-size', sizeEm + 'em');
	} else {
		$('html').css('font-size', '24px');
	}
}


$(document).ready(function () {


	sizer();
    // window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
	$(window).resize(function () {
		sizer();
	});
})
