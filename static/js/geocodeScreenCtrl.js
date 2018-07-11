(function(ng){
	'use strict';

	ng.module('controllersModule').controller('geocodeScreenCtrl', function($scope, geocodeSrvc){
		//init map variables
		var map, markers;
		
		var yandexIcon = L.icon({
			iconUrl: 'static/icons/yandex.png',
			iconSize: [32, 32],
		});
		
		var aigeoIcon = L.icon({
			iconUrl: 'static/icons/24geo.png',
			iconSize: [32, 32],
		});
		
		/// events
		// init screen
		$scope.init = function(){
			$scope.searchInputModel = 'маркса красноярск';
		};
		
		// init map
		$scope.initMap = function(){
			map = L.map('leafletmap');
			setView([56, 92.8]);
			markers = L.featureGroup().addTo(map);
			
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				maxZoom: 18,
				id: 'mapbox.streets',
				accessToken: 'pk.eyJ1IjoiY3JyYWF5IiwiYSI6ImNqamUyenI2bTN6dHEzcG9oM3hsZzN0Z24ifQ.LaVTFC7pUY1SmKgVY9ciXg'
			}).addTo(map);
		};
		
		$scope.dataItemClick = function(markerPosition){
			if(!markerPosition)
				return;
			setView(markerPosition);
			scrollToMap();
		};
		
		$scope.searchBtnClick = function(){	
			markers.clearLayers();
			$scope.yandexData = [];
			$scope.aigeoData = [];
			
			var q = $scope.searchInputModel;
			//call search functions
			geocodeSrvc.yandex(yandexSearchCallback, q);
			geocodeSrvc.aigeo(aigeoSearchCallback, q);
			
			scrollToMap();
		};
		
		function aigeoSearchCallback(data){
			$scope.aigeoData = data;
			setMarkers($scope.aigeoData, aigeoIcon);
		};
		
		function yandexSearchCallback(data){
			$scope.yandexData = data;
			setMarkers($scope.yandexData, yandexIcon);
		};
		
		// set markers on the map and set bounds on fit
		function setMarkers(data, icon=''){
			var options=icon?{icon:icon}:{};
			
			data.forEach(function(e){
				if (e.pos)
					L.marker(e.pos, options).bindPopup(e.title+' ('+e.pos.toString()+')').addTo(markers);
			});
			
			window.setTimeout(() => {
				map.fitBounds(markers.getBounds());
			}, 500);
		};
		
		// set map view of the position
		function setView(pos){
			map.setView(pos, 13);
		};
		
		// scroll window to map
		function scrollToMap(){
			$('html, body').animate({
				scrollTop: $('#leafletmap').offset().top - 15
			}, 500);
		}

		$scope.init(); 
	});
})(angular);