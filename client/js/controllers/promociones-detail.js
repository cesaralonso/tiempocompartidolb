
angular
  .module('app')
  .controller('PromocionesdetailController', ['$scope', '$state', 'Promocion', function($scope, $state, Promocion) {
    
    function getPromocion(id) {
      $scope.membresias = Promocion.findById({
        id: id,
        filter: {
          where: {},
          limit: 10
        }
      })
      .$promise
      .then(function(results) {

        $scope.promocion = results;

      });
    };
    getPromocion($stateParams.id);

  }]);
