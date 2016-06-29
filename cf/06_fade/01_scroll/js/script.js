/*
 * fade.js
 *
 * Copyright 2013 CREAMU Inc.
 * http://www.creamu.co.jp/
 *
 */

$(function() {

	$('#txt_meta,#hl').delay(150).animate({opacity : 1}, 1000);

	$('.box').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1
			}, 1000);
		});
	});

});