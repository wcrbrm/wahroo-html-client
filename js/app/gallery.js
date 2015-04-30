
angular.module('app').directive('bigImages', [ 'RESOURCES', function( RESOURCES ){
    var baseHtml = RESOURCES.ROOT_HTML;
    return {
        restrict: 'A',
        scope: {
             images : "=source"
        }, // isolated scope
        templateUrl : baseHtml + '/html/gallery/big.html',

        controller: [ '$scope', '$window', '$timeout', function ($scope, $window, $timeout) {
            $scope.imageRoot = "http://www.wahroo.com/imagelib/";

            $scope.currentSlide = 0;
            $scope.lastSlide = $scope.images.length - 1;

            $scope.fadeToSlide = function( nextSlide, speed ){
                $scope.currentSlide = nextSlide;
                setTimeout(function(){ jQuery(window).trigger('resize'); }, 50);
                setTimeout(function(){ jQuery(window).trigger('resize'); }, 500);
                setTimeout(function(){ jQuery(window).trigger('resize'); }, 1000);
               // setTimeout(function(){ jQuery(window).trigger('resize'); }, 3000);
               // setTimeout(function(){ jQuery(window).trigger('resize'); }, 5000);
            };

            $scope.change = function( nSlide ) {
                $scope.fadeToSlide( nSlide, 350 );
            };

            $scope.prev = function() {
                var nextSlide= $scope.currentSlide-1;
                if(nextSlide<0){
                    nextSlide=$scope.lastSlide;
                }
                $scope.change(nextSlide);
            };

            $scope.next = function() {
                var nextSlide= $scope.currentSlide+1;
                if(nextSlide > $scope.lastSlide){
                    nextSlide=0;
                }
                $scope.change(nextSlide);
            };

            setTimeout(function(){ jQuery(window).trigger('resize'); }, 1000);

        } ]
    };
}] );


angular.module('app').directive('smallImages', [ 'RESOURCES', function( RESOURCES ){
    var baseHtml = RESOURCES.ROOT_HTML;
    return {
        restrict: 'A',
        scope: {
            images : "=source"
        }, // isolated scope
        templateUrl : baseHtml + '/html/gallery/small.html',
        controller: [ '$scope', function ($scope) {

            $scope.imageRoot = "http://www.wahroo.com/imagelib/";

            $scope.currentSlide = 0;
            $scope.lastSlide = $scope.images.length - 1;

            $scope.fadeToSlide = function( nextSlide, speed ){
                $scope.currentSlide = nextSlide;
                setTimeout(function(){ jQuery(window).trigger('resize'); }, 500);
                setTimeout(function(){ jQuery(window).trigger('resize'); }, 1000);

            };

            $scope.change = function( nSlide ) {
                $scope.fadeToSlide( nSlide, 350 );
            };

            $scope.prev = function() {
                var nextSlide= $scope.currentSlide-1;
                if(nextSlide<0){
                    nextSlide=$scope.lastSlide;
                }
                $scope.change(nextSlide);
            };

            $scope.next = function() {
                var nextSlide= $scope.currentSlide+1;
                if(nextSlide > $scope.lastSlide){
                    nextSlide=0;
                }
                $scope.change(nextSlide);
            };

            setTimeout(function(){ jQuery(window).trigger('resize'); }, 1000);

        } ]
    };
}] );


angular.module('app').directive('autoHeight', [
    '$window', '$timeout', function($window, $timeout) {
      return {
        link: function($scope, $element, $attrs) {
          var combineHeights, siblings;
          combineHeights = function(collection) {
            var heights, node, _i, _len;
            heights = 0;
            for (_i = 0, _len = collection.length; _i < _len; _i++) {
              node = collection[_i];
              heights += node.offsetHeight;
            }
            return heights;
          };
          siblings = function($elm) {
            var elm, _i, _len, _ref, _results;
            _ref = $elm.parent().children();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              elm = _ref[_i];
              if (elm !== $elm[0]) {
                _results.push(elm);
              }
            }
            return _results;
          };
          angular.element($window).bind('resize', function() {

            var additionalHeight, parentHeight;
            additionalHeight = $attrs.additionalHeight || 0;

            // console.log( "resize. additional: " + additionalHeight );
            // console.log( $element );

            return $element.css('height', ( $element.find( "img:visible" ).height() + parseInt( additionalHeight, 10) ) + "px" );
            // return $element.css('height', parentHeight - combineHeights(siblings($element)) - additionalHeight);
          });
          return $timeout(function() {
            return angular.element($window).triggerHandler('resize');
          }, 200);
        }
      };
    }
  ]);
