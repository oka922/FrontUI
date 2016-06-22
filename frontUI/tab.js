$(window).load(function(){
		tab_change(item_info,item_sell,item_news);
});





function tab_change(tab1,tab2,tab3){

	var $firstTab = $("tab1");
 	var	$secondTab = $("tab2");
	var $thirdTab = $("tab3");
	indicator_animate($firstTab,$secondTab,$thirdTab,indicator,50,300,450);
			$$firstTab.on('click',function() {
				$firstTab.addClass("is-show");
				$secondTab.removeClass("is-show");
				$thirdTab.removeClass("is-show");
			});

			$secondTab.on('click',function() {
				$firstTab.removeClass("is-show");
				$secondTab.addClass("is-show");
				$thirdTab.removeClass("is-show");
			});

			$thirdTab.on('click',function() {
				$firstTab.removeClass("is-show");
				$secondTab.removeClass("is-show");
				$thirdTab.addClass("is-show");
			});

});


function indicator_animate(tab1,tab2,tab3,indicator,ani_wid,ani_wid2,ani_wid3){

	$("tab1").on('click',function() {
		$("indicator").animate({"left": ani_wid+"px"}, 250,"easeOutQuad");
			//$(".galleryBlock").css({"display":"block"});
	});

	$("tab2").on('click',function() {
		$("indicator").animate({"left": ani_wid2+"px"}, 250,"easeOutQuad");
		//$(".galleryBlock").css({"display":"none"});
	});
	$("tab3").on('click',function() {
		$("indicator").animate({"left": ani_wid3+"px"}, 250,"easeOutQuad");
		//$(".galleryBlock").css({"display":"none"});
	});
}
