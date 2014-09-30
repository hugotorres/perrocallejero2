  var callejeroApp = angular.module('callejeroApp', []);
  
  callejeroApp.controller('controles', function ($scope) {
	  
	  $scope.alerta={};
	  $scope.alerta.comida=0;
	  $scope.alerta.diversion=0;
	  $scope.alerta.salud=0;
	  $scope.jugador={};
	  $scope.jugador.nivel=1;
	  $scope.jugador.energia=100;
	  
   var cargar = function(){
  
	  if(localStorage.getItem('perro'))
	  return JSON.parse(localStorage.getItem('perro'));
	  else  return {
	   'name': 'Harry',
	   'edad': 60 ,
	   'salud':40,
	   'amor':40,
	   'diversion':40,
	   'comida':40	 
	   };
	  }
	  
	
	$scope.borrar=function(){
		alert('se borraran todos los datos y esto no se puede deshacer');
		localStorage.removeItem("perro");
		localStorage.clear();
		}
 
  $scope.perro = cargar();


	  $scope.guardar= function(){
		  $scope.nivel ++;  
		  $scope.energia --;
		  var edad =parseInt($scope.perro.edad);
		  var json = JSON.stringify($scope.perro);
 		localStorage.setItem('perro',json);		
		cargar();
		if($scope.perro.diversion <0)
	    $scope.perro.diversion =0;
		if($scope.perro.comida <0)
	    $scope.perro.comida =0;
		
		 if($scope.perro.comida<10)
			$scope.alerta.comida=true;
	   
	     if($scope.perro.diversion<10)
			$scope.alerta.diversion=true;
			
		 if($scope.perro.salud<10)
			$scope.alerta.salud=true;
	   
	     if($scope.perro.diversion>10)
			$scope.alerta.diversion=false;
		if($scope.perro.salud>10)
			$scope.alerta.salud=false;
		 if($scope.perro.comida>10)
			$scope.alerta.comida=false;
	   
	  }
	 
  
      $scope.jugar= function(valor){
	$("#stopwatch").TimeCircles(
			{   start: false,
				time: {
				Days: { show: false},
				Hours: { show: false},
				Minutes: { show: false },
				Seconds: { color: "#C0C8CF" }
				}
			}
		).start();
	
	   var valorant =parseInt($scope.perro.diversion);
	  $scope.perro.diversion = (parseInt(valorant) + parseInt(valor));
	  
	  if($scope.perro.diversion >100)
	  $scope.perro.diversion =100;
	  
	      cansar((valor/3));
          $scope.guardar();
	  }
	  
   var cansar =  function(valor){
	  var comida = parseInt( $scope.perro.comida );
	  $scope.perro.comida = comida -valor;	  
   }
   
      var aburrir = function(valor){
	   var diversion = parseInt( $scope.perro.diversion );
	  $scope.perro.diversion = (diversion -valor);
	   }

	  
	  
	   $scope.alimentar= function(comida){
		   console.log('alimentando');
	  //$scope.jugar(-(comida/3));

	   var comidaant =parseInt($scope.perro.comida);
	  $scope.perro.comida = (parseInt(comidaant) + parseInt(comida));
	  
	  if($scope.perro.comida >100)
	  $scope.perro.comida =100;
	  
	  aburrir(comida/3);
  
	  $scope.guardar();
	  

	  }
	  
	  
	
	$scope.salud= function(valor){
		$scope.energia = $scope.energia-valor;
	   var valorant =parseInt($scope.perro.salud);
	  $scope.perro.salud = (parseInt(valorant) + parseInt(valor));
	  
	  if($scope.perro.salud >100)
	  $scope.perro.salud =100;

	  cansar(10);
	  aburrir(valor/2);
	  $scope.guardar();
	}
 
  
  
});