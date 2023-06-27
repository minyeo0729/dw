/*
 * File       : js/nowdi.js
 * Author     : STUDIO-JT (Sumi)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) 
 */



jQuery(function($) {

now_focus_slider()
visual_circle_motion();
now_di_list();
now_di_sinlge_slider()
now_di_related_slider();
img_change_motion();

now_di_single_slideshow();
now_di_lake_change_motion();
now_di_typo_illust_motion();

ritzcarlton_scroll_motion(); // 리츠칼튼 호텔 스크롤 모션
oceanhills_hover_motion();  // 오션힐즈 호버
oceanhills_scroll_motion_arc(); // 오션힐즈 스크롤 모션 
oceanhills_scroll_motion_lifestyle(); // 오션힐즈 스크롤 모션 

//visual_height();
visual_loaded();



/* **************************************** *
 * ON RESIZE
 * **************************************** */
// INITIALIZE RESIZE
function init_resize(){

    visual_circle_motion();

}

// Init resize on reisize
$(window).on('resize',init_resize);



/* **************************************** *
 * JT Functions
 * **************************************** */


 // slider
function now_focus_slider(){

    var $slider = $('.di-focus__container');

    if( !$slider.length ){ return; }

	var now_focus_slider = new Swiper($slider, {
        init: false,
		loop: true,
		speed: 800,
        slidesPerView:1,
		//preventInteractionOnTransition: true,
		followFinger: false,
		preloadImages: true,
		//lazy: {
		//	loadOnTransitionStart: true
		//},
		effect: 'fade',
        simulateTouch:false,
        navigation: {
			nextEl: '.di-focus .swiper-button-next',
			prevEl: '.di-focus .swiper-button-prev'
		},
		pagination: {
            el: '.di-focus .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><i><em class="sr_only">' + (index + 1) + '</em></i></span>';
            }
        }

	});

	now_focus_slider.init();

    //bullet length check
    if($('.di-focus .swiper-pagination-bullet').length < 2){
        $('.di-focus .swiper-pagination').remove();
    }

}


//
function visual_circle_motion(){

    if( !$('.article-now-di').length ){ return; }

    //slide size
    setTimeout(function(){
        var width = $('.di-focus__slide').width()
        $('.di-focus__slide').css('height',width)
    },0);

    if($('html').hasClass('mobile')){ return; }

    /*
    $(window).on('beforeunload', function(){
      $(window).scrollTop(0);
    });
    */

    var svg = $('.article-now-di #svg');
	var img = $('.article-now-di .article-header__bg');
	var circle = $('.article-now-di #circle');

    var radius_set = 1800 + 'rem';
    var radius_to = 400 + 'rem';

/*
    if(JT.is_screen(1023) && !JT.is_screen(541)){
        var radius_set = 100 + 'vw';
        var radius_to = 40 + 'vw';
    } else if (JT.is_screen(540)){
        var radius_set = 100 + 'vh';
        var radius_to = 24.5 + 'vh';
    } else {
        var radius_set = 1800 + 'rem';
        var radius_to = 400 + 'rem';
    }
*/

    if($(window).height() < 870){
        var radius_to = 350 + 'rem';
    } else if($(window).height() < 800){
        var radius_to = 300 + 'rem';
    }

	var radius = circle.attr("r");


	TweenMax.fromTo(circle, {
		attr: {
		  r: radius_set //radius
		}
	},{
        attr: {
		  r: radius_to //radius
		},
		onStart: function() {
            if( $(window).scrollTop()  < $('.di-news__list').offset().top - $(window).height() ){
			    $('html,body').animate({scrollTop: $('.di-focus').offset().top + $('#header').outerHeight()});
            }
		},
		scrollTrigger: {
			trigger: '.article-now-di .article-header__inner', 
			start: "top top",
			//scrub: true,
            toggleActions: "restart resume resume reverse"
		}
	})


    var nowdi_focus = $('.article-now-di .di-focus');
    var nowdi_visual = $('.article-now-di .article-visual');
    var container = $('.article-now-di .article-header');
    var visual_text = $('.article-now-di .article-visual__text');

    // text fadeOut
    TweenMax.fromTo(".article-header__bg-text", {
		autoAlpha: 0
    },{
		//ease: Elastic.easeOut,
		autoAlpha:1,
		//delay:1,
		scrollTrigger: {
			trigger: '.article-now-di .article-header__inner', 
			start: "-5% top",
			//end: "+=100%",
			//scrub: true,
            toggleActions: "restart resume resume reverse"
		}
	});


	// visual fadeOut
    TweenMax.fromTo( nowdi_visual , {
		autoAlpha: 1
    },{
		ease: Elastic.easeOut,
		autoAlpha:0,
		scrollTrigger: {
			trigger: '.article-now-di .article-header__inner', 
			start: "100% -10%",
			scrub: true,
            onLeaveBack:function() {
                $('html,body').animate({scrollTop: 0},800);
            }
		}
	});
	
	// di-focus fadeIn
	TweenMax.fromTo( nowdi_focus , {
		autoAlpha: 0,
	},{
		autoAlpha:1,
		y : - ($(window).height()),
		ease: Linear.easeNone,
		scrollTrigger: {
			trigger: ".article-now-di .article-header__inner",
			start: "100% top",
			//end: "+=200%",
			scrub: true,
			//pin: true,
		}
	});

	// pin
    gsap.to( '.article-now-di .article-header__inner', {
        ease: Linear.easeNone,
        scrollTrigger: {
            trigger: container,
            //start: "45.5% bottom",
            start: "top top",
            //end: "+=120%",
            end: "bottom bottom",
            //scrub: true,
            pin: '.article-now-di .article-header__inner',
        }
	});	

	window.addEventListener("load", init);

	function init() {

	  imgWidth = img.naturalWidth;
	  imgHeight = img.naturalHeight;

	}


	//if(!JT.is_screen(860) && !window.matchMedia("(orientation: portrait)").matches ) {
        $(window).on('scroll', function(){
            sticky();
        });
    //}

	//sticky();

    function sticky() {
		var $article_header = $('.article-now-di .article-header')

		if( $(window).scrollTop() > $('#header').height() ){
			$article_header.addClass('article-header--sticky');
			$article_header.removeClass('article-header--clear');
		} else {
			$article_header.removeClass('article-header--sticky');
			$article_header.removeClass('article-header--clear');
			$article_header.removeClass('reached-focus');
		}

		if( $(window).scrollTop() > $('.article-body').offset().top ){
		//if( $(window).scrollTop()  > $('.projects-related').offset().top + $('.projects-related').outerHeight(true) - $(window).height() + 10 ){
			//$article_header.addClass('article-header--clear');
			$article_header.removeClass('article-header--sticky');
		}

		if( $(window).scrollTop() > $('.di-focus').offset().top ){
			$article_header.addClass('reached-focus');
            $article_header.removeClass('article-header--sticky');
		} else {
			$article_header.removeClass('reached-focus');
		}
		
    }    
}



function now_di_sinlge_slider(){

    $('.now-di-single__section').each(function(){
    
        var $slider = $(this).find('.section-type__slider-container');

        if( !$slider.length ){ return; }

        var main_visual = new Swiper($slider, {
            init: false,
            loop: true,
            speed: 1000,
            preventInteractionOnTransition: true,
            preloadImages: false,
            lazy: {
                loadOnTransitionStart: true
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            parallax: true,
            navigation: {
                nextEl: '.section-type__slider-container .swiper-button-next',
                prevEl: '.section-type__slider-container .swiper-button-prev'
            },
            pagination: {
                el: '.section-type__slider-container .swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"><i><em class="sr_only">' + (index + 1) + '</em></i></span>';
                }
            }

        });

        main_visual.init();

    });

}



//Related Articles Slider
function now_di_related_slider(){

    var $slider = $('.di-related__slider');

    if( !$slider.length ){ return; }

    var projects_related = new Swiper($slider, {
        init: false,
        loop: false,
        slidesPerView: 'auto',
        speed: 400,
        preventInteractionOnTransition: true,
        preloadImages: false,
        longSwipesRatio : 0.1,
        resistance : true,
        resistanceRatio : 0,
        lazy: {
            loadOnTransitionStart: true
        },
        navigation: {
            nextEl: '.di-related__slider .swiper-button-next',
            prevEl: '.di-related__slider .swiper-button-prev'
        }
    });

    projects_related.init();

}



function img_change_motion(){

    $('.section-type__shape').each(function(){
        
        var $this = $(this)

        gsap.to($this,{
            scrollTrigger: {
                trigger: $this,
                start: 'top 30%',
                end: 'bottom 0',
                toggleClass: {targets: $this, className: "is-active"},
            }
        })

    });

    /*
    $('.section-type__img-change').each(function(){
        
        var $this = $(this);
        var $arc_geo_ob = $this.find('.now-di-single__img > arc_geo_ob');

        gsap.to($arc_geo_ob,{
            scrollTrigger: {
                trigger: $arc_geo_ob,
                start: "top 10%",
                end: 'bottom 0',
                toggleClass: {targets: $arc_geo_ob, className: "is-active"},
            }
        })

    })*/

        /*
        $('.section-type__img-change').each(function(){
        
        var $this = $(this);

        gsap.to($this,{
            scrollTrigger: {
                trigger: $this,
                start: "top 10%",
                end: 'bottom 0',
                toggleClass: {targets: $this, className: "is-active"},
            }
        })

    })
    */


/*
    gsap.utils.toArray(".section-type__img-change").forEach(function(section) {

        //TweenMax.to({
        TweenMax.to(".article-header__bg-text", 1, {
            scrollTrigger: {
                trigger: section,
                start: "top 20%",
                end: "bottom bottom",
                toggleClass: {targets: section, className: "is-active"},
            }
        });

    });
*/
}



function now_di_list(){

    if( !$('.di-news__item').length || $('html').hasClass('mobile')){ return; }

    $('.di-news__item').each(function(){
        var $this = $(this);

        gsap.set($this,{autoAlpha:0, y:80});

        gsap.to($this,0.6,{
        	autoAlpha:1, 
        	y:0,
        	stagger:0.1,
            scrollTrigger: {
                trigger: $this,
                    stagger:0.1,
                start: "top 90%",
            }
        });

    });

}



function visual_height(){
	//height size
    if(window.screen.height === window.innerHeight){
        win_height = window.screen.height;
    }else{
        win_height = window.innerHeight;
    }

	var $header_visual = $('.article-now-di-single .article-visual'),
		 $header_title = $('.article-visual__text');

    if(!JT.is_screen(860) && !$('.article-now-di-single .article-visual').hasClass('article-visual--nothing') ){
        $header_visual.css('height',win_height );
    }

    if(!JT.is_screen(860)){
        // bg motion
        if ( $header_visual != "undefined" ) {
            $header_visual.imagesLoaded( { background: '.article-now-di-single .article-visual' }, function() {
                $header_visual.addClass('visual-loaded');
            });
        }   
    }
    
}


function visual_loaded(){
	
    if( !$('.article-now-di-single').length ){ return; }

    var bg_image = new Image();
    bg_image.src = $('.article-header__bg').attr('data-bg');

    /*// 	Add bg full size if loaded
    $(bg_image).on('load',function(){
         $('.article-header__bg').css('backgroundImage','url('+$('.article-header__bg').attr("data-bg")+')');
    });*/

    $(bg_image).on('load',function(){
         
        var html    = "";
        html +=  '<div class="article-header__bg-large">';

        $('.article-header__bg').append(html);
        $('.article-header__bg-large').css('backgroundImage','url('+$('.article-header__bg').attr("data-bg")+')');

        gsap.set($('.article-header__bg-large'), {autoAlpha: 0});
        gsap.fromTo($('.article-header__bg-large'), .5, {autoAlpha: 0}, {autoAlpha: 1,ease: Power3.easeOut});

    });

}



function now_di_single_slideshow(){

    $('.now-di-single__section').each(function(){
    
        var $slider = $(this).find('.now-di-single__slideshow');

        if( !$slider.length ){ return; }

        var slider = new Swiper($slider, {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
            },
            preventInteractionOnTransition: true,
            preloadImages: false,
            lazy: {
                loadOnTransitionStart: true
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });

    });

}



function now_di_lake_change_motion(){
    
    var $section = $('.now-di-single__lake-change');
    var $item = $section.find('.now-di-single__lake-change-img');
    
    if( !$section.length ) return;

    // if($('html').hasClass('mobile')){
    //     var simulateTouch = true
    // } else {
    //     var simulateTouch = false
    // }

    // var lake_slider = new Swiper($section, {
    //     init: false,
    //     loop: false,
    //     speed: 600,
    //     preventInteractionOnTransition: true,
    //     followFinger: false,
    //     preloadImages: false,
    //     direction: 'vertical',
    //     simulateTouch : simulateTouch,
    //     lazy: {
    //         loadOnTransitionStart: true
    //     },
    //     effect: 'fade',
    //     fadeEffect: {
    //         crossFade: true
    //     },
    //     mousewheel: true,
    //     on: {
    //         realIndexChange: function(){
    //             var activeIndex = lake_slider.activeIndex;

    //             Object.keys(lake_slider.slides).map(function(key, idx){
    //                 if(!isNaN(parseInt(key))){
    //                     if(key < activeIndex){
    //                         lake_slider.slides[key].classList.add('prev-active');
    //                     } else {
    //                         lake_slider.slides[key].classList.remove('prev-active');
    //                     }
    //                 }
    //             });
    //         },
    //         slideChangeTransitionEnd: function(){
    //             if(lake_slider.isBeginning){
    //                 JT.smoothscroll.init();
    //                 lake_slider.mousewheel.disable();
    //                 lake_slider.allowTouchMove = false;
    //                 $('body').css('overflow', '');
    //             }
    //             if(lake_slider.isEnd){
    //                 JT.smoothscroll.init();
    //                 lake_slider.mousewheel.disable();
    //                 lake_slider.allowTouchMove = false;
    //                 $('body').css('overflow', '');
    //             }
    //         }
    //     }
    // });

    // lake_slider.init();

    // lake_slider.on('transitionEnd', function(){
    //     var last = lake_slider.slides.length - 1;
    //     var active = lake_slider.activeIndex;

    //     if( active == 0 || active == last ){
    //         // $('body').css('overflow', '');

    //         console.log('first or last')
    //         JT.smoothscroll.init();
    //         // lake_slider.allowTouchMove = false;
    //         // lake_slider.mousewheel.disable();
    //     } else {
    //         JT.smoothscroll.destroy();
    //         // lake_slider.allowTouchMove = true;
    //         // lake_slider.mousewheel.enable();
    //     }
    // });

    // gsap.to($section,{
    //     scrollTrigger: {
    //         // markers: true,
    //         pin: $section,
    //         start: "top 0%",
    //         end: 'bottom top',
    //         onToggle: function( self ){

    //             if( self.isActive ){
    //                 $('body').css('overflow', 'hidden');

    //                 setTimeout(function(){
    //                     $('body').css('overflow', '');
    //                 });

    //                 JT.smoothscroll.destroy();
    //                 lake_slider.mousewheel.enable();
    //                 lake_slider.allowTouchMove = true;
    //             } else {
    //                 JT.smoothscroll.init();
    //                 lake_slider.mousewheel.disable();
    //                 lake_slider.allowTouchMove = false;
    //             }
    //         }
    //     }
    // });

    var touch_start = 0;
    var touch_end = 0;

    $item.first().addClass('scroll-active');

    gsap.to($section,{
        scrollTrigger: {
            // markers: true,
            pin: $section,
            start: 'top top',
            end: ( 60 * $item.length) + "% top",
            onToggle: function( self ){
                if( self.isActive ){

                    // ios에서는 중지되지 않기 때문에 강제로 스크롤 위치 적용
                    $('html, body').scrollTop($(window).scrollTop());

                    // 스크롤링 강제 중지
                    $('body').css({'overflow':'hidden', 'height':'100%'});
                    setTimeout(function(){
                        $('body').css({'overflow':'', 'height':''});
                    });
                    
                    JT.smoothscroll.destroy();

                    window.addEventListener('wheel', mouse_wheel_delta, { passive: false });
                    window.addEventListener('touchmove', touch_prevent, { passive: false });
                    window.addEventListener('touchstart', function( event ){
                        touch_start = event.changedTouches[0].clientY;
                    });
                    window.addEventListener('touchend', touch_updown_delta);
                } else {
                    JT.smoothscroll.init();
                    
                    window.removeEventListener('wheel', mouse_wheel_delta);
                    window.removeEventListener('touchmove', touch_prevent);
                    window.removeEventListener('touchend', touch_updown_delta);
                }
            }
        }
    });

    function touch_prevent( event ){
        event.preventDefault();
    }

    function touch_updown_delta( event) {
        touch_end = event.changedTouches[0].clientY;

        var delta = touch_end - touch_start;

        if( delta < -30 ){
            scroll_timeout('down', 'touchend', touch_updown_delta);
        } else if( delta > 30 ){
            scroll_timeout('up', 'touchend', touch_updown_delta);
        }
    }
    
    function mouse_wheel_delta( event ){

        event.preventDefault();
        
        if( event.deltaY > 0 ){
            scroll_timeout('down', 'wheel', mouse_wheel_delta);
        } else {
            scroll_timeout('up', 'wheel', mouse_wheel_delta);
        }
    }

    function scroll_timeout( arrow, event, handler ){

        var delay = 500;
        var timer = null;

        clearTimeout(timer);

        if( arrow == 'down' ){
            if(!$item.siblings('.scroll-active').is('.last')){
                var y = $(window).scrollTop() + (window.innerHeight * 0.6);

                timer = setTimeout(function(){
                    window.scrollTo(0, y);
                }, delay);
            } else {
                // alert(event+' remove event');
                window.removeEventListener(event, handler);
                if( event == 'touchend' ){
                    window.removeEventListener('touchmove', touch_prevent);
                }
                
                $('html, body').animate({ scrollTop: $(window).scrollTop()+window.innerHeight }, 500);
            }

        } else { // wheel up
            if(!$item.siblings('.scroll-active').is('.first')){
                var y = $(window).scrollTop() - (window.innerHeight * 0.6);

                timer = setTimeout(function(){
                    window.scrollTo(0, y);
                }, delay);
            } else {
                // alert(event+' remove event');
                window.removeEventListener(event, handler);
                if( event == 'touchend' ){
                    window.removeEventListener('touchmove', touch_prevent);
                }
                
                $('html, body').animate({ scrollTop: $(window).scrollTop()-window.innerHeight }, 500);
            }
        }

    }

    $item.each(function(){
        
        var $this = $(this);
        var idx = $this.index();

        ScrollTrigger.create({
            // markers: true,
            trigger: $item,
            start: ( 60 * idx ) + "%" + " 0%",
            onEnter: function(){
                if( !idx == 0 ) {
                    gsap.to($this, {
                        duration: .6,
                        opacity: 1,
                    });

                    $item.removeClass( 'scroll-active' );
                    $this.addClass( 'scroll-active' );
                }
            },
        });
        
        ScrollTrigger.create({
            // markers: true,
            trigger: $item,
            start: ( 60 * idx ) + "%" + "50%",
            end: "100% 100%",
            onEnterBack: function(){
                if( !idx == 0 ) {
                    gsap.to($this, {
                        duration: .6,
                        opacity: 0,
                    });

                    $item.removeClass( 'scroll-active' );
                    $this.prev().addClass( 'scroll-active' );
                }
            }
        });
    });
}


function now_di_typo_illust_motion (){

    var $section = $('.now-di-single__typo');
    var $typo = $('.now-di-single__typo-inner');
    var $illust_left = $('.now-di-single__typo-pic--left');
    var $illust_right = $('.now-di-single__typo-pic--right');
    
    if( !$section.length || JT.is_screen(540) ) return;

    var offset_left = parseInt($illust_left.css('margin-left').replace('/[^-\.0-9]/g',''));
    var offset_right = parseInt($illust_right.css('margin-right').replace('/[^-\.0-9]/g',''));

    gsap.to($section,{
        scrollTrigger: {
            // markers: true,
            pin: $section,
            start: "top 0%",
            end: "+=100%",
        }
    });

    gsap.fromTo($typo,{
        y: 0,
    },{
        y: -$(window).height(),
        scrollTrigger: {
            trigger: $section,
            scrub: true,
            // markers: true,
            start: "top 0%",
            end: "bottom 0%",
        }
    })

    gsap.fromTo($illust_left,{
        x: 0,
    },{
        x: $(window).outerWidth()/2 - $illust_left.outerWidth() + offset_left * 3,
        scrollTrigger: {
            trigger: $section,
            scrub: true,
            // markers: true,
            start: "25% 0%",
        }
    })

    gsap.fromTo($illust_right,{
        x: 0,
    },{
        x: -$(window).outerWidth()/2 + $illust_right.outerWidth() - offset_right * 3,
        scrollTrigger: {
            trigger: $section,
            scrub: true,
            // markers: true,
            start: "25% 0%",
        }
    })
}



// 리츠칼튼 호텔 스크롤 모션
function ritzcarlton_scroll_motion(){

    if( !$('.now-di--ritzcarlton-pin').length ) return;

    var $wrap          = $('.now-di--ritzcarlton-pin-wrap');
    var $pin           = $('.now-di--ritzcarlton-pin');
    var $desc          = $wrap.find('.now-di-single__desc');

    var trigger_tl = gsap.timeline({
        scrollTrigger: {
            trigger: $wrap,
            pin: $pin,
            start: 'top top',
            end: 'bottom bottom',
        }
    });

    var map_tl = new gsap.timeline({ease : 'none'});

    map_tl.addLabel('step0');
    map_tl.set($desc.find('> span:nth-child(1)'), { opacity: 1 }, 'step0');
    map_tl.set($desc.find('> span:nth-child(2)'), { opacity: 0 }, 'step0');

    map_tl.addLabel('step01');
    map_tl.to('.now-di--ritzcarlton-map-step-box-001', { autoAlpha: 0, duration: .1 }, 'step01');
    map_tl.to('.now-di--ritzcarlton-map-step-box-002', { autoAlpha: 0, duration: .1 }, 'step01');
    map_tl.to('.now-di--ritzcarlton-map-street', { autoAlpha: 0, duration: .1 }, 'step01');
    map_tl.set($desc.find('> span:nth-child(1)'), { opacity: 0 });
    map_tl.set($desc.find('> span:nth-child(2)'), { opacity: 1 });
    map_tl.to('.now-di--ritzcarlton-map-step-box-002', { autoAlpha: 1, duration: .1 });
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(1)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(2)', { autoAlpha: 1, duration: .1 }, '-=.1');

    map_tl.addLabel('step02');
    map_tl.set('.now-di--ritzcarlton-map-step-box-002', { autoAlpha: 0, duration: .1 }, 'step02');
    map_tl.set('.now-di--ritzcarlton-map-step-box-031, .now-di--ritzcarlton-map-step-box-032', { autoAlpha: 1, duration: .1 }, 'step02');
    map_tl.set($desc.find('> span:nth-child(2)'), { opacity: 0 }, 'step02');
    map_tl.set($desc.find('> span:nth-child(3)'), { opacity: 1 }, 'step02');
    map_tl.fromTo('.now-di--ritzcarlton-map-step-box-031', { x: '14%' } , { x: '0%', duration: .1 }, 'step02');
    map_tl.fromTo('.now-di--ritzcarlton-map-step-box-032', { x: '-9%' }, { x: '0%', duration: .1 }, 'step02');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(2)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(3)', { autoAlpha: 1, duration: .1 }, '-=.1');

    map_tl.addLabel('step03');
    map_tl.set($desc.find('> span:nth-child(3)'), { opacity: 0 }, 'step03');
    map_tl.set($desc.find('> span:nth-child(4)'), { opacity: 1 }, 'step03');
    map_tl.set('.now-di--ritzcarlton-map-step-box-031', { autoAlpha: 0 }, 'step03');
    map_tl.set('.now-di--ritzcarlton-map-step-box-004', { autoAlpha: 1 }, 'step03');
    map_tl.to('.now-di--ritzcarlton-map-step-overlay-02', { autoAlpha: 1, duration: .1 }, 'step03');
    map_tl.to('.now-di--ritzcarlton-map-step-legend-01', { autoAlpha: 1, duration: .1 }, 'step03');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(3)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(4)', { autoAlpha: 1, duration: .1 }, '-=.1');

    map_tl.addLabel('step04');
    map_tl.set($desc.find('> span:nth-child(4)'), { opacity: 0 }, 'step04');
    map_tl.set($desc.find('> span:nth-child(5)'), { opacity: 1 }, 'step04');
    map_tl.to('.now-di--ritzcarlton-map-step-overlay-02', { autoAlpha: 0, duration: .1 }, 'step04');
    map_tl.to('.now-di--ritzcarlton-map-step-overlay-01', { autoAlpha: 1, duration: .1 }, 'step04');
    map_tl.to('.now-di--ritzcarlton-map-step-legend-01', { autoAlpha: 0, duration: .1 }, 'step04');
    map_tl.to('.now-di--ritzcarlton-map-step-legend-02', { autoAlpha: 1, duration: .1 }, 'step04');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(4)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(5)', { autoAlpha: 1, duration: .1 }, '-=.1');

    map_tl.addLabel('step05');
    map_tl.set($desc.find('> span:nth-child(5)'), { opacity: 0 }, 'step05');
    map_tl.set($desc.find('> span:nth-child(6)'), { opacity: 1 }, 'step05');
    map_tl.to('.now-di--ritzcarlton-map-step-box-004', { autoAlpha: 0, duration: .1 }, 'step05');
    map_tl.to('.now-di--ritzcarlton-map-step-box-005', { autoAlpha: 1, duration: .1 }, 'step05');
    map_tl.to('.now-di--ritzcarlton-map-step-legend-02', { autoAlpha: 0, duration: .1 }, 'step05');
     map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(5)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(6)', { autoAlpha: 1, duration: .1 }, '-=.1');

    map_tl.addLabel('step06');
    map_tl.set($desc.find('> span:nth-child(6)'), { opacity: 0 }, 'step06');
    map_tl.set($desc.find('> span:nth-child(7)'), { opacity: 1 }, 'step06');
    map_tl.to('.now-di--ritzcarlton-map-step-overlay-01', { autoAlpha: 0, duration: .1 }, 'step06');
    map_tl.to('.now-di--ritzcarlton-map-step-overlay-02', { autoAlpha: 1, duration: .1 }, 'step06');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(6)', { autoAlpha: 0, duration: .1 }, '-=.1');
    map_tl.to('.now-di--ritzcarlton-view > arc_geo_ob:nth-child(7)', { autoAlpha: 1, duration: .1 }, '-=.1');

    ScrollTrigger.create({ trigger: $wrap, start: 'top top', end: 'bottom bottom', scrub: 1.2, animation: map_tl });

}


// 오션힐즈 호버시 텍스트, 이미지 동시 변경
function oceanhills_hover_motion() {

  if (!$(".now-di--oceanhills").length) return;

  var $section = $(".now-di--oceanhills-hover");
  var $item = $section.find($(".now-di-single__row-item"));
  var $title = $section.find($(".now-di-single__title > span"));

  if($('html').hasClass('desktop')) {
    $item.on("mouseenter", function () { hover_action($(this)); });
  } 

  if(JT.is_screen(1280) && !JT.is_screen(541)){
    $item.on("click", function () { hover_action($(this)); });
  }

  if(JT.is_screen(540)){
    var $slide_container = $('.now-di--oceanhills-hover--slide');
    var $slide_wrapper = $slide_container.find('.now-di-single__row');
    var $slide_item = $slide_wrapper.find('.now-di-single__row-item');
    
    $slide_container.addClass('swiper-container');
    $slide_wrapper.addClass('swiper-wrapper');
    $slide_item.addClass('swiper-slide');

    $slide_item.removeClass('now-di--oceanhills-hover--active');
    $slide_item.css('opacity','1');

    if($slide_container.hasClass('swiper-container')){
        var $slider = $('.now-di--oceanhills-hover--slide');
        var slider = new Swiper($slider, {
            init: false,
            loop: false,
            slidesPerView: 'auto',
            speed: 400,
            preventInteractionOnTransition: true,
            followFinger: true,
            preloadImages: false,
            lazy: {
                loadOnTransitionStart: true
            },
            resistanceRatio : 0,
            effect: 'slide',
            on: {
                slideChange: function () {
                  $title.removeClass('now-di--oceanhills-hover--active');
                  $title.eq(this.realIndex).addClass('now-di--oceanhills-hover--active');
                },
            },
        });
        slider.init();
    }
  }

  function hover_action($el){
    $item.removeClass("now-di--oceanhills-hover--active");
    $el.addClass("now-di--oceanhills-hover--active");

    if ($item.hasClass("now-di--oceanhills-hover--active")) {
      $el.siblings().removeClass("now-di--oceanhills-hover--active");
    }
    for (let i = 0; i < $item.length; i++) {
      if ($item.eq(i).hasClass("now-di--oceanhills-hover--active")) {
        $title.removeClass("now-di--oceanhills-hover--active");
        $title.eq(i).addClass("now-di--oceanhills-hover--active");
      }
    }
  }

}

// 오션힐즈 스크롤 모션 - 자연이 빚어내는 건축
function oceanhills_scroll_motion_arc(){

    if (!$(".now-di--oceanhills").length) return;

    var $item = $('.now-di--oceanhills-arc');
    var $trigger = $item.find(".now-di--oceanhills-pin");
    var $row_item = $item.find('.now-di-single__row-item');

    let tl = gsap.timeline({
        ease : 'none',
        duration: .1,
        scrollTrigger: {
            markers: true,
            trigger: $trigger,
            pin: true,  
            start: "top top", 
            end: "max",
            scrub: 1.2,
        }
    });

    var $arc_geo = $('.now-di--oceanhills-arc-geo-obj');
    var $arc_river = $('.now-di--oceanhills-arc-river-bg');
    var $arc_arrows = $('.now-di--oceanhills-arc-river-arrows div');
    var $arc_arrows_svg = $arc_arrows.find('svg');

    tl.addLabel("sunpath")
        .to($arc_geo.find('figure:nth-child(1)'), {opacity: 0}, "sunpath")
        .to($arc_geo.find('figure:nth-child(2)'), {opacity: 1}, "sunpath")
        .addLabel("emptygeo")
        .to($arc_geo.find('figure:nth-child(2)'), {opacity: 0}, "emptygeo")
        .to($arc_geo.find('figure:nth-child(3)'), {opacity: 1}, "emptygeo")
        .addLabel("riverplate")
        .to($arc_geo.find('figure:nth-child(4)'), {opacity: 1}, "riverplate")
        .addLabel("forestplate")
        .to($arc_geo.find('figure:nth-child(4)'), {opacity: 0}, "forestplate") 
        .to($arc_geo.find('figure:nth-child(5)'), {opacity: 1}, "forestplate")
        .addLabel("oceanplate")
        .to($arc_geo.find('figure:nth-child(5)'), {opacity: 0}, "oceanplate") 
        .to($arc_geo.find('figure:nth-child(6)'), {opacity: 1}, "oceanplate")
        .addLabel("lastplate")
        .to($arc_geo.find('figure:nth-child(7)'), {opacity: 1}, "lastplate") 
        .to($arc_river.find('figure:nth-child(2)'), {opacity: 1}, "emptygeo")
        .to($arc_river.find('figure:nth-child(3)'), {opacity: 1}, "riverplate")
        .to($arc_river.find('figure:nth-child(4)'), {opacity: 1}, "forestplate")
        .to($arc_river.find('figure:nth-child(5)'), {opacity: 1}, "oceanplate")

        .to([$arc_arrows.eq(0), $arc_arrows.eq(1)], {opacity: 1}, "riverplate")
        .set([$arc_arrows_svg.eq(0).find('line'), $arc_arrows_svg.eq(1).find('line')], {drawSVG: "100% 100%"}, "riverplate")
        .set([$arc_arrows_svg.eq(0).find('polygon'), $arc_arrows_svg.eq(1).find('polygon')], {opacity: 0}, "riverplate")
        .to([$arc_arrows_svg.eq(0).find('line'), $arc_arrows_svg.eq(1).find('line')], {drawSVG: "0% 100%", duration: .2}, "riverplate")
        .to([$arc_arrows_svg.eq(0).find('polygon'), $arc_arrows_svg.eq(1).find('polygon')], {opacity: 1}, "riverplate+=.2")
        .to([$arc_arrows.eq(0), $arc_arrows.eq(1)], {opacity: 0}, "forestplate")

        .to($arc_arrows.eq(2), {opacity: 1}, "forestplate")
        .set($arc_arrows_svg.eq(2).find('path'), {drawSVG: "0%"}, "forestplate")
        .set($arc_arrows_svg.eq(2).find('polygon'), {opacity: 0}, "forestplate")
        .to($arc_arrows_svg.eq(2).find('path'), {drawSVG: "100%", duration: .2}, "forestplate")
        .to($arc_arrows_svg.eq(2).find('polygon'), {opacity: 1}, "forestplate+=.2")
        .to($arc_arrows.eq(2), {opacity: 0}, "oceanplate")

        .to($arc_arrows.eq(3), {opacity: 1}, "oceanplate")
        .set($arc_arrows_svg.eq(3).find('.line'), {drawSVG: "100% 100%"}, "oceanplate")
        .set($arc_arrows_svg.eq(3).find('.arrow'), {opacity: 0}, "oceanplate")
        .to($arc_arrows_svg.eq(3).find('.line'), {drawSVG: "0% 100%", duration: .2}, "oceanplate")
        .to($arc_arrows_svg.eq(3).find('.arrow'), {opacity: 1}, "oceanplate+=.2")
        .to($arc_arrows.eq(3), {opacity: 0}, "lastplate+=.1");

}

// 오션힐즈 스크롤 모션 - 우아한 라이프스타일의 중심
function oceanhills_scroll_motion_lifestyle(){

    if (!$(".now-di--oceanhills").length) return;

    var $item = $('.now-di--oceanhills-lifestyle');
    var $trigger = $item.find(".now-di--oceanhills-pin");
    var $row_item = $item.find('.now-di-single__row-item');

    let tl = gsap.timeline({
        ease : 'none',
        duration: .1,
        scrollTrigger: {
            markers: true,
            trigger: $trigger,
            pin: true,  
            start: "top top", 
            end: () => "+=" + $row_item.innerHeight() * 11,
            scrub: 1.2,
        }
    });

    var $lifestyle_bg = $('.now-di--oceanhills-lifestyle-map-bg');
    var $lifestyle_obj = $('.now-di--oceanhills-lifestyle-map-obj');
    var $lifestyle_view = $('.now-di--oceanhills-lifestyle-view-item');

    tl.addLabel("step01")
        .to($lifestyle_bg.find('figure:nth-child(1)'), {opacity: 0}, "step01")
        .to($lifestyle_bg.find('figure:nth-child(2)'), {opacity: 1}, "step01")
        .addLabel("step02")
        .to($lifestyle_bg.find('figure:nth-child(3)'), {opacity: 1}, "step02")
        .to($lifestyle_obj.find('figure:nth-child(1)'), {opacity: 1}, "step02")
        .addLabel("step03")
        .to($lifestyle_obj.find('figure:nth-child(1)'), {opacity: 0}, "step03")
        .to($lifestyle_obj.find('figure:nth-child(2)'), {opacity: 1}, "step03")
        .addLabel("step04")
        .to($lifestyle_obj.find('figure:nth-child(2)'), {opacity: 0}, "step04")
        .to($lifestyle_obj.find('figure:nth-child(3)'), {opacity: 1}, "step04")
        .addLabel("step05")
        .to($lifestyle_obj.find('figure:nth-child(3)'), {opacity: 0}, "step05")
        .to($lifestyle_obj.find('figure:nth-child(4)'), {opacity: 1}, "step05")
        .to($lifestyle_view.eq(0), {opacity: 0}, "step01")
        .to($lifestyle_view.eq(1), {opacity: 1}, "step01")
        .to($lifestyle_view.eq(1), {opacity: 0}, "step02")
        .to($lifestyle_view.eq(2), {opacity: 1}, "step02")
        .to($lifestyle_view.eq(2), {opacity: 0}, "step03")
        .to($lifestyle_view.eq(3), {opacity: 1}, "step03")
        .to($lifestyle_view.eq(3), {opacity: 0}, "step04")
        .to($lifestyle_view.eq(4), {opacity: 1}, "step04")
        .to($lifestyle_view.eq(4), {opacity: 0}, "step05")
        .to($lifestyle_view.eq(5), {opacity: 1}, "step05");
}

}); // End jQuery