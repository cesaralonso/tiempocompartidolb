(function ()
{
    'use strict';
angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngToast',
    'ngAnimate'
  ])
  .config(function($stateProvider,
      $urlRouterProvider, $locationProvider, $httpProvider) {

      $locationProvider.html5Mode(true);


    /*
    // angular-translate configuration
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');*/


    // Inside app config block
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      console.log("LoopBackAuth $httpProvider.interceptors.push", LoopBackAuth);
      return {
        responseError: function(rejection) {
          if (rejection.status == 401) {
        //Now clearing the loopback values from client browser for safe logout...
            LoopBackAuth.clearUser();
            LoopBackAuth.clearStorage();
            $location.nextAfterLogin = $location.path();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        pageType: '',
        title: 'Home'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        pageType: 'paginas-internas',
        title: 'Login'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupController',
        pageType: 'paginas-internas',
        title: 'Regístrate'
      })
      .state('condiciones-de-uso', {
        url: '/condiciones-de-uso',
        templateUrl: 'views/condiciones-de-uso.html',
        controller: 'CondicionesdeusoController',
        pageType: 'paginas-internas',
        title: 'Condiciones de uso'
      })
      .state('acerca-de-nosotros', {
        url: '/acerca-de-nosotros',
        templateUrl: 'views/acerca-de-nosotros.html',
        controller: 'AcercadenosotrosController',
        pageType: 'paginas-internas',
        title: 'Acerca de nosotros'
      })
      .state('contacto', {
        url: '/contacto',
        templateUrl: 'views/contacto.html',
        controller: 'ContactoController',
        pageType: 'paginas-internas',
        title: 'Contacto'
      })
      .state('politicas-de-privacidad', {
        url: '/politicas-de-privacidad',
        templateUrl: 'views/politicas-de-privacidad.html',
        controller: 'PoliticasdeprivacidadController',
        pageType: 'paginas-internas',
        title: 'Politicas de privacidad'
      })
      .state('preguntas-frecuentes-sobre-tiempos-compartidos', {
        url: '/preguntas-frecuentes-sobre-tiempos-compartidos',
        templateUrl: 'views/preguntas-frecuentes-sobre-tiempos-compartidos.html',
        controller: 'FaqsController',
        pageType: 'paginas-internas',
        title: 'Preguntas frecuentes sobre tiempos compartidos'
      })
      .state('mi-cuenta', {
        url: '/mi-cuenta',
        templateUrl: 'views/mi-cuenta.html',
        controller: 'MicuentaController',
        pageType: 'paginas-internas',
        title: 'Mi cuenta',
        authenticate: true
      })
      .state('mis-datos', {
        url: '/mis-datos',
        templateUrl: 'views/mis-datos.html',
        controller: 'MisdatosController',
        pageType: 'paginas-internas',
        title: 'Mis datos',
        authenticate: true
      })
      .state('mis-membresias', {
        url: '/mis-membresias',
        templateUrl: 'views/mis-membresias.html',
        controller: 'MismembresiasController',
        pageType: 'paginas-internas',
        title: 'Mis membresias',
        authenticate: true
      })
      .state('mis-mensajes', {
        url: '/mis-mensajes',
        templateUrl: 'views/mis-mensajes.html',
        controller: 'MismensajesController',
        pageType: 'paginas-internas',
        title: 'Mis mensajes',
        authenticate: true
      })
      .state('mis-favoritos', {
        url: '/mis-favoritos',
        templateUrl: 'views/mis-favoritos.html',
        controller: 'MisfavoritosController',
        pageType: 'paginas-internas',
        title: 'Mis favoritos',
        authenticate: true
      })
      .state('new-membresia', {
        url: '/new-membresia',
        templateUrl: 'views/new-membresia.html',
        controller: 'NewmembresiaController',
        pageType: 'paginas-internas',
        title: 'Forma de creación de membresia',
        authenticate: true
      })
      .state('edit-membresia', {
        url: '/edit-membresia/:id',
        templateUrl: 'views/edit-membresia.html',
        controller: 'EditmembresiaController',
        pageType: 'paginas-internas',
        title: 'Forma de edición de membresia',
        authenticate: true
      })
      .state('membresia-ubicacion', {
        url: '/mi-cuenta/membresia-ubicacion/:id',
        templateUrl: '../../views/membresia-ubicacion.html',
        controller: 'MembresiaubicacionController',
        pageType: 'paginas-internas',
        title: 'Ubicación de membresia',
        authenticate: true
      })
      .state('busqueda', {
        url: '/busqueda',
        templateUrl: 'views/busqueda.html',
        controller: 'BusquedaController',
        pageType: 'paginas-internas',
        title: 'Búsqueda'
      })
      .state('membresia', {
        url: '/membresia/:titulo/:id',
        templateUrl: '../../views/membresia.html',
        controller: 'MembresiaController',
        pageType: 'paginas-internas',
        title: 'Catálogo'
      })
      .state('promociones', {
        url: '/promociones',
        templateUrl: '../../views/promociones.html',
        controller: 'PromocionesController',
        pageType: 'paginas-internas',
        title: 'Promociones increibles'
      })
      .state('promociones-detail', {
        url: '/promociones/:titulo/:id',
        templateUrl: '../../views/promociones-detail.html',
        controller: 'PromocionesdetailController',
        pageType: 'paginas-internas',
        title: 'Detalle de promoción'
      })
      .state('listados', {
        url: '/listados',
        templateUrl: '../../views/listados.html',
        controller: 'ListadosController',
        pageType: 'paginas-internas',
        title: 'Listados increibles'
      })
      .state('listados-categoria', {
        url: '/listados/:categoria/:titulo',
        templateUrl: '../../views/listados-categoria.html',
        controller: 'ListadoscategoriaController',
        pageType: 'paginas-internas',
        title: 'Listados de Categorias de Listados de Tiempos Compartidos'
      })
      .state('listados-detail', {
        url: '/listados/:categoria/:subcategoria/:titulo',
        templateUrl: '../../../views/listados-detail.html',
        controller: 'ListadosdetailController',
        pageType: 'paginas-internas',
        title: 'Listados de Listado Principal'
      })
      .state('concepto-de-tiempo-compartido', {
        url: '/concepto-de-tiempo-compartido',
        templateUrl: '../../../views/concepto-de-tiempo-compartido.html',
        controller: 'ConceptoController',
        pageType: 'paginas-internas',
        title: 'Concepto de tiempo compartido'
      });

      
    $urlRouterProvider.otherwise('/');
  })
  .run(['$rootScope', '$state', 'LoopBackAuth', function($rootScope, $state, LoopBackAuth) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      
      // Seteo de variables en página
      $rootScope.title = next.title;
      $rootScope.pageType = next.pageType;

      // redirect to login page if not logged in
      if (next.authenticate && !LoopBackAuth.currentUserId) {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
      }
    });
   
  }]);



})();