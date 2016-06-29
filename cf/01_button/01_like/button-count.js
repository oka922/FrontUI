$(function(){
	$("a.count").click(function(){
		var total=parseInt($(this).html());
		if($(this).parent().hasClass("liked")){total-=1;}
		else{total+=1}
			$(this).html(total);
		$(this).parent().toggleClass("liked");
		return false;
	});
	$("a.icon").click(function(){
		var total=parseInt($(this).parent().siblings("a.count").first().html());
		if($(this).parent().parent().hasClass("liked")){total-=1;}
		else{total+=1;}
		$(this).parent().siblings('a.count').first().html(total);
		$(this).parent().parent().toggleClass("liked");
		return false;
	});
});
