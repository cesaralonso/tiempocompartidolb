
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

        $scope.autenticacion = {}
        $scope.autenticacion.logged = Autenticacion.user.logeado;
        $scope.autenticacion.user = Autenticacion.user;


    }

})();