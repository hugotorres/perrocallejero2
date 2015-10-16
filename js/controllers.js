  var callejeroApp = angular.module('callejeroApp', []);
  
  callejeroApp.controller('controles', function ($scope) {
	  
	  $scope.alerta={};
	  $scope.alerta.comida=0;
	  $scope.alerta.diversion=0;
	  $scope.alerta.salud=0;
	  $scope.jugador={};
	  $scope.jugador.nivel=1;
	  $scope.jugador.energia=100;
	  $scope.accion= null;
	  $scope.valor=null;
	  
   var cargar = function(){
  
	 if(localStorage.getItem('perro'))
	  return JSON.parse(localStorage.getItem('perro'));
	  else
	    return {
	   'name': 'Harry',
	   'edad': 60 ,
	   'salud':40,
	   'amor':40,
	   'diversion':40,
	   'comida':40	 
	   };
	  };
	  
	
	$scope.borrar=function(){
		alert('se borraran todos los datos y esto no se puede deshacer');
		localStorage.removeItem("perro");
		localStorage.removeItem("jugador");
		cargar();
	
		};
 
  $scope.perro = cargar();
  var envejecer = function(dias){
			$scope.perro.edad+=dias;
			
			};


	  $scope.guardar= function(){
		  
		  $scope.jugador.nivel ++;  
		  $scope.jugador.energia --;
		  var edad =parseInt($scope.perro.edad);
		  var time =new Date();
		  $scope.perro.ultimo = time;
		  var jsonjugador = JSON.stringify($scope.jugador);
		  var json = JSON.stringify($scope.perro);
		localStorage.setItem('jugador',jsonjugador);
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
          $scope.$apply();
	  };

			  
	  $scope.contar = function(tiempo,accion, valor){
          envejecer(valor/3);
		$scope.accion = accion;
		$scope.tiempo=tiempo;
		$scope.valor= valor;
		$("#countdown").fadeIn();
		  $("#countdown").countdown360({
		radius      : 15,
		seconds     : $scope.tiempo,
		fontColor   : '#FFFFFF',
		autostart   : false,
		onComplete  :function(){
			$("#countdown").fadeOut();
			if($scope.accion=='comida')
			$scope.alimentar($scope.valor);
			if($scope.accion=='jugar')
			$scope.jugar($scope.valor);
			if($scope.accion=='salud')
			$scope.salud($scope.valor);
			$scope.$apply();
			}
		}).start();
		
		};
		  
		 
	 
  
      $scope.jugar= function(valor){
		  $scope.jugador.energia -=(valor);
		  $scope.perro.diversion+=valor;
		  
		  if($scope.perro.diversion >100)
		  $scope.perro.diversion =100;
		  
		  $scope.perro.salud-=(valor/2);
		  $scope.perro.comida-=(valor/2);
		  $scope.guardar();
		 
	  };
	  

	   $scope.alimentar= function(comida){

	  $scope.jugador.energia -=(comida);

	  /* var comidaant =parseInt($scope.perro.comida);
	  $scope.perro.comida = (parseInt(comidaant) + parseInt(comida));
	  */
	  $scope.perro.comida+=comida;
	  
	  if($scope.perro.comida >100){
		  $scope.perro.comida =100;
		  $scope.perro.salud-=(comida*0.4).toFixed(2);
		  }
		  $scope.perro.diversion-=(comida*0.4).toFixed(2);
	  // asumimos que al cmoer el perro se aburre
	  $scope.guardar();
	  };
	  
	  
	
	$scope.salud= function(valor){
		$scope.jugador.energia -=(valor);
		$scope.perro.comida-=(valor*0.6).toFixed(2);
		/*por cada ves que vayamso al veterinario perdemos energia*/
	  /* var valorant =parseInt($scope.perro.salud);
	  $scope.perro.salud = (parseInt(valorant) + parseInt(valor));
	  */
	  $scope.perro.salud+= valor;
	  if($scope.perro.salud >100){
		 // $scope.jugar(-(valor/2))
		  $scope.perro.salud =100;
		  }

	  $scope.guardar();
	};
 
  
  
});