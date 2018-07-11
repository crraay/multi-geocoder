(function(ng){
	'use strict';

	angular.module('servicesModule',[]);
	angular.module('controllersModule', []);

	var app = angular.module('geocodeApp', ['ngRoute', 'servicesModule', 'controllersModule']);

	var appConfig = function($routeProvider) {
		$routeProvider
		.when('/',
		{
			templateUrl: 'static/html/geocodeScreen.html', 
			controller: 'geocodeScreenCtrl',
		})
		.otherwise({redirectTo: '/'});
	};
				
	app.config(['$routeProvider', appConfig]);

})(angular);