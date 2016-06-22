

//dropdown
$(window).load(function(){

	var heightP = $(".megadrop").height();
	dropdown(".megadrop",".nav_inner_detail",550,hightP,$(".megadrop").position());
});




//画像切り替え $(window).om('resize load'function(){});のイベントで実行する
function changeImage(ancer_width,ancer_class,sp_img_url,pc_img_url){

	var window_width = $(window).width();
	var width_precise= window.innerWidth;
	if(ancer_width > width_precise){
		$("ancer_class").attr("src","sp_img_url");
	}
	if(ancer_width <= width_precise){
		$("ancer_class").attr("src","pc_img_url");
	}
}


//画像切り替え
//ancer_width　は大体640pxにする。
//一つ一つ消す、消さないを決めるのは面倒くさそう。
function changeImage(ancer_width,hide_class,show_class){
	var window_width = $(window).width();
	var width_precise= window.innerWidth;

	if(ancer_width > width_precise){
		$("hide_class").hide();
		$("show_class").show();
	}
	if(ancer_width <= width_precise){
		$("hide_class").show();
		$("show_class").hide();
	}
}
