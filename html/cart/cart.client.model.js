(function() {
    angular.module('app')
        .factory('ShoppingCart',  ShoppingCart )
    ;

    /* @ngInject */
    function ShoppingCart( $rootScope, Restangular, $http, RESOURCES ) {
        me = this;

        this.item = {
            add : function( nAvailID, nShares, calendar ) {
                if ( parseInt( nShares, 10 ) === 0 ) { return this.item.remove( nAvailID ); }
                localStorage.setItem( "calendar_" + nAvailID, JSON.stringify( calendar ) );

                $rootScope.cartItems[ nAvailID ] = nShares;
                $rootScope.$apply();

                localStorage.setItem( "wahroo",  JSON.stringify( $rootScope.cartItems ) );
            },
            remove : function( nAvailID ) {
                $rootScope.cartItems[ nAvailID ] = undefined;

                var phase = $rootScope.$$phase;
                if(phase != '$apply' && phase != '$digest') {
                      $rootScope.$apply();
                }
                localStorage.setItem("wahroo",  JSON.stringify( $rootScope.cartItems ) );
            },
            book : function() {
                $script(  RESOURCES.ROOT_API + "checkout?cart=" + escape( JSON.stringify( $rootScope.cartItems ) ) );
            }
        };
        return this;
    }
    ShoppingCart.$inject = [ '$rootScope', 'Restangular', '$http', 'RESOURCES' ];

})();
