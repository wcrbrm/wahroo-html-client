(function() {

    angular.module('app', [
        'ngRoute',     // for human freindly app routing
        'ngAnimate',   // for smooth animation on address changes
        'restangular', // for RESTful API requests
        'ui.date',     // jquery UI date picker
        'ngMap',       // google maps widget support
    ] );

    angular.module('app')
        .config( AppRouteProvider )
        .run( AppRunner )
    ;

    /* @ngInject */
    function AppRouteProvider( RestangularProvider, $routeProvider, $locationProvider, RESOURCES ) {

        var baseHtml = RESOURCES.ROOT_HTML;
        RestangularProvider.setBaseUrl( RESOURCES.ROOT_API );
        RestangularProvider.setRestangularFields({ id: "id" });

        $routeProvider
           .when( '/vessels/:id/dt/:dt/men/:men',   { templateUrl: baseHtml + '/html/vessel/avail.html',  controller: 'VesselAvailabilityController' } )
           .when( '/vessels/:id',                   { templateUrl: baseHtml + '/html/vessel/detail.html', controller: 'VesselDetailsController' } )

           .when( '/charters/:id/dt/:dt/men/:men',  { templateUrl: baseHtml + '/html/charter/avail.html',   controller: 'CharterAvailabilityController' } )
           .when( '/charters/:id',                  { templateUrl: baseHtml + '/html/charter/detail.html',  controller: 'CharterDetailsController' } )
           .when( '/charters',                      { templateUrl: baseHtml + '/html/charter/index.html',    controller: 'CharterIndexController' } )

           .when( '/404',     {  templateUrl: baseHtml + '/html/404.html' } )
           .when( '/wahroo',  {  templateUrl: baseHtml + '/html/blank.html' } )

        // .otherwise( { "redirectTo" : RESOURCES.DEFAULT_LOCATION } )
        ;
    }
    AppRouteProvider.$inject = [ 'RestangularProvider', '$routeProvider', '$locationProvider', 'RESOURCES' ];

    /* @ngInject */
    function AppRunner($rootScope, $timeout, $window, $location, $templateCache, Restangular, RESOURCES ) {

        $rootScope.resources = RESOURCES;
        $rootScope.cartItems = {};

        var localCart = localStorage.getItem("wahroo");
        if ( localCart ) $rootScope.cartItems = JSON.parse(localCart);

        $rootScope.$on( '$viewContentLoaded', function() { $templateCache.removeAll(); });

        $rootScope.$on( '$routeChangeStart', function() {
            $rootScope.errors = [];
            $rootScope.back = function() {
                $window.history.back();
            };

            $rootScope.isPhone = function() {
                return ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) );
            };
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $window.scrollTo(0,0);
            }, 1 );
        });

        Restangular.setResponseInterceptor(function(response, operation, what) {
            // console.log( "ResponseInterceptor" );
            $rootScope.loading = false;
            return response;
        });

        Restangular.setRequestInterceptor(function(elem, operation, what, url) {
            // console.log( "RequestInterceptor" );
            $rootScope.errors = []; // very awkward....
            $rootScope.loading = true;
            return elem;
        });

        Restangular.setErrorInterceptor(function(response) {
            // console.log( "ErrorInterceptor " + response.status );
            // console.log( response.data );

            $rootScope.loading = false;
            if ( response.status == 403 || response.status == 401 ) {
                // auth errors handling
                $rootScope.errors.push( response.data );
            } else if ( response.status == 405 ) {
                $rootScope.errors.push( "Method not allowed" );
            } else if ( response.status == 422 ) {

                // validation errors handling
                for ( var field in response.data ) {
                    $rootScope.errors.push( response.data[ field ].join("\n") );
                }

            } else if ( response.data !== undefined ) {

                if ( response.data === null && response.status === 0 ) {
                    $rootScope.errors.push( "Unable to connect to the server. " +
                        "Please refresh the page when internet connection will be restored" );
                } else if ( response.status === 401  ) {
                    $rootScope.errors = response.data.errors;
                } else  {
                    // console.log( response.data.errors );
                    $rootScope.errors = response.data.errors;

                    if ( $rootScope.errors.length === 0 ) {
                        $rootScope.errors.push( "Server response status: " + response.status );
                    }
                }
            }
        });

    }
    AppRunner.$inject = ['$rootScope', '$timeout', '$window', '$location', '$templateCache', 'Restangular', 'RESOURCES' ];

} )();
