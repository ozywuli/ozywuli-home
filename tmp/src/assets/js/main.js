import _debounce from 'lodash/debounce';

$(document).ready(function() {
    // navToggleObj.init();
    lazyLoadImg.init();
    scrollUpObj.init();
    // smToggleObj.init();

    // https://stackoverflow.com/questions/138669/how-can-i-determine-if-a-javascript-variable-is-defined-in-a-page
    if ('undefined' !== typeof(mapboxgl)) {
        contactMapObj.init();    
    }
    
});

/*------------------------------------*\
  SOCIAL MEDIA TOGGLE
\*------------------------------------*/
let smToggleObj = {
    $smToggleBtn: $('.js-sm-toggle-btn'),
    $smBar: $('.js-topbar-sm'),
    toggleSm: function(e) {
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        this.$smBar.toggleClass('is-revealed');

        if (this.$smBar.hasClass('is-revealed')) {
            $(window).on('click.sm', function() {
                self.$smBar.removeClass('is-revealed');
            });
            this.$smBar.on('click.sm', function(event){
                event.stopPropagation();
            });
        } else {
            $(window).off('click.sm');
            this.$smBar.off('click.sm');
        }
    },
    init: function() {
        this.$smToggleBtn.on('click', this.toggleSm.bind(this));
    }
}

/*------------------------------------*\
  GLOBAL SCROLL EVENT
\*------------------------------------*/
function scrollHandler() {
    if ($(window).scrollTop() > $(window).height() / 1.5) {
        $('.js-scrollup').addClass('is-revealed');
    } else {
        $('.js-scrollup').removeClass('is-revealed');
    }
}

$(window).on('scroll', _debounce(scrollHandler, 150));

/*------------------------------------*\
  SCROLL TO TOP / SCROLL UP
\*------------------------------------*/
let scrollUpObj = {
    $scrollUpBtn: $('.js-scrollup-btn'),
    scrollUp: function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    },
    init: function() {
        this.$scrollUpBtn.on('click', this.scrollUp);
    }
}



// ===============================
// TOGGLE NAV
// ===============================
var navToggleObj = {
    $navToggle: $('.js-nav-toggle'),
    $nav: $('.js-nav'),

    toggleNav: function(e) {
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        this.$nav.toggleClass('is-visible');
        this.$navToggle.toggleClass('is-visible');

        if (this.$nav.hasClass('is-visible')) {
            $(window).on('click.nav', function() {
                self.closeNav();
            });
            this.$nav.on('click.nav', function(event){
                event.stopPropagation();
            });
        } else {
            $(window).off('click.nav');
            this.$nav.off('click.nav');
        }
    },

    closeNav: function(e) {
        this.$nav.removeClass('is-visible');
        this.$navToggle.removeClass('is-visible');
    },

    init: function() {
        this.$navToggle.on('click', this.toggleNav.bind(this));
    }

}

// ===============================
// Lazy Load Images
// ===============================
var lazyLoadImg = {
    $featuredItem: $('.js-featured-list-item'),
    featuredItemOffsets: [],
    scrolled: $(window).scrollTop(),
    windowHeight: $(window).height(),

    updateOffsets: function() {
        
        var featuredItemOffsets = this.featuredItemOffsets;
        this.$featuredItem.each(function() {
            featuredItemOffsets.push($(this).offset().top);
        });
    },

    scrolling: function() {
        this.scrolled = $(window).scrollTop();

        for (var i = 0; i < this.featuredItemOffsets.length; i++) {

            if ( (this.scrolled + this.windowHeight - 200) > this.featuredItemOffsets[i] ) {

                this.$featuredItem.eq(i).find('.featured-list-item-img').css('background-image', 'url("' + this.$featuredItem.eq(i).attr('data-img') + '")');
                
            }
        }
    },

    init: function() {
        this.updateOffsets();

        $(window).on('scroll', this.scrolling.bind(this));
    }
}


/*------------------------------------*\
  CONTACT MAP
\
*------------------------------------*/
let contactMapObj = {
    init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
        var map = new mapboxgl.Map({
            container: 'contact-map',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [-118.2468, 34.0407],
            zoom: 9
        });

        map.on('load', function() {
            // var el = document.createElement('div');
            // el.className = 'marker';
            // el.style.backgroundImage = 'url(/assets/images/marker.png)';
            // el.style.width = '64px';
            // el.style.height = '64px';

            // add marker to map
            // new mapboxgl.Marker(el)
            //     .setLngLat([-118.2468, 34.12])
            //     .addTo(map);
        });

          
    }
}





/*------------------------------------*\
  CLICK NAV
\*------------------------------------*/
// let outsideClickEvents = [
//     {
//         emitter: '.js-nav-toggle',
//         target: '.js-nav'
//     },
//     {
//         emitter: '.js-sm-toggle-btn',
//         target: '.js-topbar-sm'
//     }
// ]

// for (let i = 0; i < outsideClickEvents.length; i++) {
//     $(document).on('click', outsideClickEvents[i].emitter, function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         $(outsideClickEvents[i].target).toggleClass('is-revealed');
//     });

//     $(document).on('click', function(e) {
//         if ( !$(e.target).closest('.js-nav').length ) {
//             $(outsideClickEvents[i].target).removeClass('is-revealed');
//         }
//     });    
// }

$('.js-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    let self = $(this);

    if (!self.is(e.target)) {
        if ($('.js-toggle-target').hasClass('is-revealed')) {
            $('.js-toggle-target').removeClass('is-revealed');
        }
    }


    $(self.attr('data-target')).toggleClass('is-revealed');

    $('body').on('click', function(e) {
        if ( !$(e.target).closest('.js-toggle-target').length ) {
            $(self.attr('data-target')).removeClass('is-revealed');
        }
        
    });
})


// $(document).on('click', '.js-nav-toggle', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $('.js-nav').toggleClass('is-visible');
// });

// $(document).on('click', function(e) {
//     if ( !$(e.target).closest('.js-nav').length ) {
//         $('.js-nav').removeClass('is-visible');
//     }
// });

/*------------------------------------*\
  MASONRY
\*------------------------------------*/
if (typeof imagesLoaded !== 'undefined') {
    let $msnry = $('.msnry-grid').imagesLoaded(function() {
        $msnry.css({opacity: 1});
        $msnry.masonry({
            itemSelector: '.msnry-grid__item',
            // columnWidth: '.msnry-gris__sizer',
            percentPosition: true,
            // gutter: '.msnry-grid__gutter'
        });
    });

}

