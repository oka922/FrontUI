$(window).load(function(){

	var heightP = $(".megadrop").height();
	dropdown(".megadrop",".nav_inner_detail",550,hightP,$(".megadrop").position());
});


//使いまわせるdropdown
function dropdown(drop,an,sp,hi,pn){
	var target = drop;
	var ancer = an;
	var speed = sp;
	var hight = hi;
	var pnavi = pn;
	console.log(hight);
	$(ancer).mouseover(function(){
		$(target,this).css({"display": "block"});
		$(target,this).animate({"top":pnavi.top}, speed);
	})
	$(ancer).mouseleave(function(){
				$(target,this).animate({"top":pnavi.top-hight}, speed);
				$(target,this).css({"display": "none"});
	})
}
