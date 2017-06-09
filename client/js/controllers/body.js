
(function ()
{
    'use strict';

    angular
      .module('app')
      .controller("BodyController", BodyController);
      
    function BodyController($scope, $location, Promocion, Autenticacion, ngToast)
    {

        console.log("Autenticacion", Autenticacion.user);
        console.log("Autenticacion logeado", Autenticacion.user.logeado);

        $scope.logged = Autenticacion.user.logeado;
        $scope.user = Autenticacion.user;

        Promocion.find({
            filter: {
                limit: 1
            }
        })
        .$promise
        .then(function(result) {
            $scope.promocion = result[0];
        });

    }

})();