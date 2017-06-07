
angular
  .module('app')
  .controller('MismembresiasController', function($scope, Membresia, Person, $location) {

    // Devuelve membresias del usuario logeado
    Person.getCurrent(function(user){
      $scope.membresias = Person.membresias({
        id: user.id,
        filter: {
          where: {},
          limit: 10
        }
      });
    })

    $scope.membresiaUbicacion = function(membresia) {
        $location.path(`/mi-cuenta/membresia-ubicacion/${membresia.id}`);
    }

    $scope.newMembresia = function(membresia) {
        $location.path('/new-membresia');
    }

    $scope.editMembresia = function(membresia) {
      $location.path('/edit-membresia/' + membresia.id);
    }

    $scope.playMembresia = function(membresia) {
        membresia.status = "PUBLICADO";
        membresia.$save();
    }

    $scope.pauseMembresia = function(membresia) {
        $scope.membresia.status = "DETENIDO";
        $scope.membresia.$save();
    }

    $scope.removeMembresia = function(membresia) {
      Membresia
        .delete(membresia)
        .$promise
        .then(function(results) {
          getMembresias();
        });
    }
    

  });
