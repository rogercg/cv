'use strict';
app.controller("sesionCtrl", function ($scope, $firebaseObject, $firebaseArray, $location, $routeParams) {

	$scope.login={};
	$scope.iniciarSesion=function(login){
		var mail= login.email;
		var pass= login.contrasena;
		firebase.auth().signInWithEmailAndPassword(mail, pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode);
		  console.log(errorMessage);
		  if (errorCode==='auth/wrong-password') {console.log('Contraseña incorrecta')}
		  else if (errorCode==='auth/user-not-found') {console.log('Usuario no encontrado')}
		  else if (errorCode==='auth/invalid-email') {console.log('Email invalido')}
		  else if (errorCode==='auth/network-request-failed') {console.log('Consulta de red fallida')}
		  
		/*
			GET https://cdn.firebase.com/libs/angularfire/2.0.2/angularfire.min.js
			net::ERR_INTERNET_DISCONNECTED

			GET https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
			net::ERR_INTERNET_DISCONNECTED

			Uncaught ReferenceError: firebase is not defined

		*/		  
		});
	};
	firebase.auth().onAuthStateChanged(function(user){
		var user = user;
		if (user!==null) {
			//Recargando pagina y redireccionandola
			console.log('Sesion iniciada');
			window.location.href='#/editarcv';
		}else{
			console.log('Debes iniciar sesion');
			window.location.href='#/login';
		}
	});
	document.getElementById("titulo").style.display = "none";
	document.getElementById("slogan").style.display = "none";
	document.getElementById("formulario").style.display = "none";

	$( document ).ready(function() {
		setTimeout(function(){
			document.getElementById("titulo").style.display = "";
			document.getElementById("slogan").style.display = "";			
		}, 750);
		setTimeout(function(){
			document.getElementById("formulario").style.display = "";
		}, 1500);
	});
	

})