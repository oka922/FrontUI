Recruit Career 



#####libs
1. jQuery
2. jQuery
3. VelocityJS animetion lib

	
	URL:http://velocityjs.org/  
	複雑なanimetion処理に向いている
	
	// fadeIn
	$("#box1").velocity("fadeIn", { duration: 1500 });

	// fadeOut
	$("#box1").velocity("fadeOut", { duration: 1500 });
	
	// slideDown
	$("#box1").velocity("slideDown", { duration: 1500 });
	
	// slideUp
	$("#box1").velocity("slideUp", { duration: 1500 });
	
	*how quickly velocityJS:https://www.extreme-creations.co.uk/blog/velocity-js-vs-animate-css-which-is-faster-smoother-more-controllable/
	
4. JsRender
	テンプレート機能を提供している。RecruitCareerのtopicsPanel-item部分、URL:http://www.jsviews.com/#jsrender
	
	<script>
	$(function () {
  	var data = {
    	name: 'Jack'
  	};
  	var html = $('#theTmpl').render(data);
  	$('#result').append(html);
	}); 
	</script>
	
	cf http://caniuse.com/
5. matchMedia() polyfill