//-- begin of script.min.js
(function(e,t,n){typeof module!="undefined"&&module.exports?module.exports=n():typeof define=="function"&&define.amd?define(n):t[e]=n()})("$script",this,function(){function v(e,t){for(var n=0,r=e.length;n<r;++n)if(!t(e[n]))return f;return 1}function m(e,t){v(e,function(e){return!t(e)})}function g(e,t,a){function d(e){return e.call?e():r[e]}function b(){if(!--p){r[h]=1,c&&c();for(var e in s)v(e.split("|"),d)&&!m(s[e],d)&&(s[e]=[])}}e=e[l]?e:[e];var f=t&&t.call,c=f?t:a,h=f?e.join(""):t,p=e.length;return setTimeout(function(){m(e,function(e){if(e===null)return b();if(u[e])return h&&(i[h]=1),u[e]==2&&b();u[e]=1,h&&(i[h]=1),y(!n.test(e)&&o?o+e+".js":e,b)})},0),g}function y(n,r){var i=e.createElement("script"),s=f;i.onload=i.onerror=i[d]=function(){if(i[h]&&!/^c|loade/.test(i[h])||s)return;i.onload=i[d]=null,s=1,u[n]=2,r()},i.async=1,i.src=n,t.insertBefore(i,t.firstChild)}var e=document,t=e.getElementsByTagName("head")[0],n=/^https?:\/\//,r={},i={},s={},o,u={},a="string",f=!1,l="push",c="DOMContentLoaded",h="readyState",p="addEventListener",d="onreadystatechange";return!e[h]&&e[p]&&(e[p](c,function b(){e.removeEventListener(c,b,f),e[h]="complete"},f),e[h]="loading"),g.get=y,g.order=function(e,t,n){(function r(i){i=e.shift(),e.length?g(i,r):g(i,t,n)})()},g.path=function(e){o=e},g.ready=function(e,t,n){e=e[l]?e:[e];var i=[];return!m(e,function(e){r[e]||i[l](e)})&&v(e,function(e){return r[e]})?t():!function(e){s[e]=s[e]||[],s[e][l](t),n&&n(i)}(e.join("|")),g},g.done=function(e){g([null],e)},g});
//-- end of script.min.js

/*! head.load - v1.0.3 */
(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);
/*
//# sourceMappingURL=head.load.min.js.map
*/

function mapsLoaded() {

}

var whrldr = {};
whrldr.log = function( x )
{
    var userAgent = navigator.userAgent.toLowerCase();
    // ignore logging for all msie-s
    if (/msie/.test(userAgent) ) return;

    if ( console && console.log ) {
        console.log( x );
    }
};


( function() {

    whrldr.init = function( opt ) {

        whrldr.log( opt );
        whrldr.webroot = opt.html_root;

        // fix links with href="#" that everyone loves.
        jQuery("a[href=#]").each( function() {
            if ( jQuery(this).attr("href") == '#' ) {
                jQuery(this).attr("href", 'javascript:void(0)');
                // now this should not be an angularjs link anymore!
            }
        });

        // LOAD CSS
        head.load( whrldr.webroot + "dist/" + opt.bundle + ".css",function() {

            whrldr.log( "wahroo: CSS was loaded");

            // LOAD JAVASCRIPT MODULES AFTER CSS IS LOADED
            $script([
                "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.js",
                "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.28/angular.js",
                "//maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=mapsLoaded"
            ], function() {
                $script([
                    "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.28/angular-route.min.js",
                    "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.28/angular-animate.min.js",
                    "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.28/angular-cookies.min.js",

                    whrldr.webroot + "js/angular/ui-date.js",
                    whrldr.webroot + "js/angular/lodash.min.js" ,
                    whrldr.webroot + "js/angular/restangular.min.js",
                    whrldr.webroot + "js/angular/ng-map.js"
                ], function() {

                    // once we have all libraries - loading our APP
                    whrldr.log( "wahroo: libraries loaded, loading application");
                    jQuery("html").attr("ng-app","app"); //ensure we will be good with angular

                    $script ( whrldr.webroot + "dist/" + opt.bundle + ".min.js?t=" + Math.random(), function() {
                        whrldr.log( "wahroo: application was loaded successfully");

                        angular.module("app").constant('RESOURCES', (function() {
                          return {
                            ROOT_HTML: opt.html_root,
                            ROOT_API:  opt.api_root,
                            DEFAULT_LOCATION : opt.location
                          }
                        })());

                        angular.bootstrap(document, ['app']);

                    });
                });
            });

        }); // head: css loader launched
    };


    jQuery( document ).ready( function() {

        jQuery( "script" ).each( function( ) {
            if ( jQuery(this).attr("src") &&
                 jQuery(this).attr("src").indexOf( "js/loader.js" ) !== -1 ) {

                whrldr.log( "wahroo: loader.js detected????");

                var sSelector = jQuery(this).attr("data-container");
                if ( ! sSelector ) { sSelector = jQuery(this).parent(); } // defaults for wordpress

        	    if ( jQuery( sSelector ).length == 0 ) {
            		whrldr.log( "wahroo: container was not found by selector " + sSelector );
                    return;
        	    }

                if ( jQuery("#wahroo-page-container").length === 0 ) {

                    whrldr.webroot  = jQuery(this).attr( "data-html-root" ) ? jQuery(this).attr( "data-html-root" ) : "wahroo-html-client/";

                    // inserting at the beginning of URL
                    jQuery( sSelector ).append( '<div id="wahroo-page-container">' +
                       // '<div floating-shopping-cart></div>' +
                        '<div class="view-frame-parent">' +
                            '<div class="view-frame" ng-init="scope_var=1" ng-view>'+
                                '<div style="text-align:center"><img width="128" height="128" src="' + whrldr.webroot + 'images/loader/340.gif" alt="loading" /></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' );

                    whrldr.log( "wahroo: initialising");
                    jQuery("#wahroo-page-container").animate( { "min-height" : "+=600"}, 5000 );

                    // init classes and loading page
                    whrldr.init( {
                        "location"  : jQuery(this).attr( "data-url" ) ? jQuery(this).attr( "data-url" ) : "/",
                        'api_root'  : jQuery(this).attr( "data-api-root" ) ? jQuery(this).attr( "data-api-root" ) : "https://www.wahroo.com/api/v1/",
                        "html_root" : whrldr.webroot,
                        'bundle'   : "operator",
                        "element"  : jQuery("#wahroo-cart-container")
                    } );
                } else {
                    whrldr.log( "wahroo: already initialized");

                }
            }


        } ); //each <script
    } ); // document.ready


} )();
