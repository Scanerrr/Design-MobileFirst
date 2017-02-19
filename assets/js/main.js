$(document).ready(function() {
  menuOnClick();
  hideNav();
});


// NAVBAR
function menuOnClick() {
  var menuPlate = $('.menu-plate'),
    hamburgerMenu = $('.hamburger-menu');
  menuPlate.on('click', function(e){
    e.stopPropagation();
  });
  hamburgerMenu.add('.menu-close-btn, .menu-overlay').on('click', function() {
    hamburgerMenu.toggleClass('is-active');
    $('html').toggleClass('menu-open');
  });
};

// AUTO HIDE NAV BAR
function hideNav() {
  var nav = $('.nav').eq(0);
  var prevPos = $(window).scrollTop();

  setInterval(detect, 100);

  function detect() {
    var currPos = $(window).scrollTop(),
        scrolled = prevPos - currPos;
    if (scrolled < 0) {
      nav.css('top', '-95px');
    }
    if (scrolled > 0) {
      nav.css('top', '0px');
    }
    prevPos = currPos;
  }
};
