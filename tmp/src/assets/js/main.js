var navToggleObj = {
    $navToggle: $('.js-topbar-nav-toggle'),
    $nav: $('.nav'),

    toggleNav: function() {
        this.$nav.toggleClass('is-visible');
    },

    init: function() {
        console.log(this);
        this.$navToggle.on('click', this.toggleNav.bind(this));
    }


}


$(document).ready(navToggleObj.init());