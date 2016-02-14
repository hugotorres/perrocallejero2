  var callejeroApp = angular.module('callejeroApp', []);
  
  callejeroApp.controller('controles', function ($scope) {
     //  Parse.$ = jQuery;
      $scope.nota ={};
      // Replace this line with the one on your Quickstart Guide Page
   //   Parse.initialize("gywzj6fL4aGQ24A0GLU1B5RbmnJsB6TdS7VXO9j9", "P0vu2Z7wrYJkXzyaNYj7rgF3mZ4MxPp7hcF7lzTr");
      $scope.procesando= false;
	  $scope.alerta={};
	  $scope.alerta.comida=0;
	  $scope.alerta.diversion=0;
	  $scope.alerta.salud=0;
	  $scope.jugador={};
	  $scope.jugador.nivel=1;
	  $scope.jugador.energia=100;
	  $scope.accion= null;
	  $scope.valor=null;
      $scope.fecha= new Date().getTime();
	  
   var cargar = function(){
      var fechaHoy= new Date().getTime();
	     if(localStorage.getItem('perro')){
             $scope.activo=true;
             return JSON.parse(localStorage.getItem('perro'));
         }
	      else
              {
                  $scope.activo=false;
                  	    return {
                            'nombre':'harry',
                           'edad': 1 ,
                           'salud':40,
                           'amor':40,
                           'diversion':40,
                           'comida':40,
                           'fechaInicio':fechaHoy
                           };
              }
	  };
      
      var  secondsToString= function (seconds)
                {
                var numdays = Math.floor(seconds / 864000);
                var numhours = Math.floor((seconds % 864000) / 3600);
                var numminutes = Math.floor(((seconds % 864000) % 3600) / 60);
                var numseconds = ((seconds % 864000) % 3600) % 60;
                    $scope.numdays= numdays;
                return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
                };
	  
	$scope.borrar=function(){
		alert('se borraran todos los datos y esto no se puede deshacer');
		localStorage.removeItem("perro");
		localStorage.removeItem("jugador");
		cargar();
	    document.location = "index.html";
		};
 
  $scope.perro = cargar();
  var envejecer = function(dias){
			$scope.perro.edadString =secondsToString($scope.perro.ultimo-$scope.perro.fechaInicio );
      $scope.perro.edad= $scope.numdays;
      console.log( $scope.numdays);
			};

	  $scope.guardar= function(){
		  
		  $scope.jugador.nivel ++;  
		  $scope.jugador.energia --;
		  var edad =parseInt($scope.perro.edad);
		  var time =new Date().getTime();
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
          $scope.procesando=true;
          envejecer(valor/3);
		$scope.accion = accion;
		$scope.tiempo=tiempo;
		$scope.valor= valor;
		$("#countdown").fadeIn();
		  $("#countdown").countdown360({
		radius      : 12,
		seconds     : $scope.tiempo,
		fontColor   : '#FFFFFF',
		autostart   : false,
		onComplete  :function(){
			$("#countdown").fadeOut();
            $scope.procesando=false;
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
      /*
       var Dog = Parse.Object.extend("perro");
      var Perros = Parse.Collection.extend({
            model: Dog
        });
      var perros = new Perros();
      perros.fetch({
            success: function(perros) {
                $scope.perros = perros.models;
                console.log(perros.models);
            },
            error: function(blogs, error) {
                console.log(error);
            }
        });
      */
      /*
      $scope.verLista = function(){
           var Nota = Parse.Object.extend("Nota");
           var Notas = Parse.Collection.extend({
                model: Nota
            });
           var notas = new Notas();
          notas.fetch({
                success: function(notas) {
                    $scope.notas = notas.models;
                    console.log($scope.notas);
                },
                error: function(notas, error) {
                    console.log(error);
                }
            });
      };
      */
      
     // $scope.verLista();
      $scope.activar = function(){
          $scope.activo = true;
      };
      
      /*
      $scope.guardarNota= function(){
          if($scope.nota.contenido !== null){
               console.log('guardando notas en parse');
            var Nota = Parse.Object.extend("Nota");
            var nota = new Nota();
            nota.save($scope.nota).then(function(object) {
               $scope.nota.contenido= null;
                console.log(object);
              console.log("yay! it saved");
                $scope.verLista();
            });
              console.log($scope.nota);
          }
      };
      */
});