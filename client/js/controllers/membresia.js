
angular
  .module('app')
  .controller('MembresiaController', function($scope, Membresia, Person, $location, $stateParams, Favorito, ngToast) {

    $scope.user = {}
    $scope.heart = "pink";
    $scope.favorito =  false;
    $scope.favoritoId =  "";

    Person.getCurrent(function(user){
        
        $scope.user = user;

        if(user.id) {
            Person.favoritos({
                id: user.id,
                filter: {
                    where: { "idMembresia": $stateParams.id,}
                }
            })
            .$promise
            .then(function(results) { 
                if(results.length){

                    // Ya se ha agregado a favoritos
                    $scope.heart = "hotpink";
                    $scope.favorito = true;
                    $scope.favoritoId = results[0].id;

                } else {
                    $scope.heart = "pink";
                    $scope.favorito = false;
                }
            });
        } else {
            $scope.heart = "pink";
            $scope.favorito = false;
        }
    });

    $scope.favoritesAdd = function(membresia) {
        if($scope.user.id && !$scope.favorito) {
            
            // LIKE
            var favorito = {
                "idMembresia": membresia.id
            }
            Person.favoritos.create(
                {id: $scope.user.id},
                favorito
                )
            .$promise
            .then(function(results) { 
                console.log("favoritesAdd results", results);
                ngToast.create('Añadido correctamente a favoritos');
                $scope.heart = "hotpink";
                $scope.favorito = true;
                $scope.favoritoId = results.id;
            });
        } else if ($scope.user.id && $scope.favorito){

            // DISLIKE
            Favorito
                .deleteById({id: $scope.favoritoId})
                .$promise
                .then(function() {
                    ngToast.create({
                        className: 'danger',
                        content: 'Esta membresia ya no esta en tu lista de favoritos'
                    });
                    $scope.heart = "pink";
                    $scope.favorito = false;
                });
        } else {
            ngToast.create({
                className: 'danger',
                content: 'Debes accesar como usuario para realizar esta acción'
            });
        }
    }

    $scope.cambiaImagenCarrusel = function(src) {
        console.log("src", src);
        $scope.carrusel_img_src = src;
    }

    $scope.sendMailContact = function(contacto) {
        console.log("contacto", contacto);
    }

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

        $scope.membresia = results;

        //Carga primer imagenes
        if ($scope.membresia.imagenes.length) {
            $scope.carrusel_img_src = $scope.membresia.imagenes[0].src;
        }

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
            
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
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

  });
