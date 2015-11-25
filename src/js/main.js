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