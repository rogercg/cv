'use strict';
app.controller("generalCtrl", function ($scope, $firebaseObject, $firebaseArray, $location, $routeParams) {
	// body...
	$scope.titulo='Bienvenido';
	$scope.bienvenido='Bienvenido, estas en la vista de bienvenida.';

	var refItem = firebase.database().ref("TBItem");
	$scope.objBDItem = $firebaseArray(refItem);
	$scope.objItem={};	

	var objItemSeleccionado;
	var itemSeleccionado= $routeParams.itemId;

	$scope.orderValor = 'descripcion';
  	$scope.reverse = true;

	$scope.orderB = function(orderValor) {
		/*
		test ? expression1 : expression2
		test: Cualquier expresión booleana.
		expression1: Expresión que se devuelve si test es true.Puede ser una expresión de coma.
		expression2: Expresión que se devuelve si test es false.Se puede vincular más de una expresión mediante una expresión de coma.
		referencia: https://msdn.microsoft.com/es-es/library/be21c7hw(v=vs.94).aspx
		*/
		$scope.reverse = ($scope.orderValor === orderValor) ? !$scope.reverse : false;
		$scope.orderValor = orderValor;
	};

	if (itemSeleccionado) {
		objItemSeleccionado=getItem(itemSeleccionado);		
		$scope.objItemSeleccionado=objItemSeleccionado[0];
	};

	function getItem(itemSeleccionado){
		var item = [];
		firebase.database().ref('TBItem/' + itemSeleccionado).on('value', function(snapshot) {
		  item.push(snapshot.val());
		});		
		return item;		
	};

	/*CRUD*/
	$scope.agregarItem = function(){
		$scope.objBDItem.$add($scope.objItem);
		$location.path("/");
	}
	$scope.editarItem = function(){
		var itemset = $scope.objItemSeleccionado;
		//$scope.objBDItem.$add($scope.objItem);
		firebase.database().ref('TBItem/' + itemSeleccionado).set($scope.objItemSeleccionado);
		$location.path("/");
	}
	$scope.eliminarItem = function(i){
		$scope.objBDItem.$remove(i);
	}
})