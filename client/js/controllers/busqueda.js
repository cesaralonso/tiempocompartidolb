
angular
  .module('app')
  .controller('BusquedaController', function($scope, Membresia, $location, $stateParams) {

        $scope.busqueda = {};

        // Comenzar
        Membresia.find({
            filter: {
                limit: 5
            }
        })
        .$promise
        .then(function(results) {
            pintarMapa(results);
            pintarListado(results);
        });

        $scope.doSearch = function(busqueda) {
            console.log("busqueda", busqueda);

            var where = {};

            if (busqueda !== undefined) {
                if (busqueda.destino !== undefined) {
                    where.localidadNombre = busqueda.destino;
                } 
                if (busqueda.banios !== undefined) {
                    where.banosCompletos = busqueda.banios;
                } 
                if (busqueda.camas !== undefined) {
                    where.numCamas = busqueda.camas;
                } 
                if (busqueda.dormitorios !== undefined) {
                    where.dormitorios = busqueda.dormitorios;
                } 
                if (busqueda.llegada !== undefined) {
                    where.llegada = busqueda.llegada;
                } 
                if (busqueda.salida !== undefined) {
                    where.salida = busqueda.salida;
                } 
                if (busqueda.maxOcupantes !== undefined) {
                    where.maxOcupantes = busqueda.maxOcupantes;
                } 
                if (busqueda.metodoPago !== undefined) {
                    where.metodoPago = busqueda.metodoPago;
                } 
                if (busqueda.tipo !== undefined) {
                    if (busqueda.tipo === "RENTA") { 
                        where.renta = true;
                    }
                    else if (busqueda.tipo === "VENTA") { 
                        where.venta = true;
                    }
                } 
            }

            Membresia.find({
                filter : {
                    where
                }
            })
            .$promise
            .then(function(results) {
                console.log("results", results);
                pintarMapa(results);
                pintarListado(results);
            });
        }

        function pintarListado(results) {
            $scope.resultados = results;
        }

        function pintarMapa(results) {
            
            //Mapa
            var locations = [];
            for (i = 0; i < results.length; i++) {
                if (results[i].ubicacion !== undefined) {
                    locations.push(
                        {
                            club: results[i].clubNombre,
                            city: results[i].localidadNombre,
                            desc: results[i].descripcion,
                            lat: results[i].ubicacion.lat,
                            lng: results[i].ubicacion.lng
                        }
                    );
                }
            }

            if (locations.length) {
                var mapOptions = {
                    zoom: 18,
                    scrollwheel: false,
                    center: new google.maps.LatLng(locations[0].lat, locations[0].lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                
                $scope.map = new google.maps.Map(document.getElementById('map_search'), mapOptions);
                $scope.markers = [];
                var infoWindow = new google.maps.InfoWindow();
                var createMarker = function(info) {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng(info.lat, info.lng),
                        title: info.club
                    });
                    marker.content = '<div class="infoWindowContent">' + info.desc + '<a ng-href="#">VER MÁS</a></div>';
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open($scope.map, marker);
                    });
                    $scope.markers.push(marker);
                }
                for (i = 0; i < locations.length; i++) {
                    createMarker(locations[i]);
                }
                $scope.openInfoWindow = function(e, selectedMarker) {
                    e.preventDefault();
                    google.maps.event.trigger(selectedMarker, 'click');
                }
            } else {
                alert("No hay registros que coincidan con la búsqueda");
            }
        }
  });
