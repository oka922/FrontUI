$(function(){
	$("a.count").click(function() {      
	  $(this).parent().toggleClass("liked");
	});
	$("a.icon").click(function() {      
	  $(this).parent().parent().toggleClass("liked");
	});
})