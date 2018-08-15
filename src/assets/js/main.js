import _debounce from 'lodash/debounce';
import OnToggle from 'ontoggle/dist/OnToggle';
import Modalx from 'modalx/dist/Modalx';


//==============================================================================
// DOCUMENT READY
//==============================================================================
$(document).ready(function() {

    lazyLoadImg.init();
    scrollUpObj.init();

    // https://stackoverflow.com/questions/138669/how-can-i-determine-if-a-javascript-variable-is-defined-in-a-page
    if ('undefined' !== typeof(mapboxgl)) {
        contactMapObj.init();    
    }
});


//==============================================================================
// GLOBAL SCROLL EVENT
//==============================================================================
function scrollHandler() {
    if ($(window).scrollTop() > $(window).height() / 1.5) {
        $('.js-scrollup').addClass('is-revealed');
    } else {
        $('.js-scrollup').removeClass('is-revealed');
    }
}

$(window).on('scroll', _debounce(scrollHandler, 150));



//==============================================================================
// SCROLL TO TOP / SCROLL UP
//==============================================================================
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


//==============================================================================
// Lazy Load Images
//==============================================================================
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


//==============================================================================
// CONTACT MAP
//==============================================================================
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


//==============================================================================
// INITIALIZE ONTOGGLE
//==============================================================================
let myOnToggle = new OnToggle();



//==============================================================================
// MASONRY
//==============================================================================
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


//==============================================================================
// Swiper
//==============================================================================
if ($('.swiper-container').length) {
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: true,
        breakpoints: {
            1024: {
                slidesPerView: 3
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    })
}


//==============================================================================
// Modalx
//==============================================================================
let myModalx = new Modalx({
    singleModalTarget: true,
    openCallback(target, event) {
        $('.js-modalx-content').append(`
            <img src="${event.currentTarget.dataset.img}" alt=""/>
        `)

        let $modalImg = $('.js-modalx-content img');

        if( $modalImg.height() > $modalImg.width()) {
            $('.js-modalx-content').addClass('is-vertical');
        }

    },
    closeCallback() {
        $('.js-modalx-content').removeClass('is-vertical').empty();
    }
});