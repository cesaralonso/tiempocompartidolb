
'use-strict'

angular
  .module('app')
  .controller('ListadosdetailController', function($scope, $state, $stateParams, Membresia) {
    
    console.log("detail listado $stateParams",$stateParams);

    $scope.listados = [];

    var categoria = $stateParams.categoria;
    var subcategoria = $stateParams.subcategoria;


    var club_destino = $stateParams.titulo.replace('Rentas-Vacacionales-En-', '').split('--');
    var club = club_destino[0].replace(new RegExp('-', 'g'), ' ');
    var destino = club_destino[1].replace(new RegExp('-', 'g'), ' ');
    var titulo = $stateParams.titulo.replace(new RegExp('-', 'g'), ' ');

    $scope.destino = destino;
    $scope.club = club;
    $scope.titulo = titulo;

    console.log("titulo",titulo);
    console.log("destino",destino);
    console.log("club",club);

    var where_clubes = {
        and: [{
            clubNombre: club
        },{
            localidadNombre: destino
        }]
    };

    var where_paises = {
        paisNombre: pais
    };

    var where_destinos = {
        localidadNombre: destino
    };
    var where_unidades = {
        localidadNombre: unidad
    };

    var where_amenidades = {
        localidadNombre: amenidad
    };



    var where = '';
    if(categoria === 'clubes') {
        where = where_clubes;
    } else if(categoria === 'paises') {
        where = where_paises;
    } else if(categoria === 'destinos') {
        where = where_destinos;
    }
    
    console.log("where",where);

    Membresia
        .find({
            filter: {
                where: {
                    localidadNombre: destino
                }
            }
        })
        .$promise
        .then(function(membresias) {
            console.log("membresias",membresias);
            $scope.listados = membresias;
        });
    
  });
