$(function() {
	$(".secTab01 .ul_tab01 li").each(function(){	   
	$(this).click(function() {
		var num = $(this).parent('.ul_tab01').children("li").index(this);
		$(this).parent('.ul_tab01').parent('.secTab01').children('.tabContent01').addClass('disNon');
		$(this).parent('.ul_tab01').parent('.secTab01').children('.tabContent01').eq(num).removeClass('disNon');
		$(this).parent(".ul_tab01").children('li').removeClass('current');
		$(this).addClass('current');
		});
	});
});