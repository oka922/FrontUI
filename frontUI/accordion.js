$(window).load(function(){
	accodion(btn_open,research);
});

function accodion(btn,content){
	$("btn").on("click",function(){
			$("content").slideToggle();
	});
}
