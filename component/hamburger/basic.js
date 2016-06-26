	


				$(window).load(function() {
					

					var navigation = $(".header-inner-nav");
					var close_btn = $(".menu-btn");
					var show =$(".show");
					var line =$(".line");
					var close =$(".close-btn");

					$(".menu-btn").click(function() {
					console.log("5");
					navigation.toggleClass("onclick");
					
					line.toggleClass("show");
					close.toggleClass("show");

					});


				});

				$(window).scroll(function() {

					var scrPosition = $(window).scrollTop();//現在いる場所は真上からの距離
					var wH = $(window).height();//窓の大きさ
					//var obj = $(".scroll-opacity").offset().top;//要素の高さ
					var window_top =   wH - scrPosition;//


					//for (var i = 0; i < $(".scroll-opacity").length; i++) {
					//	var offsetTop = $(".scroll-opacity").eq(i).offset().top;

					//	console.log(i, offsetTop);
					//};
					
					 $(".scroll-opacity").each(function() {
						var offsetTop = $(this).offset().top;

						console.log(scrPosition,offsetTop);

					 	if(scrPosition> offsetTop - wH) {
					 		$(this).addClass("show-opacity");
					 	}

					 });


					// var obj_opacity = $(".scroll-opacity1");
					
					// if (window_top < scrPosition) {
					// 	obj_opacity.addClass("show-opacity");
					// };
					// console.log(wH);	

					});



				$(window).load(function() {
					
					console.log("5");
					//$(".achive-nav-month").hide();
					$(".achive-nav-year").on('click',function() {
							
							var $target = $(this).next('dd');
							$target.slideToggle();
					
					});

				});


				$(window).load(function() {
					
					

					$(".achive-nav-year").on('click',function() {
							var $target = $(this),
								$target_delete = $(this).find(".is-expand");
								console.log("＋をーにするアニメーション");
								//console.log($target_delete);
							 $target.toggleClass("is-expand");
							// if( $target_delete == ".is-expand"){
							// 	$target.removeClass("is-expand");
							// }
					});//これだとactive-nav-yearを含んでいるかどうかがもok
					



				});



				//resizeで画像が切り替わる。



					$(window).on('resize load',function() {

						var window_width = $(window).width();
						console.log(window_width);
						if(640 > window_width){
							$(".mainVisual").attr("src","/assets/img/images/sp_main.jpg");
						
						}
					
						if(640 <= window_width){
							$(".mainVisual").attr("src","/assets/img/web_part/top_07.jpg");
						
						}
			


				});


					$(window).on('load',function(){
						var mainVisual = $(".mainVisual");
						console.log(mainVisual);
						mainVisual.addClass("show-opacity");
					});











