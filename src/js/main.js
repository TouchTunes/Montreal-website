$(document).ready(function(){
  //Calls the scrolling function repeatedly
  if($('.home-wrapper').length) {
    setInterval(bgscroll, scrollSpeed);
  }
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

var scrollSpeed = 25;
  
// set the default position
var current = 0;

// target banner on home
var banner = $('.home-wrapper .banner');

function bgscroll(){

  // move the background with backgrond-position css properties
  if($(banner).hasClass('swipe')) {
    current += 20;
    $(banner).css("backgroundPosition", current+"px bottom");
  } else {
    current += 1;
    $(banner).css("backgroundPosition", current+"px bottom");
  }
}

//trigger big screen animation on click
$('.home-wrapper .banner').on('click', function() {
  if($(window).width() >= 940) {  
    $(this).addClass('swipe');
    setTimeout(function(){
      $('.home-wrapper .banner').removeClass('swipe'); 
    }, 300)
  }
});


//trigger small screen animation on swipe
$(banner).swipe( {
    //Generic swipe handler for all directions
    swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
       if($(window).width() < 940) {      
        $(banner).addClass('swipe');
          setTimeout(function(){
            $(banner).removeClass('swipe'); 
          }, 300);
        }
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
     threshold:0
  });