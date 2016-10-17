'use strict';

var app = angular.module("app",[
		'ngRoute',
		'firebase'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'templates/bienvenido.html',
			controller: 'generalCtrl'
		})
		.when('/agregarItem',{
			templateUrl: 'templates/formAgregar.html',
			controller: 'generalCtrl'
		})
		.when('/editarItem/:itemId',{
			templateUrl: 'templates/formEditar.html',
			controller: 'generalCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
})
.run(function ($rootScope, $location) {
	// body...
});