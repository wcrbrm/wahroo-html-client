/*!
 * 100-slideshow.js
 */
$(document).ready( function(){

    var $slideShow=$('#home_slideshow');
    if($slideShow.length<=0)
        return;
    
    var $slides=$('.slide',$slideShow);
    $('.slide:not(.first)',$slideShow).hide();
    var currentSlide=0;
    var lastSlide=$slides.length-1;
    var simpleMode=$.browser.msie&&parseInt($.browser.version)<9;

    var fadeNextSlide=function(nextSlide,speed){
        var nextnextSlide=(nextSlide+1)%(lastSlide+1);
        $('img[src_img]',$slides[nextnextSlide]).attr('src',$('img[src_img]',$slides[nextnextSlide]).attr('src_img'));
        $('img[src_img]',$slides[nextnextSlide]).removeAttr('src_img');
        var $currentSlide=$($slides[currentSlide]);
        var $nextSlide=$($slides[nextSlide]);
        
        $slides.stop();
        $slides.css('z-index',0).hide();
        if(!simpleMode)
            $slides.css('opacity',1.0);
        var $animElement=simpleMode?$('img',$currentSlide):$currentSlide;
        $currentSlide.css('z-index',1).show();
        $animElement.css('opacity',1.0);
        $nextSlide.css('z-index',0).show();
        $animElement.animate({
            opacity:0.0
        },speed,function(){
            $currentSlide.css('z-index',0).hide();
            $animElement.css('opacity',1.0);
        });
        currentSlide=nextSlide;
    };

    var autoFade=function(){
        var nextSlide=currentSlide+1;
        if(nextSlide>lastSlide){
            nextSlide=0;
        }
        fadeNextSlide(nextSlide,700);
    };

    var interval=false;
    var resetInterval=function(){
        if(interval){
            clearInterval(interval);
        }
        $slides.stop();
        interval=setInterval(autoFade,3000);
    };

    var forceSlide=function(nextSlide){
        resetInterval();
        fadeNextSlide(nextSlide,350);
    };

    $('.changer .left',$slideShow).mousedown(function(){
        
        var nextSlide=currentSlide-1;
        if(nextSlide<0){
            nextSlide=lastSlide;
        }
        forceSlide(nextSlide);
    });
    $('.changer .right',$slideShow).mousedown(function(){
        var nextSlide=currentSlide+1;
        if(nextSlide>lastSlide){
            nextSlide=0;
        }
        forceSlide(nextSlide);
    });
    $('.slide .slide_area, .slide.banner',$slideShow).click(function(){
        
        var attrUrl = $(this).closest('.slide').attr('url');
        if( attrUrl != '' && attrUrl !== undefined )
            window.location = attrUrl;
    });

    $('img[src_img]',$slides[1]).attr('src',$('img[src_img]',$slides[1]).attr('src_img'));
    resetInterval();
});

