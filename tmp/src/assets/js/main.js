var navToggleObj = {
    $navToggle: $('.js-topbar-nav-toggle'),
    $nav: $('.nav'),

    toggleNav: function() {
        this.$nav.toggleClass('revealed');
    },

    init: function() {
        console.log(this);
        this.$navToggle.on('click', this.toggleNav.bind(this));
    }


}


$(document).ready(navToggleObj.init());