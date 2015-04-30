(function() {

    angular.module('app')
        .controller( 'CharterIndexController',         CharterIndexController )
        .controller( 'CharterAvailabilityController',  CharterAvailabilityController )
        .controller( 'CharterDetailsController',       CharterDetailsController )
    ;

    var Util =  {
        first : function( obj ) { for (var a in obj) return obj[a]; },
        dateOptions : { numberOfMonths: 2, minDate: new Date(), changeYear: true, changeMonth: true },
        dateMobileOptions : { numberOfMonths: 1, minDate: new Date(), changeYear: true, changeMonth: true }
    };



    /* @ngInject */
    function CharterIndexController( $scope, CharterRequest ) {
        CharterRequest.promise.to.get().then( function( response ) {
            $scope.charters = response.charter[0];
        } );
    }
    CharterIndexController.$inject = [ '$scope', 'Charter' ];



    /* @ngInject */
    function CharterDetailsController( $scope, $routeParams, CharterRequest, $location ) {

        $scope.charter_id = $routeParams.id;
        $scope.availability = { dt: "", men: 1 };
        $scope.dateOptions = Util.dateOptions;
        $scope.dateMobileOptions = Util.dateMobileOptions;
        $scope.loading = true;

        CharterRequest.promise.to.read( $routeParams.id ).then( function( response ) {
            $scope.response = response;

            $scope.charter = response.charter[0];
            $scope.captain = response.captain[0];
            $scope.vessels = response.vessel;
            $scope.destination = response.destination[0];

            $scope.loading = false;
        });

        $scope.select_reminder = function() {
            jQuery('html, body').animate({
                scrollTop: jQuery(".availability_form").offset().top - 30
            }, 1000 );
            jQuery(".availability_form").addClass("highlighted");
            jQuery(".availability_form .datepicker").focus();
            setTimeout( function() {
                jQuery(".availability_form").removeClass("highlighted");
            }, 2200 );
        };

        $scope.see_availability = function() {
            $location.path( "/charters/" + $scope.charter_id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_vessel = function( id) {
            $location.path( "/vessels/" + id );
        };
    }
    CharterDetailsController.$inject = [ '$scope', '$routeParams', 'CharterRequest', '$location' ];




    /* @ngInject */
    function CharterAvailabilityController( $scope, $routeParams, CharterAvailRequest, $location ) {
        $scope.charter_id = $routeParams.id;
        $scope.availability = { dt: $routeParams.dt, men: $routeParams.men };
        $scope.dateOptions = Util.dateOptions;
        $scope.dateMobileOptions = Util.dateMobileOptions;
        $scope.loading = true;

        $scope.nothing_is_available = function() {
            if ( !$scope.loading &&
                $scope.charter && $scope.charter.calendar && $scope.charter.calendar.length > 0 ) return false;
            return true;
        };

        $scope.reset_availability = function() {
            // console.log( "reset_availability " + "/charters/" + $scope.charter_id );
            $scope.availability = { dt: "", men: 1 };
            $location.path( "/charters/" + $scope.charter_id  );
        };
        $scope.see_availability = function() {
            $location.path( "/charters/" + $scope.charter_id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_charter = function( id) {
            $location.path( "/charters/" + id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_vessel = function( id ) {
            $location.path( "/vessels/" + id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };

        CharterAvailRequest.promise.to.read( $routeParams.id, $routeParams.dt, $routeParams.men ).then( function( response ) {
            // console.log( response );

            $scope.charter = response.charter[0];
            $scope.captain = response.captain[0];
            $scope.vessels = response.vessel;
            $scope.destination = response.destination[0];
            $scope.loading = false;
        });

    }
    CharterAvailabilityController.$inject = [ '$scope', '$routeParams', 'CharterAvailRequest', '$location' ];


})();
