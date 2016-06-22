
//画像にホバーすると、下からdetailが現れる
function popup(popup,ancer_img){
						var $popup = $("popup"),
						$("ancer_img").hover(
							function() {
								$(ancer_img, this).addClass("is-popup");
							},
							function(){
								$(ancer_img, this).removeClass("is-popup");
							}
						);
}
