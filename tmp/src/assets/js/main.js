$(document).ready(function() {
    navToggleObj.init();
    lazyLoadImg.init();
});


// ===============================
// Toggle nav
// ===============================
var navToggleObj = {
    $navToggle: $('.js-nav-toggle'),
    $nav: $('.js-nav'),

    toggleNav: function(e) {
        let self = this;
        e.preventDefault();
        e.stopPropagation();
        this.$nav.toggleClass('is-visible');
        this.$navToggle.toggleClass('is-opened');

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
        this.$navToggle.removeClass('is-opened');
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
