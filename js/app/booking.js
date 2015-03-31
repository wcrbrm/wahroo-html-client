function getCharterSplitOptions( nShares, nSplits ) {
    var Individual_Shares = 0, Half_Shares_Only = 2, Quarter_Shares_Only = 4, Full_Shares_Only = 1;
    var hashSplits = {};
    if ( nShares > 1 && ( nShares % 2 ) !== 0 ) {
        console.log("Invalid Number of Fisherman" + nShares ); return hashSplits;
    }

    if (nShares < 4 && nSplits == Quarter_Shares_Only ) { // we cannot divide 2 by 4..
      nSplits = Half_Shares_Only;
    }
    if (nShares < 2 && nSplits == Half_Shares_Only) { // we cannot divide 1 by 2
      nSplits = Full_Shares_Only;
    }

    if (nSplits == Individual_Shares) {
      for (var i = 1; i <= nShares; i++) {
        hashSplits[i] = i + "/" + nShares;
      }

    } else if (nSplits == Half_Shares_Only ) {
        var nMod  = nShares % nSplits;
        if (nMod === 0) {
            var nSplitsPerPerson = parseInt(nShares / nSplits, 10 );
            hashSplits[ nSplitsPerPerson ] = nSplitsPerPerson + "/" + nShares;
            hashSplits[ nShares ] = nShares + "/" + nShares;
        } else {
            var nSplitsPerPerson2 = parseInt(nShares / nSplits, 10 ) + 1;
            hashSplits[ nSplitsPerPerson2 ] = nSplitsPerPerson2 + "/" + nShares;
        }

    } else if (nSplits == Quarter_Shares_Only) {

        var nMod4 = nShares % nSplits;
        if (nMod4 === 0) {
            var nSplitsPerPerson4 = parseInt(nShares / nSplits, 10 );
            hashSplits[nSplitsPerPerson4] = nSplitsPerPerson4 + "/" + nShares;
            hashSplits[(2*nSplitsPerPerson4)] = (2*nSplitsPerPerson4) + "/" + nShares;
            hashSplits[(3*nSplitsPerPerson4)] = (3*nSplitsPerPerson4) + "/" + nShares;
            hashSplits[nShares] = nShares + "/" + nShares;
        } else {
            var nHalfSplit = parseInt(nShares / 2, 10);
            var nQuarterSplit = parseInt(nShares / 4, 10) + 1;
            var n3rdQuarterSplit = parseInt( 3 *  nShares / 4, 10);
            hashSplits[nQuarterSplit] = nQuarterSplit + "/" + nShares;
            hashSplits[nHalfSplit] = nHalfSplit + "/" + nShares;
            hashSplits[n3rdQuarterSplit] = n3rdQuarterSplit + "/" + nShares;
            hashSplits[nShares] = nShares + "/" + nShares;
        }

    } else if (nSplits == Full_Shares_Only) {
        hashSplits[ nShares ] = nShares + "/" + nShares;
    } else {
        console.log( "Invalid Splits number " + nSplits );
        return hashSplits;
    }
    return hashSplits;
}


angular.module('app').directive('selectToBook', [ '$rootScope', 'ShoppingCart', function( $rootScope, ShoppingCart ){
    return {
        restrict: 'A',
        scope: {
           calendar: '=record'
        },
        link: function (scope, element, attr) {

          var sOtherOptions = "";
          var nAvl = scope.calendar.ID;
          arrOptions = getCharterSplitOptions( scope.calendar.Shares, scope.calendar.Splits );
          for ( var k in arrOptions ) {
             var sSelected = "";
             if ( $rootScope.cartItems[ nAvl ] == k ) {
                sSelected = " selected='selected' ";
             }
             sOtherOptions += "<option value='"+k+"' "+sSelected+">" + arrOptions[ k ] + "</option>";
          }
          element.html( '<option value="0"> - </option>' + sOtherOptions );
          element.attr("rel", nAvl );

          element.on("change", function( event ) {
            var nAvailId = element.attr("rel");
            var nSharesToBook = element.val();
            if ( parseInt( element.val(), 10 ) > 0 ) {
              ShoppingCart.item.add( nAvailId, nSharesToBook, scope.calendar );
            } else {
              ShoppingCart.item.remove( nAvailId );
            }
          });

          $rootScope.$watch( function() {
            if ( $rootScope.cartItems[ nAvl ] !== undefined ) {
              element.val( $rootScope.cartItems[ nAvl ] );
            } else {
              element.val( 0);
            }
          });

        }
    };
} ] );



angular.module('app').directive('floatingShoppingCart', [ 'RESOURCES', '$rootScope', 'ShoppingCart', function( RESOURCES, $rootScope, ShoppingCart ){
    var baseHtml = RESOURCES.ROOT_HTML;
    return {
        restrict: 'A',
        // scope: false,
        templateUrl : baseHtml + '/html/cart/index.html',
        controller: [ '$scope', '$rootScope', function ($scope, $rootScope, $timeout) {

            $scope.hasItemsInCart = function() {
                for ( var i in $rootScope.cartItems ) {
                   if ( $rootScope.cartItems[ i ] === undefined ) continue;
                   return true;
                }
                return false;
            };

            $scope.destroy = function( nAvailId ) {
                ShoppingCart.item.remove( nAvailId );
            };

            $scope.checkout = function() {
                //  request to wahroo and redirect
                ShoppingCart.item.book();
            };

            $scope.getSubTotal = function() {
                var fltTotal = 0;
                for ( var nAvailId in $rootScope.cartItems ) {
                   if ( $rootScope.cartItems[ nAvailId ] === undefined ) continue;
                   var nQty = $rootScope.cartItems[ nAvailId ];
                   var calendar = JSON.parse( localStorage.getItem( "calendar_" + nAvailId ));
                   fltTotal += parseFloat( calendar.Price, 10 ) * nQty / parseFloat( calendar.Shares, 10 );
                }
                return fltTotal;
            };

            $scope.getDepositTotal = function() {
                var decTotalDeposit = 0;
                for ( var nAvailId in $rootScope.cartItems ) {
                   if ( $rootScope.cartItems[ nAvailId ] === undefined ) continue;

                   var nQty = $rootScope.cartItems[ nAvailId ];
                   var calendar = JSON.parse( localStorage.getItem( "calendar_" + nAvailId ));
                   var fltSubTotal = parseFloat( calendar.Price, 10 ) * nQty / parseFloat( calendar.Shares, 10 );

                   decDeposit =  fltSubTotal * parseFloat( calendar.Deposit_Percent, 10 ) / 100  +
                                 fltSubTotal * parseFloat( calendar.Wahroo_Booking_Fee_Percent, 10 ) / 100;
                   decTotalDeposit += decDeposit;

                }
                return decTotalDeposit;
            };

        } ]
    };
} ] );
