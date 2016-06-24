
//指定した値までスクロールする。
//home画面に戻る。

$(window).load(function() {
				drop_ancer("#navi",1530);
 });

function drop_ancer(ancer,drop_value){
	$(ancer).on('click',function() {
	var scrPosition = $(window).scrollTop();
	var scrBaselReport = drop_value;
	scrPosition = scrBaselReport;
	$( 'html,body' ).animate( {scrollTop:scrPosition} , 'slow' ) ;
	});
}
