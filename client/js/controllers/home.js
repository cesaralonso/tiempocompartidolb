
angular
  .module('app')
  .controller('HomeController', ['$scope', '$state', 'Membresia', function($scope, $state, Membresia) {
    $scope.membresias = [];
    function getMembresiasMontania() {
      Membresia
        .find({ filter: {where: { and: [{ubicadoEn: "NIEVE"}, {tipoInmueble: "BUNGALO"}]}}})
        .$promise
        .then(function(results) {
            $scope.membresiasmontania = results;
        });
    }
    getMembresiasMontania();

    function getMembresiasGral() {
      Membresia
        .find()
        .$promise
        .then(function(results) {
          /*
          var new_results = [];
          results.forEach(function(membresia) {
            if (angular.isObject(membresia.localidadOrigen)) {
              new_results.push(membresia);
            }
          }, this);*/
          $scope.membresiasgral = results;
        });
    }
    getMembresiasGral();

  }]);
