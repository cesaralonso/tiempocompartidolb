
angular
  .module('app')
  .controller('NewmembresiaController', function($scope, Membresia, Person, $location) {

    $scope.saveMembresia = function(membresia) {
      membresia.status = "PUBLICADO";
      Person.getCurrent(function(user){
          Person.membresias.create(
            { id:   user.id },
            membresia
          );
      })
      .$promise
      .then(function(results) {
        console.log("results",results);
          $location.path('/mis-membresias');
      });
    }

  });
