
angular
  .module('app')
  .controller('EditmembresiaController', function($scope, Membresia, Person, $location, $stateParams) {

    // Obtiene la membresia
    Person.getCurrent(function(user){
      Membresia.find({
        "filter": {
          "where": {
            "idPerson": user.id,
            "id": $stateParams.id
          }
        }})
        .$promise
        .then(function(results) {
          console.log("results[0]",results[0]);
          $scope.membresia = results[0];
        });
    });

    $scope.saveMembresia = function(new_membresia) {
        Membresia.findById({
          id: $stateParams.id
        })
        .$promise
        .then(function(membresia) {
          console.log("membresia",membresia);
          $scope.membresia = membresia;
          console.log(" $scope.membresia", $scope.membresia);
          $scope.membresia.titulo = new_membresia.titulo;
          $scope.membresia.$save();
        });
      }
  
  });
