'use-strict'

angular.module('app')
    .factory("Autenticacion", function(){

        var response = { 
            user : {
                logeado: false
            }
        }
        return response;
        
    })