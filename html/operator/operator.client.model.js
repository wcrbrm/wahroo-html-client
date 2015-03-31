(function() {
    angular.module('app')
        .factory('OperatorModel',  OperatorModel )
    ;

    /* @ngInject */
    function OperatorModel( Restangular ) {

        this.promise = {
            to : {
                read : function( id ) {
                    return Restangular.one('operators', id).get();
                }
            }
        };
        return this;
    }
    OperatorModel.$inject = [ 'Restangular' ];

})();
