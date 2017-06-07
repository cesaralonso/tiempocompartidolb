
angular
  .module('app')
  .controller('MembresiaubicacionController', function($scope, Membresia, Person, $location, $stateParams) {

    function getMembresia(id) {
      $scope.membresias = Membresia.findById({
        id: id,
        filter: {
          where: {},
          limit: 10
        }
      })
      .$promise
      .then(function(results) {

        if(results.ubicacion !== undefined) {
            //Mapa
            var cities = [{
                club: results.ubicacion.clubNombre,
                city: results.ubicacion.localidadNombre,
                desc: results.ubicacion.descripcion,
                lat: results.ubicacion.lat,
                lng: results.ubicacion.lng
            }];

            var mapOptions = {
                zoom: 18,
                scrollwheel: false,
                center: new google.maps.LatLng(results.ubicacion.lat, results.ubicacion.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            
            $scope.map = new google.maps.Map(document.getElementById('map_ubicacion'), mapOptions);
            $scope.markers = [];
            var infoWindow = new google.maps.InfoWindow();
            var createMarker = function(info) {
                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(info.lat, info.lng),
                    title: info.club
                });
                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });
                $scope.markers.push(marker);
            }
            for (i = 0; i < cities.length; i++) {
                createMarker(cities[i]);
            }
            $scope.openInfoWindow = function(e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
        }
      });
    };
    getMembresia($stateParams.id);
    console.log("$stateParams", $stateParams);

  });
