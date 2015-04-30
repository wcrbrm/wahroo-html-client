(function() {

    angular.module('app')
        .controller( 'VesselIndexController',         VesselIndexController )
        .controller( 'VesselAvailabilityController',  VesselAvailabilityController )
        .controller( 'VesselDetailsController',       VesselDetailsController )
    ;

    var Util =  {
        first : function( obj ) { for (var a in obj) return obj[a]; },
        dateOptions : { numberOfMonths: 2, minDate: new Date(), changeYear: true, changeMonth: true },
        dateMobileOptions : { numberOfMonths: 1, minDate: new Date(), changeYear: true, changeMonth: true }
    };

    /* @ngInject */
    function VesselIndexController( $scope, VesselRequest ) {
        VesselRequest.promise.to.get().then( function( response ) {
            $scope.vessels = response.vessel[0];
        } );
    }
    VesselIndexController.$inject = [ '$scope', 'VesselRequest' ];


    /* @ngInject */
    function VesselDetailsController( $scope, $routeParams, VesselRequest, $location ) {

        $scope.loading = true;
        $scope.vessel_id = $routeParams.id;
        $scope.availability = { dt: "", men: 1 };
        $scope.dateOptions = Util.dateOptions;
        $scope.dateMobileOptions = Util.dateMobileOptions;

        VesselRequest.promise.to.read( $routeParams.id ).then( function( response ) {
            $scope.response = response;

            $scope.vessel = response.vessel[0];
            $scope.captain = response.captain[0];
            $scope.charters = response.charter;
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
            $location.path( "/vessels/" + $scope.vessel_id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_charter = function( id) {
            $location.path( "/charters/" + id );
        };

    }
    VesselDetailsController.$inject = [ '$scope', '$routeParams', 'VesselRequest', '$location' ];

    /* @ngInject */
    function VesselAvailabilityController( $scope, $routeParams, VesselAvailRequest, $location ) {

        $scope.loading = true;
        $scope.vessel_id = $routeParams.id;
        $scope.availability = { dt: $routeParams.dt, men: $routeParams.men };
        $scope.dateOptions = Util.dateOptions;
        $scope.dateMobileOptions = Util.dateMobileOptions;

        $scope.nothing_is_available = function() {
            for ( var ch in $scope.charters ) {
                if ( $scope.charters[ch].calendar && $scope.charters[ch].calendar.length > 0 ) return false;
            }
            return true;
        };

        $scope.reset_availability = function() {
            $scope.availability = { dt: "", men: 1 };
            $location.path( "/vessels/" + $scope.vessel_id  );
        };
        $scope.see_availability = function() {
            $location.path( "/vessels/" + $scope.vessel_id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_charter = function( id) {
            $location.path( "/charters/" + id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };
        $scope.navigate_vessel = function( id ) {
            $location.path( "/vessels/" + id + "/dt/" + $scope.availability.dt + "/men/" + $scope.availability.men );
        };

        VesselAvailRequest.promise.to.read( $routeParams.id, $routeParams.dt, $routeParams.men ).then( function( response ) {
            // console.log( response );
            $scope.response = response;

            $scope.vessel = response.vessel[0];
            $scope.captain = response.captain[0];
            $scope.charters = response.charter;
            $scope.destination = response.destination[0];

            $scope.loading = false;
        });
    }
    VesselAvailabilityController.$inject = [ '$scope', '$routeParams', 'VesselAvailRequest', '$location' ];

})();
