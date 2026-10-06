/*E-Book Code Here*/

function buildPage(page, type){
	console.log(page);
	var htmlString = '<h1>in here</h1>';
	switch (type) {
		case 'imageLtextR':
			htmlString += '<img class="img" src="html/library/book1/img/img1.jpg"/>';
			htmlString += '<div class="txt">'+page.text+'</div>';
			break;
	}
	return htmlString;
}

function buildNav(book) {
	//$('.book1').click(function(){alert('clickbook')})
}
/*End E-book Code*/