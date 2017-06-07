
angular
  .module('app')
  .controller('MisdatosController', function($scope, Person) {

    Person.getCurrent(function(user){
      $scope.person = user;
    });
    
    function updatePerson(person) {
      console.log("updatePerson()", person);
      
        $scope.person.$save();
    };

  });
