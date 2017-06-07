
angular
  .module('app')
  .controller('LoginController', function($rootScope, $scope, $location, Person, ngToast, Autenticacion) {

    console.log("Person.isAuthenticated()", Person.isAuthenticated());

    $scope.doLogin = function(credentials) {

      // In the Login controller
      Person.login(credentials, function(user) {

        ngToast.create('Logeado correctamente');
        $rootScope.currentUser = user;

        Autenticacion.user = user;
        Autenticacion.user.logeado = true;

        var next = $location.nextAfterLogin || '/';
        $location.nextAfterLogin = null;
        $location.path(next);
      });
    }

  });
