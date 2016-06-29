$(document).ready(function() {

    $(window).load(function(){
      //Google Map          
	      var latlng = new google.maps.LatLng(35.691463, 139.757162);
      var settings = {
        zoom: 15,
        center: new google.maps.LatLng(35.691463, 139.757162), mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        scrollwheel: false,
        draggable: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP};
      var map = new google.maps.Map(document.getElementById("map_canvas"), settings); 
      google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      }); 
      var contentString = 
        '<div id="googlemap_wrap">'+
        '  <h3 id="hl_googlemap">Mynavi Corporation</h3>'+
        '  <div id="txt_googlemap">'+
        '    <p>1-1-1, Hitotsubashi, Chiyoda-ku, Tokyo, 100-0003<br><br><a href="https://goo.gl/maps/vr6hV" target="_blank">GOOGLE MAP</a></p>'+
        '  </div>'+
        '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      }); 
      var companyImage = new google.maps.MarkerImage('img/marker.png',
        new google.maps.Size(63,68), //マーカーの幅と高さ
        new google.maps.Point(0,0),
        new google.maps.Point(27,50) //マーカーの位置
      );
      var companyPos = new google.maps.LatLng(35.691463, 139.757162); 
      var companyMarker = new google.maps.Marker({
        position: companyPos,
        map: map,
        icon: companyImage,               
        zIndex: 3});
      google.maps.event.addListener(companyMarker, 'click', function() {
        infowindow.open(map,companyMarker);
      });

//color change
	  var stylez = [{"stylers":[{ "saturation": -100 },{ lightness: 0 },{ gamma: 1.0 },{hue: "#2eadde"}]}];
	  var styledMapOptions = {}
	  var styledMapType =  new google.maps.StyledMapType(stylez,styledMapOptions);
	  map.mapTypes.set('Mynavi Corporation', styledMapType);
	  map.setMapTypeId('Mynavi Corporation');

    });
  
});