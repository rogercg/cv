'use strict';
app.controller("crudCtrl", function ($scope, $firebaseObject, $firebaseArray, $location, $routeParams) {
	
	$scope.sesion=true;
	firebase.auth().onAuthStateChanged(function(user){
		var user = user;
		if (!user) {
			window.location.href='#/cv';
		}else{$scope.sesion=false;}
	});
	var refBDPersona = firebase.database().ref("TBPersona");
	$scope.objBDPersona = $firebaseArray(refBDPersona);
	$scope.objPersona={};
	$scope.objPersonaKey='';
	var pkey=[];

	var refBDExperiencia = firebase.database().ref("TBExperiencia");
	$scope.objBDExperiencia = $firebaseArray(refBDExperiencia);
	$scope.objExperiencia={};

	var refBDEstudios = firebase.database().ref("TBEstudios");
	$scope.objBDEstudios = $firebaseArray(refBDEstudios);
	$scope.objEstudios={};

	var refBDPerfil = firebase.database().ref("TBPerfil");
	$scope.objBDPerfil = $firebaseArray(refBDPerfil);

	var tbimage = firebase.database().ref('tbimg');

	$scope.titulo='Bienvenido';
	$scope.bienvenido='Bienvenido, estas en la vista de bienvenida.';

	$scope.formExperiencia=true;
	$scope.formEstudios=true;

	$scope.objHabilidades={};
	$scope.objP;
	var cv=[];
	var objItemSeleccionado;
	var itemSeleccionado= $routeParams.itemId;

	var expSelecionado=[];
	var estSelecionado=[];

	refBDPersona.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var key = childSnapshot.key;
	      var childData = childSnapshot.val();
	      cv.push(childSnapshot.val());
	      pkey.push(childSnapshot.key);
	      if (cv) {
			habilidades(cv);
			idiomas(cv);
			$scope.objPersona=cv[0];
			$scope.objPersonaKey=key;
		  }
	  });
	});
	function habilidades(vc) {
	  	$scope.objP=vc[0];	  	
	  	var habilidades = vc[0].habilidades.split(",");
	  	$scope.OHabilidades=habilidades;
	}
	function idiomas(vc) {
	  	$scope.objP=vc[0];	  	
	  	var idiomas = vc[0].idiomas.split(",");
	  	$scope.OIdiomas=idiomas;
	}
	/*CRUD*/
	$scope.eliminarItem = function(i){
		$scope.objBDItem.$remove(i);
	 }
	$scope.irEditarExperiencia = function(expS) {
		expSelecionado=[];
		$scope.formExperiencia=false;
		$scope.formEstudios=true;
		$scope.btnAgregar=true;
		$scope.btnEditar=false;
		expSelecionado.push(expS);
		$scope.objExperiencia=expSelecionado[0];
	}
	$scope.irAgregarExperiencia = function() {
		$scope.formExperiencia=false;
		$scope.formEstudios=true;
		$scope.btnAgregar=false;
		$scope.btnEditar=true;		
	}
	$scope.irEditarEstudios = function(estS) {
		estSelecionado=[];
		$scope.formExperiencia=true;
		$scope.formEstudios=false;
		$scope.btnAgregar=true;
		$scope.btnEditar=false;
		estSelecionado.push(estS);
		$scope.objEstudios=estSelecionado[0];
	}
	$scope.irAgregarEstudios = function() {
		$scope.formExperiencia=true;
		$scope.formEstudios=false;
		$scope.btnAgregar=false;
		$scope.btnEditar=true;
	}
	$scope.cancelarForm=function(){
		$scope.formExperiencia=true;
		$scope.formEstudios=true;
	}
	$scope.agregarExperiencia=function(){
		$scope.objBDExperiencia.$add($scope.objExperiencia);
		var x = document.getElementById("perfilOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 }
	$scope.editarExperiencia = function(idExp){
		//var itemset = $scope.objItemSeleccionado;
		//$scope.objBDItem.$add($scope.objItem);
		var expEditada = {
			cargo:$scope.objExperiencia.cargo,
			descripcionCargo:$scope.objExperiencia.descripcionCargo,
			empresa:$scope.objExperiencia.empresa,
			fecha: $scope.objExperiencia.fecha
		}
		firebase.database().ref('TBExperiencia/' + idExp).set(expEditada);
		var x = document.getElementById("perfilOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 }
	$scope.eliminarExperiencia=function(exp){
		$scope.objBDExperiencia.$remove(exp);
	 }

	$scope.agregarEstudios=function(){
		$scope.objBDEstudios.$add($scope.objEstudios);
		var x = document.getElementById("perfilOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 }
	$scope.editarEstudios = function(idEst){
		var estEditada = {
			descripcion:$scope.objEstudios.descripcion,
			escuela:$scope.objEstudios.escuela,
			fechas: $scope.objEstudios.fechas
		}
		firebase.database().ref('TBEstudios/' + idEst).set(estEditada);
		var x = document.getElementById("perfilOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 }
	$scope.eliminarEstudios=function(est){
		$scope.objBDEstudios.$remove(est);
	 }

	$scope.editarPerfil = function(){
		var perfilEditado = {
			nombres:$scope.objPersona.nombres,
			apellidos:$scope.objPersona.apellidos,
			correo:$scope.objPersona.correo,
			habilidades:$scope.objPersona.habilidades,
			idiomas:$scope.objPersona.idiomas,
			perfil:$scope.objPersona.perfil,
			telefono:$scope.objPersona.telefono,
			profesion: $scope.objPersona.profesion,
			imgPerfil: $scope.objPersona.imgPerfil,
			imgHover: $scope.objPersona.imgHover
		}
		firebase.database().ref('TBPersona/' + pkey[0]).set(perfilEditado);
		var x = document.getElementById("perfilOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		//$location.path("/cv");
	}
	$scope.cerrarSesion=function(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  window.location.href='#/cv';
		}, function(error) {
		  // An error happened.
		  console.error(error);
		});
	}

	var uploader = document.getElementById('uploader');
	var fileButton = document.getElementById('fileButton');
	$scope.link='';
	//Escuchando seleccion de archivos
	fileButton.addEventListener('change', function(e){
		document.getElementById("fileButton2").disabled = true;
		//obtener archivo
		var file = e.target.files[0];
		//referencia al storage de Firebase
		var storageRef = firebase.storage().ref('perfil/fotoPerfil');
		//subiendo archivo
		var task = storageRef.put(file);
		//Actualizando barra de progreso
		task.on('state_changed',
			function progress(snapshot){
				var porcentaje = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
				uploader.value = porcentaje;	
			},
			function error(err){
				console.error(err);
			},
			function complete(){
				var sl = task.snapshot.downloadURL;
				mostrarImg(sl);
				document.getElementById("fileButton2").disabled = false;
			}
		);
		
	});
	function mostrarImg(sl){
			var imgHover;
			/*if ($scope.link2) {
				$scope.objPersona.imgPerfil=$scope.link2;				
			}else{
				$scope.objPersona.imgHover=cv[0].imgHover;
			}*/
			$scope.objPersona.imgPerfil = sl;
			console.log('en mostrarImg...'+$scope.objPersona.imgPerfil);
			var perfilEditado = {
			nombres:$scope.objPersona.nombres,
			apellidos:$scope.objPersona.apellidos,
			correo:$scope.objPersona.correo,
			habilidades:$scope.objPersona.habilidades,
			idiomas:$scope.objPersona.idiomas,
			perfil:$scope.objPersona.perfil,
			telefono:$scope.objPersona.telefono,
			profesion: $scope.objPersona.profesion,
			imgPerfil: sl,
			imgHover: $scope.objPersona.imgHover
		}
		firebase.database().ref('TBPersona/' + pkey[0]).set(perfilEditado);
		var x = document.getElementById("fotoOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	}
	// Obtener elementos
	var uploader2 = document.getElementById('uploader2');
	var fileButton2 = document.getElementById('fileButton2');
	$scope.link2='';
	//Escuchando seleccion de archivos
	fileButton2.addEventListener('change', function(e){
		document.getElementById("fileButton").disabled = true;
		//obtener archivo
		var file = e.target.files[0];
		//referencia al storage de Firebase
		var storageRef = firebase.storage().ref('perfil/fotoPerfil2');
		//subiendo archivo
		var task = storageRef.put(file);
		//Actualizando barra de progreso
		task.on('state_changed',
			function progress(snapshot){
				var porcentaje = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
				uploader2.value = porcentaje;	
			},
			function error(err){
				console.error(err);
			},
			function complete(){
				var slh = task.snapshot.downloadURL;
				console.log(slh);
				mostrarImgHover(slh);		
				document.getElementById("fileButton").disabled = false;		
			}
		);
		
	});
	function mostrarImgHover(slh){
			var imgPerfil;
			/*$scope.link2 = slh;
			if ($scope.link) {
				imgPerfil=$scope.link;				
			}else{
				imgPerfil=cv[0].imgPerfil;
			}*/
			$scope.objPersona.imgHover=slh;
			console.log('en imgHover...');
			var perfilEditado = {
			nombres:$scope.objPersona.nombres,
			apellidos:$scope.objPersona.apellidos,
			correo:$scope.objPersona.correo,
			habilidades:$scope.objPersona.habilidades,
			idiomas:$scope.objPersona.idiomas,
			perfil:$scope.objPersona.perfil,
			telefono:$scope.objPersona.telefono,
			profesion: $scope.objPersona.profesion,
			imgPerfil: $scope.objPersona.imgPerfil,
			imgHover: slh
		}
		firebase.database().ref('TBPersona/' + pkey[0]).set(perfilEditado);
		var x = document.getElementById("fotoOK");
	    x.className = "show";
	    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	};
})
