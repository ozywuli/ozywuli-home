var navToggleObj = {
    $navToggle: $('.js-topbar-nav-toggle'),
    $nav: $('.nav'),

    toggleNav: function() {
        this.$nav.toggleClass('is-visible');
        this.$navToggle.toggleClass('is-opened');
    },

    init: function() {
        this.$navToggle.on('click', this.toggleNav.bind(this));
    }


}


$(document).ready(navToggleObj.init());