
angular
  .module('app')
  .controller('MisfavoritosController', function($scope, Favorito, Membresia, Person, $rootScope) {

    Person.getCurrent(function(user) {
      Person.favoritos({
        id: user.id,
      })
      .$promise
      .then(function(favoritos) {
        console.log(favoritos);
        $scope.favoritos = favoritos;
      });

    });

  });
