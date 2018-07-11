(function(ng){
	'use strict';
	ng.module('servicesModule').factory('geocodeSrvc', function($http) {
		function getAigeoData(response){
			var result = [];
			var data = response.response.results;

			var obj, pos;
			data.forEach(function(e){
				if (e.geoData){
					pos = [];
					pos.push(e.geoData.latitude);
					pos.push(e.geoData.longitude);
				}
				
				obj = {
					title:e.fulladdressstring,
					pos:pos,
				}
				result.push(obj);
			});
			return result;
		};
		
		function getYandexData(response){
			var result = [];
			var data = response.response.GeoObjectCollection.featureMember;

			var obj, pos, splitted;
			data.forEach(function(e){
				splitted = e.GeoObject.Point.pos.split(" ")
				pos = [];
				pos.push(parseFloat(splitted[1]));
				pos.push(parseFloat(splitted[0]));
				
				obj = {
					title:e.GeoObject.name+", "+e.GeoObject.description,
					pos:pos,
				}
				result.push(obj);
			});
			return result;
		};
		
		return {
			aigeo: function(callback, q){
				$http({
					method: 'GET', 
					url: 'http://api.aigeo.ru/geocoder/service?format=json&search='+encodeURI(q),})
					.then(function(response){
						callback(getAigeoData(response.data));
				}, function(response){});
			},
			yandex: function(callback, q){
				$http({
					method: 'GET', 
					url: 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode='+encodeURI(q),})
					.then(function(response){
						callback(getYandexData(response.data));
				}, function(response){});
			},
		};
	});
})(angular);