//= require_tree .
(function($) {


function deferredImages() {
  var imgDefer = document.getElementsByTagName('img');
  for (var i = 0; i < imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
    }
  }
}

var test = {
  init: function() {
    console.log(1);
  }
}

var test2 = {
  init: function() {
    console.log(2);
  }
}


var $scrollTopContainer;
var $scrollTop;
var $portfolio;
var $menuLink;
var scrollPosition;

$scrollTopContainer = $('.scrolltop-container');
$scrollTop = $('.scrolltop');
$portfolio = $('.portfolio');
$menuLink = $('.menu__link');


var positionOfPortfolio = $portfolio.offset().top;

$(window).on('scroll', function() {
  scrollPosition = $(window).scrollTop();

  if (scrollPosition > positionOfPortfolio) {
    $scrollTopContainer.fadeIn(150);
  } else {
    $scrollTopContainer.fadeOut(150);
  }

});

$scrollTop.on('click', function(e) {
  e.preventDefault();

  $('html, body').animate({
    scrollTop: 0
  }, 400);

});


$menuLink.on('click', function(e) {
  e.preventDefault();

  var thisAnchor = $(this).attr('href');

  var thisAnchorOffset = $(thisAnchor).offset().top - 20;

  $('html, body').animate({
    scrollTop: thisAnchorOffset
  }, 800)

});
















$(document).ready(function() {
  deferredImages();
  test.init();
  test2.init();
})

})(jQuery);




