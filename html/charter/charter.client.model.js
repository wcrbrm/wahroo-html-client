(function() {
    angular.module('app')
        .factory('CharterRequest',  CharterRequest )
        .factory('CharterAvailRequest',  CharterAvailRequest )
    ;

    /* @ngInject */
    function CharterRequest( Restangular ) {
        this.promise = {
            to : {
                get : function ( params ) {
                    return Restangular.all('charters').getList( params );
                },
                read : function( id ) {
                    return Restangular.one('charters', id).get();
                }
            }
        };
        return this;
    }
    CharterRequest.$inject = [ 'Restangular' ];

    /* @ngInject */
    function CharterAvailRequest(  Restangular ) {

        this.promise = {
            to : {
                // read state about the vessel
                read : function( id, dt, men ) {
                    return Restangular.one('charters', id).one( 'dt', dt ).one( 'men', men ).get();
                }
            }
        };
        return this;
    }
    CharterAvailRequest.$inject = [ 'Restangular' ];
})();
