
angular
  .module('app')
  .controller('PromocionesController', function($scope, $state, Promocion) {

      Promocion.find()
        .$promise
        .then(function(results) {
          console.log("promociones", results);
          $scope.promociones = results;
      });
  
  });
