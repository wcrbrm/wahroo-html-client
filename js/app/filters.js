
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
              date.setHours( strTime.substring(0,2) );
              date.setMinutes( strTime.substring(3,5) );

              var hours = date.getHours();
              var minutes = date.getMinutes();
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
              return dt.getFullYear() + ", " + m_names[ dt.getMonth() ] + " " + (dt.getDate());
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

              var date = new Date( strIso );
              var hours = date.getHours();
              var minutes = date.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+ minutes : minutes;

              var y = "";
              if ( date.getFullYear() != (new Date()).getFullYear() ) {
                 y = date.getFullYear() + ", ";
              }
              return y + m_names[ date.getMonth() ] + " " + (date.getDate()) +
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
              var dt = new Date( strIso );
              return m_names[ dt.getMonth() ] + " " + (dt.getDate());
          }
          return "";
      };
  });