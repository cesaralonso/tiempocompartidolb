
angular
  .module('app')
  .controller('LoginController', function($rootScope, $scope, $location, Person, ngToast, Autenticacion) {

    console.log("Person.isAuthenticated()", Person.isAuthenticated());

    $scope.doLogin = function(credentials) {

      Person.login(credentials,
      function() {

        ngToast.create('Logeado correctamente');
        $rootScope.currentUser = user;

        Autenticacion.user = user;
        Autenticacion.user.logeado = true;

        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);

      }, function(res) {
        // error
        ngToast.create({
          className: 'danger',
          content: 'Tus credenciales no son correctas'
        });
        
      });


    }

  });
