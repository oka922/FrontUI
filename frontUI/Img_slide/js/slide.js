//slide

$(window).load(function() {
	ImgSlide(".item");
});


function ImgSlide(item_slide) {

		var img = $(item_slide),
		num = img.length,
		count = 0,//表示されている画像の順番
		interval = 3000;
		setInterval(function() {
		img.eq(count).addClass("show");//eqで配列の番号指定ができる
		count = count + 1;//次の画像になる。
    img.eq(count-2).removeClass("show");
		if (num<=count) {
			count = 0;
		};
		}, interval);

}
