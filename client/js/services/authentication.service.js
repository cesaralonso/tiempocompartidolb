'use-strict'

angular.module('app')
    .factory("Autenticacion", function(){

        var response = { user: {logeado:true}}
        return response;
        
    })