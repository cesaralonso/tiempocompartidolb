
(function ()
{
    'use strict';

    angular
      .module('app')
      .controller("BodyController", BodyController);
      
    function BodyController($scope, $location, Promocion, Autenticacion, ngToast, Person)
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



        $scope.doLogout = function(){
            
            Person.logout()
            .$promise
            .then(function(result) {
                
                console.log("Has salido correctamente de sesión.");
                ngToast.create('Has salido correctamente de sesión.');
                
            });

        }

    }

})();