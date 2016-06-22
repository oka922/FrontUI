var GoogleMap = function(){
  this.init();
};

GoogleMap.prototype = {
	init: function(){
		var self = this;
		$('.google-map').each(function() {
			self.renderMap($(this));
		});
	},
	renderMap: function($el) {
		var self = this;
		var $markers = $el.find('.marker');
		var zoom = parseInt( $el.attr('data-zoom') );
		if( !zoom ) {
			alert("data-zoomの値が不正です");
			retrun;
		}
		var args = {
			zoom : zoom,
			center : new google.maps.LatLng(0, 0),
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			draggable: false,
			// https://snazzymaps.com/style/15/subtle-grayscale
			styles : [ {
				"featureType" : "landscape",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 65
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "poi",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 51
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "road.highway",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "road.arterial",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 30
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "road.local",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 40
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "transit",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "administrative.province",
				"stylers" : [ {
					"visibility" : "off"
				} ]
			}, {
				"featureType" : "water",
				"elementType" : "labels",
				"stylers" : [ {
					"visibility" : "on"
				}, {
					"lightness" : -25
				}, {
					"saturation" : -100
				} ]
			}, {
				"featureType" : "water",
				"elementType" : "geometry",
				"stylers" : [ {
					"hue" : "#ffff00"
				}, {
					"lightness" : -25
				}, {
					"saturation" : -97
				} ]
			} ]
		};
		var map = new google.maps.Map($el[0], args);
		map.markers = [];
		$markers.each(function() {
			self.addMarker($(this), map);
		});
		self.centerMap(map);
	},
	addMarker: function($marker, map) {
		var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		var marker = new google.maps.Marker({
			position : latlng,
			map : map,
			icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjQxQjZENDc0RkJEMTFFNUI0RDNFRUZCNjE2MDYzNTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjQxQjZENDg0RkJEMTFFNUI0RDNFRUZCNjE2MDYzNTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QzFEOTU1RTRGQjcxMUU1QjREM0VFRkI2MTYwNjM1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNDFCNkQ0NjRGQkQxMUU1QjREM0VFRkI2MTYwNjM1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgarg9QAAATrSURBVHjazFpraBxVFD4Z1zSrolUSEyzRpCCIwcQHCBF/VH9ErfgsaMVUxBopgkqNhfqkiD9ajdYXglalNT98oZW2ITHYRttiqhYfUWJRIdGKWrNqlWjqmrZ+X+ZEhnV2987szNz54GNnZ+7M3W/PmXPPOTNV3d3dYohzwEv081TwBDAL/gn+Cn4B7gb7wS8lAHp6eiQpZMocp6CbwdtUpB/mgvPAM8DrwEfBz8EnwF4wLymCU+LY5eAe8MkSYouB4p/X8xemXfARap23wJMrvH4z2Ac+rtdNneBq8DXwdrAqwnnuAF9Ng+hCwS+AV8c01yLw2TQJXgZ2xjzfUvCmNAhuAB9JaM61Op9VwavAYxKa81jwAVuCM7qO3mB6QjablaamJqmrq5Pq6mrJ5/MyMTEh4+PjMjU1ZXqZJeA94H4bFl6kCUZZ1NbWSnt7uzQ2NkpNTY04jjPzye/cz+OGoDddaculF5hatrW1VTIZ/+SM+3mc4wxxgS3BZxtlEM3NRcV6RdPdDXGWLcEnmrqzCXhvG6LBlmAjJQxQUY7jf2NLsFE1w2gc5TjgL1uC95oMzOVyEuU403njEPyRycCxsTGZnp4uOYbHOc4Qu20lHtvAxeUGMqkYGRkpujRRLI8HSD6GOjo6ZjYGBwcTFfy61qtHmbjr8PDwzBLFqD2baXE/LRtA7KSWi6XA1eM8cVtKp2ltzgB7nKanf9MO4M/gN+Bn4DD4LniglGCmdy9ptSQmlh4dHa30j14H60767J+vbSJmf2eWqcmP1IyN0b4FvMITDDeDz4DbixUPD4rbjEsCnGdNwT5me1vUUg9pUhK2AUFPvRZ8D3wbPMVP8I8+PyIuPAzr7tPt08Xtcg6Bl0bcZSEYJEb0D/hfA4D18Ncxi/0O7FFhy8FPwYsTKEdfBq8vFHxAf0ScWAHrcm17BXxM78MkUKXtpfmFPa0+jdpxYKCtre0NFXuNhSX4aPAuvzbtreC+iCf7Deyqr69fic+rxB4W+gnOmS5RAbAcrkz3vV/sYl6xJw9swvdGNMlmiN2gYudYFpwr9aiFzfMfInDlZboWdop97HAMfmwluBPW5Z/WnWBELoVep5w7atoZBv0Qu17cBuGSFIhlcrPFMRhI6/wS8OJ/iPuYleCjm7mWxX4vbiv6sIlgRu0VASdYpa5MLLUslmnzhSpaHMOT1ps2CsR9E+ApT/WzwKLYD8FzvSmzqeDDAaw8mz4SXTEUBKYV2d3g+bOWDSpYtNzaVGbMVogd0O2sBXdmPfCcVmGrwX/8GgBBwIdgl5Ww2n2e7U5JrhX7ieboXFF+KtfiCQK2UdiAusjn2DZYd5duszm9MkaBv6vHDWg9PW56YibEZGuKCF7t2b5FA1aUxccHzJR424jb8TwY5kJhBA+pC3mfDX0FvqPbxxe4dlAcAtk0e1/cphyF7tHAWTEyIc9bJ26T7L/vcOfZH8T3tOoDXIvNvJ0ecbvUZWNBWMFsmazV6uegp7JiD+nGMufmVdhW9QpuTycVxsMK3q8Bg63RndqU49t4G4pE8L26pPXpfThpKxPJVHDuRhX8pkZltoYaCkRyqWDD/eOo7kGbgvs1wLCf/DTYLu6TAL7Y9qLel4ckZXDCngg35iOOPnx2ab7Mt/dO0nt4exrFVmphaWlp4RL1LXhvWgUW4l8BBgBGWDQSzf+kfwAAAABJRU5ErkJggg=='
		});
		map.markers.push(marker);
		if ($marker.html()) {
			var infowindow = new google.maps.InfoWindow({
				content : $marker.html()
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
	},
	centerMap: function(map) {
		function adjust() {
			map.setCenter(bounds.getCenter());
			map.setZoom( map.zoom );
		}
		var bounds = new google.maps.LatLngBounds();
		$.each(map.markers, function(i, marker) {
			var latlng = new google.maps.LatLng(marker.position.lat(),
					marker.position.lng());
			bounds.extend(latlng);
		});
		adjust();
		var timer = false;
		$(window).on('resize', function() {
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				adjust();
			}, 200);
		});
	}
};

module.exports = GoogleMap;
