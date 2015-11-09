//= require_tree .
(function($) {


// Variables
var $scrollTopContainer;
var $scrollTop;
var $portfolio;
var $menuLink;
var scrollPosition;

$scrollTopContainer = $('.scrolltop-container');
$scrollTop = $('.scrolltop');
$portfolio = $('.portfolio');
$menuLink = $('.js-menu__link');


var positionOfPortfolio = $portfolio.offset().top;


// Resuable functions

function deferredImages() {
  var imgDefer = document.getElementsByTagName('img');
  for (var i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
    }
  }
}

function animateTo(position, speed) {

  $('html, body').animate({
    scrollTop: position
  }, speed)

}



// Object literals

var scrollTop = {
  init: function() {
    $scrollTop.click( scrollTop.animateTop );
  },
  animateTop: function(e) {

    e.preventDefault();
    animateTo(0, 400);

  }
}



var scrollTo = {
  init: function() {
    $menuLink.click( scrollTo.scrollTo );
  },
  scrollTo: function(e) {
    e.preventDefault();

    var thisAnchor = $(this).attr('href');
    var thisAnchorOffset = $(thisAnchor).offset().top - 20;

    animateTo(thisAnchorOffset, 800);

  }
}




var windowScrolling = {

  scrollPosition: null,

  init: function() {
    $(window).scroll( windowScrolling.scrolling );
  },
  scrolling: function() {

    windowScrolling.scrollPosition = $(window).scrollTop();
    windowScrolling.fading();

  },
  fading: function() {

    if ( this.scrollPosition > positionOfPortfolio) {
      $scrollTopContainer.addClass('scrolltop--active')
    } else {
      $scrollTopContainer.removeClass('scrolltop--active');
    }

  }

}





$(document).ready(function() {
  setTimeout(function() {
    deferredImages();
  }, 1000);
  scrollTop.init();
  scrollTo.init();
  windowScrolling.init();
}); // end document ready


})(jQuery); // end set $ as jQuery




