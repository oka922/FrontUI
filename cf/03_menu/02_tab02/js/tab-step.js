$(function(){
	$(".step-group section:not("+$("#steps a.active").attr("href")+")").hide();
	$("#steps a").click(function(){
		$("#steps a").removeClass("active");
		$(this).addClass("active");
		$(".step-group section").fadeOut();
		$($(this).attr("href")).fadeIn();
		return false;
	});
});