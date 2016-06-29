/*
 * script.js
 *
 * Copyright 2014 CREAMU Inc.
 * http://www.creamu.co.jp/
 *
 */

$(function() {

	$("body").hide().delay(1000).fadeIn(1000);

    if(jQuery.browser.msie && jQuery.browser.version < 9){
    }else {
		$('a').hover(
			function(){
				$(this).stop().animate({opacity: 0.5},200);
			},
			function(){
				$(this).stop().animate({opacity: 1},400);
			}
		);
	}

	$("#nav").sticky({
		topSpacing : 0
	});

});