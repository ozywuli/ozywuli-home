(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
    navToggleObj.init();
    lazyLoadImg.init();
});

// ===============================
// Toggle nav
// ===============================
var navToggleObj = {
    $navToggle: $('.js-nav-toggle'),
    $nav: $('.js-nav'),

    toggleNav: function toggleNav(e) {
        var self = this;
        e.preventDefault();
        e.stopPropagation();
        this.$nav.toggleClass('is-visible');
        this.$navToggle.toggleClass('is-opened');

        if (this.$nav.hasClass('is-visible')) {
            $(window).on('click.nav', function () {
                self.closeNav();
            });
            this.$nav.on('click.nav', function (event) {
                event.stopPropagation();
            });
        } else {
            $(window).off('click.nav');
            this.$nav.off('click.nav');
        }
    },

    closeNav: function closeNav(e) {
        this.$nav.removeClass('is-visible');
        this.$navToggle.removeClass('is-opened');
    },

    init: function init() {
        this.$navToggle.on('click', this.toggleNav.bind(this));
    }

    // ===============================
    // Lazy Load Images
    // ===============================
};var lazyLoadImg = {
    $featuredItem: $('.js-featured-list-item'),
    featuredItemOffsets: [],
    scrolled: $(window).scrollTop(),
    windowHeight: $(window).height(),

    updateOffsets: function updateOffsets() {

        var featuredItemOffsets = this.featuredItemOffsets;
        this.$featuredItem.each(function () {
            featuredItemOffsets.push($(this).offset().top);
        });
    },

    scrolling: function scrolling() {
        this.scrolled = $(window).scrollTop();

        for (var i = 0; i < this.featuredItemOffsets.length; i++) {

            if (this.scrolled + this.windowHeight - 200 > this.featuredItemOffsets[i]) {

                this.$featuredItem.eq(i).find('.featured-list-item-img').css('background-image', 'url("' + this.$featuredItem.eq(i).attr('data-img') + '")');
            }
        }
    },

    init: function init() {
        this.updateOffsets();

        $(window).on('scroll', this.scrolling.bind(this));
    }
};

},{}]},{},[1])

//# sourceMappingURL=main.js.map
