(function() {

    angular.module('app')
        .controller( 'ShoppingCartItemController', ShoppingCartItemController )
    ;


    /* @ngInject */
    function ShoppingCartItemController( $scope, ShoppingCart ) {

        // console.log( " in ShoppingCartItemController" );
        $scope.calendar = function( nAvailId ) {
            return JSON.parse( localStorage.getItem( "calendar_" + nAvailId ));
        };

        $scope.getCharterName = function( nAvailId ) {
            // console.log( 'getting availability record ' + nAvailId );
            var calendar = $scope.calendar( nAvailId );
            return calendar.Headline;
        };
        $scope.getVesselName = function( nAvailId ) {
            var calendar = $scope.calendar( nAvailId );
            return calendar.Vessel_Name;
        };
        $scope.getStartTime = function( nAvailId ) {
            var calendar = $scope.calendar( nAvailId );
            return calendar.Start_Time;
        };
        $scope.getStartDate = function( nAvailId ) {
            var calendar = $scope.calendar( nAvailId );
            return calendar.Start_DateTime;
        };
        $scope.getDuration = function( nAvailId ) {
            var calendar = $scope.calendar( nAvailId );
            return calendar.Duration_Hours;
        };

    }
    ShoppingCartItemController.$inject = [ '$scope', 'ShoppingCart' ];


})();
