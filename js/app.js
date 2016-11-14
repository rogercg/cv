'use strict';

var app = angular.module("app",[
		'ngRoute',
		'firebase'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/cv',{
			templateUrl: 'templates/cv.html',
			controller: 'generalCtrl'
		})
		.when('/login',{
			templateUrl: 'templates/login.html',
			controller: 'sesionCtrl'
		})
		.when('/vistaImpresion',{
			templateUrl: 'templates/cvi.html',
			controller: 'generalCtrl'
		})
		.when('/vistaImpresionBasica',{
			templateUrl: 'templates/cvbasic.html',
			controller: 'generalCtrl'
		})
		.when('/agregarDatos',{
			templateUrl: 'templates/agregarDatos.html',
			controller: 'generalCtrl'
		})
		.when('/editarcv',{
			templateUrl: 'templates/editarCV.html',
			controller: 'crudCtrl'
		})
		.otherwise({
			redirectTo: '/cv'
		});
})
.run(function ($rootScope, $location) {
	// body...
});