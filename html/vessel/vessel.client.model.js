(function() {
    angular.module('app')
        .factory('VesselRequest',  VesselRequest )
        .factory('VesselAvailRequest',  VesselAvailRequest )
    ;

    /* @ngInject */
    function VesselRequest(  Restangular ) {

        this.promise = {
            to : {
                // read state about all vessels?
                get : function ( params ) {
                    return Restangular.all('vessels').getList( params );
                },
                // read state about the vessel
                read : function( id ) {
                    return Restangular.one('vessels', id).get();
                }
            }
        };
        return this;
    }
    VesselRequest.$inject = [ 'Restangular' ];


    /* @ngInject */
    function VesselAvailRequest(  Restangular ) {

        this.promise = {
            to : {
                // read state about the vessel
                read : function( id, dt, men ) {
                    return Restangular.one('vessels', id).one( 'dt', dt ).one( 'men', men ).get();
                }
            }
        };
        return this;
    }
    VesselAvailRequest.$inject = [ 'Restangular' ];

})();
