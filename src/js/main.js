$(document).ready(function(){

});

$(window).scroll(function () {
    var z = 50;
    var y = $('.header').offset().top;
    if (y >= z) {
      $(".header").addClass('scrolled');
    }
    if (y <= z ) {
      $(".header").removeClass('scrolled');
	}
});

// trigger toggleMenu function
$('.menu-button, .overlay').on('click', function() {
	toggleMenu();
})

// function that opens and closes the menu and shows/hides the overlay
function toggleMenu() {
	$('.menu, html, .overlay').toggleClass('menu-open');	
}

var scrollSpeed = 40;
  
// set the default position
var current = 0;

function bgscroll(){

  // move the background with backgrond-position css properties
  if($('.home-wrapper .banner').hasClass('swipe')) {
    current += 40;
    $('.home-wrapper .banner').css("backgroundPosition", current+"px bottom");
  } else {
    current += 1;
    $('.home-wrapper .banner').css("backgroundPosition", current+"px bottom");
  }
    

}

$('.home-wrapper .banner').on('click', function() {
  $(this).addClass('swipe');
  setTimeout(function(){
    $('.home-wrapper .banner').removeClass('swipe'); 
  }, 300)
})

//Calls the scrolling function repeatedly
if($('.home-wrapper').length) {
  setInterval(bgscroll, scrollSpeed);
}
