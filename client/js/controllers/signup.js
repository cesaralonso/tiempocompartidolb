
angular
  .module('app')
  .controller('SignupController', function($scope, Person, ngToast) {

    $scope.doSignup = function(credentials) {

      if(credentials.password !== credentials.repassword){
        // create a toast with settings:
        ngToast.create({
          className: 'danger',
          content: 'Error, los passwords no son iguales'
        });
        return false;
      }

      Person
        .create({email: credentials.email, password: credentials.password})
        .$promise
        .then(function(signup) {
          $location.path('/login');
        });
    };
  });
