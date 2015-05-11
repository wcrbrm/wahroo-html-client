if (!Date.prototype.toISOString) {
  (function() {

    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad(this.getUTCMonth() + 1) +
        '-' + pad(this.getUTCDate()) +
        'T' + pad(this.getUTCHours()) +
        ':' + pad(this.getUTCMinutes()) +
        ':' + pad(this.getUTCSeconds()) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };

  }());
}



angular.module('app').filter('trusted_html', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

angular.module('app')
  .filter('nice_price', function() {
      return function( strPrice ) {
          if ( strPrice ) {
              return "$" + parseFloat( strPrice ).toFixed(2);
          }
          return "";
      };
  });


angular.module('app')
  .filter('nice_zero_price', function() {
      return function( strPrice ) {
          return "$" + parseFloat( strPrice ).toFixed(2);
      };
  });


angular.module('app')
  .filter('nice_features', function() {
      return function( features ) {
        if ( features === undefined ) return "";

        var arrTypes = {};
        for ( var i = 0; i < features.length; i ++ ) {
          var key =  features[ i ].Field;
          if ( typeof( arrTypes[ key ]) === "undefined" ) {
             arrTypes[ key ] = [];
          }
          arrTypes[ key ].push( features[ i ].Display_Value );
        }

        var arrOut = [];
        for ( var k in arrTypes ) {
          arrOut.push( k + ": <strong>" + arrTypes[k].join(", ") + "</strong>");
        }
        return arrOut.join("<br />");
      };
  });


angular.module('app')
  .filter('nice_species', function() {
      return function( species ) {
        if ( species === undefined ) return "";

        var arrTypes = {};
        for ( var i = 0; i < species.length; i ++ ) {
          var key = "Species";
          if ( typeof( arrTypes[ key ]) === "undefined" ) {
             arrTypes[ key ] = [];
          }
          arrTypes[ key ].push( species[ i ].Display_Value );
        }
        var arrOut = [];
        for ( var k in arrTypes ) {
          arrOut.push( k + ": <strong>" + arrTypes[k].join(", ") + "</strong>");
        }
        return arrOut.join("<br />");
      };
  });

angular.module('app')
  .filter('nice_time', function() {
      return function( strTime ) {
          if ( strTime ) {

              var date = new Date();
              date.setUTCHours( strTime.substring(0,2) );
              date.setUTCMinutes( strTime.substring(3,5) );

              var hours = date.getUTCHours();
              var minutes = date.getUTCMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+ minutes : minutes;
              return hours + ':' + minutes + ' ' + ampm;
          }
          return "";
      };
  });


angular.module('app')
  .filter('nice_date', function() {
      return function( strIso ) {

          if ( strIso ) {
              var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", "Dec");
              var dt = new Date( strIso );

              var sOut = m_names[ dt.getUTCMonth() ] + " " + (dt.getUTCDate());

              if ( dt.getUTCFullYear() != (new Date()).getUTCFullYear() ) {
                 sOut += ", " + date.getUTCFullYear();
              }
              return sOut;
          }
          return "";
      };
  });


  angular.module('app')
  .filter('nice_datetime', function() {
      return function( strIso ) {
          if ( strIso ) {
              var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", "Dec");

              var date = new Date( strIso.replace( /\-/g, "/" ).replace("T", " ").replace( /\..+$/, '' ) );
//               console.log( "nice_datetime " + strIso.replace( /\-/g, "/" ).replace("T", " ").replace( /\..+$/g, '' ) );
              // console.log( date );

              var hours = date.getHours();
              var minutes = date.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+ minutes : minutes;

              var y = "";
              if ( date.getUTCFullYear() != (new Date()).getUTCFullYear() ) {
                 y = date.getUTCFullYear() + ", ";
              }
              return y + m_names[ date.getUTCMonth() ] + " " + (date.getUTCDate()) +
                 ' ' + hours + ':' + minutes + ' ' + ampm;
          }
          return "";
      };
  });


angular.module('app')
  .filter('annual_date', function() {
      return function( strIso ) {
          if ( strIso ) {
              var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", "Dec");
              var dt = new Date( strIso.replace( /\-/g, "/" ).replace("T", " ").replace( /\..+$/, '' )  );
              return m_names[ dt.getUTCMonth() ] + " " + (dt.getUTCDate());
          }
          return "";
      };
  });
