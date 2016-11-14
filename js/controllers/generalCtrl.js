'use strict';
app.controller("generalCtrl", function ($scope, $firebaseObject, $firebaseArray, $location, $routeParams) {
	
	$scope.sesion=true;
	firebase.auth().onAuthStateChanged(function(user){
		var user = user;
		if (!user) {$scope.sesion=true;
		}else{$scope.sesion=false;}
	});
	$scope.isOver = 'true';
	
	var refBDPersona = firebase.database().ref("TBPersona");
	$scope.objBDPersona = $firebaseArray(refBDPersona);

	var refBDExperiencia = firebase.database().ref("TBExperiencia");
	$scope.objBDExperiencia = $firebaseArray(refBDExperiencia);

	var refBDEstudios = firebase.database().ref("TBEstudios");
	$scope.objBDEstudios = $firebaseArray(refBDEstudios);

	var refBDConfiguracion = firebase.database().ref("TBConfiguracion");
	$scope.objBDConfiguracion = $firebaseArray(refBDConfiguracion);
	$scope.objConfiguracion={};

	$scope.objHabilidades={};
	$scope.objP;
	var cv=[];
	var cKey=[];
	var conf=[];

	refBDPersona.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var childData = childSnapshot.val();
	      cv.push(childSnapshot.val());
	      if (cv) {
			habilidades(cv);
			idiomas(cv);
		  }
	  });
	});

	function habilidades(vc) {
	  	$scope.objP=vc[0];	  	
	  	var habilidades = vc[0].habilidades.split(",");
	  	$scope.OHabilidades=habilidades;
	};
	function idiomas(vc) {
	  	$scope.objP=vc[0];	  	
	  	var idiomas = vc[0].idiomas.split(",");
	  	$scope.OIdiomas=idiomas;
	};
	$scope.cerrarSesion=function(){
		firebase.auth().signOut().then(function() {
		  window.location.href='#/cv';
		}, function(error) {
		  console.log(error);
		});
	};	

	$scope.colorFndTema={
		'background-color': '#2471A3'
	};
	$scope.colorFndSubTema={
		'background-color': '#353940'
	};

	refBDConfiguracion.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var childData = childSnapshot.val();
	      conf.push(childSnapshot.val());
	      cKey.push(childSnapshot.key);
	      if (conf) {
			$scope.objConfiguracion=conf[0];
			seleccionarTema($scope.objConfiguracion);
		  }
	  });
	});
	function seleccionarTema(tema){
		if (tema.tema=='tema1') {
			$scope.colorFndTema={
				'background-color': '#0F81C7'
			};
			$scope.colorFndSubTema= {
				'background-color': '#015668',
				'height': tema.alto+'px'
			};
			$scope.colorTmnSubTema={
				'height': tema.alto+'px'
			};
		}else if (tema.tema=='tema2') {
			$scope.colorFndTema={
				'background-color': '#2471A3'
			};
			$scope.colorFndSubTema= {
				'background-color': '#353940',
				'height': tema.alto+'px'
			};
			$scope.colorTmnSubTema={
				'height': tema.alto+'px'
			};
		}
		else if (tema.tema=='tema3') {
			$scope.colorFndTema={
				'background-color': '#2C5D63'
			};
			$scope.colorFndSubTema= {
				'background-color': '#283739',
				'height': tema.alto+'px'
			};
			$scope.colorTmnSubTema={
				'height': tema.alto+'px'
			};
		};
	};
	$scope.guardarConf=function(c){
		var confEditada = {
			alto:c.alto,
			tema:c.tema
		}
		firebase.database().ref('TBConfiguracion/' + cKey[0]).set(confEditada);
		$location.path("/#/cv");
	};

	if (document.getElementById("fdn")) {
		document.getElementById("fdn").style.display = "none";
		$( document ).ready(function() {
			setTimeout(function(){
				document.getElementById("fdn").style.display = "";
			}, 1500);
		});
	};
	if (document.getElementById("fdn2")) {
		document.getElementById("fdn2").style.display = "none";
		$( document ).ready(function() {
			setTimeout(function(){
				document.getElementById("fdn2").style.display = "";
			}, 1550);
		});
	};
	$('#mostrarMsjImpresion').modal('show');
	$('#mostrarMsjImpresionBasic').modal('show');

})