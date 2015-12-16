$(document).ready(function(){
  //Calls the scrolling function repeatedly
  if($('.home-wrapper').length) {
    setInterval(bgscroll, scrollSpeed);
  }

  $('.animation-placeholder').addClass('slide');

  //validation 
  $("#contact").validate({
    rules: {
      'first-contact': {
        required: true
      },
      'last-contact': {
        required: true
      },
      'email-contact': {
        required: true,
        email: true
      },
      'country-contact': {
        required: true
      },
      'message': {
        required: true
      }
    },

    messages: {
     'first-contact': {
          required: "Please enter your first name"
      },
      'last-contact': {
          required: "Please enter your last name"
      },
      'email-contact': {
         required: "Please enter your email address",
         email: "Please enter a valid email address"
      },
      'country-contact': {
        required: "Please enter your country"
      },
      'message': {
        required: "Please enter a message"
      }
    }
  });

  $("#modal-form").validate({
    rules: {
      'first-app': {
        required: true
      },
      'last-app': {
        required: true
      },
      'city-app': {
        required: true
      },
      'email-app': {
        required: true,
        email: true
      },
      'country-app': {
        required: true
      },
      'phone-app': {
        required: true,
        number: true
      }
    },

    messages: {
     'first-app': {
          required: "Please enter your first name"
      },
      'last-app': {
          required: "Please enter your last name"
      },
      'city-app': {
        required: "Please enter the city"
      },
      'email-app': {
         required: "Please enter your email address",
         email: "Please enter a valid email address"
      },
      'country-app': {
        required: "Please enter your country"
      },
      'phone-app': {
        required: "Please enter your phone",
        number: "Please enter a valid phone number"
      }
    }
  });



  $("#contact, #modal-form, #form").submit(function(e){
      e.preventDefault();
  });

  /*$('#contact').validate().form();*/
  $("#modal-form").validate().form();

  setTimeout(function() {
    $('label[class^="error"]:not(.valid)').remove();
  }, 500);
 

  // fix for upload button look
  if($('.uploadBtn').length){
    $(".uploadBtn").change(function(){
      $(this).parent().siblings($(".uploadFile")).val($(this).val());
    });      
  }

  // check placeholders on IE9 - 
  function checkInputs() {
    $('input').each(function(n, element){
      if ($(element).val() != ''){
        $(element).prevAll( ".ie-placeholder" ).hide();
        $(this).prevAll( ".ie-placeholder" ).hide();
      }  
    });
  };

  // ie9 fix for textarea placeholder 
  $("textarea").keyup(function(){
    $('textarea').prev('.ie-placeholder').hide();
    if( $('textarea').val() == "") {
      if($('html').hasClass('no-csstransitions')) {   
        $('textarea').prev('.ie-placeholder').show();
      }
    }
  });

  $( ".no-csstransitions input" ).on('keyup', function() {
    if ($(this).val() != '') {
      $(this).prevAll( ".ie-placeholder" ).hide();
    } else {
      $(this).prevAll( ".ie-placeholder" ).show();
    }
    setTimeout(function() {
      checkInputs();
    }, 100);
  });
  $( ".no-csstransitions input" ).on('focusout', function() {
    if ($(this).val() != '') {
      $(this).prevAll( ".ie-placeholder" ).hide();
    } else {
      $(this).prevAll( ".placeHolder" ).show();
    }
    setTimeout(function() {
      checkInputs();
    }, 100);
  });

  $( ".no-csstransitions .ie-placeholder" ).on('click', function() {
    $(this).hide();
    $(this).next('input').focus();
  });   

});

$(window).scroll(function () {
  var z = 50;
  var y = $('.header').offset().top;
  var scrolled = $(document).scrollTop() + 400;
  if (y >= z) {
    $(".header").addClass('scrolled');
  }
  if (y <= z ) {
    $(".header").removeClass('scrolled');
	}
  if($('.staff').length){
    var animationOffset = $('.staff').offset().top;
    if(animationOffset < scrolled) {
      graph();
    }
  }
   if($('.percentage').length){
    var animationOffset = $('.percentage').offset().top;
    if(animationOffset < scrolled) {
      graph();
    }
  }
});

// trigger toggleMenu function
$('.menu-button').on('click', function() {
	toggleMenu();
  $("#form").validate().form();
})

$('.button.apply, .close.modal').on('click', function(){
  toggleModal();
});

$('.overlay').on('click', function(){
  $('.menu, html, .overlay').removeClass('menu-open');
  $('.job-modal, html, .overlay').removeClass('modal-open');
});

//function that opens and closes modal and overlay
function toggleModal() {
  $('.job-modal, html, .overlay').toggleClass('modal-open');  
}

// function that opens and closes the menu and shows/hides the overlay
function toggleMenu() {
	$('.menu, html, .overlay').toggleClass('menu-open');	
}

// how many pixels at the time does the home animation move
var scrollSpeed = 4530;
  
// set the default position
var current = 0;

// target banner on home
var banner = $('.home-wrapper .banner');

var bl = -1;

function bgscroll(){
  $('.banner img').eq(bl-6).removeClass('slide').css('margin-left', 0); 
  if($('.banner img').length > bl) {
    bl ++;
  } else {
    bl = 0;
    $('.animation-holder').css('margin-left', 0);
  }
  $('.banner img').eq(bl).addClass('slide').css('margin-left', 0);
}

var marg = 0;
//trigger big screen animation on click
$('.home-wrapper .banner').on('click', function() {
  if($(window).width() >= 940) {  
    marg -= 150;
    $(this).find('.animation-holder').css('margin-left', marg);
    $(this).find('.animation-holder img').css('margin-left', - marg);
  }
});


//trigger small screen animation on swipe
$(banner).swipe( {
  //Generic swipe handler for all directions
  swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
     if($(window).width() < 940) {      
      $(banner).addClass('swipe');
        marg -= 150;
        $('.animation-holder').css('margin-left', marg);
        $('.animation-holder img').css('margin-left', - marg);
      }
  },
  //Default is 75px, set to 0 for demo so any distance triggers swipe
   threshold:0
});

// How fast does counter increse
var interval = 1000;

// Increse the counter on the bottom of about page by a random number 
function counter(){
  var numbers = ['15', '16', '17','18', '19', '20', '21'];
  var random = numbers[Math.floor(Math.random() * numbers.length)];
  var current = $('.count').text();
  var value = parseInt(current) + parseInt(random);
  $('.count').text(value);
}

if($('.counter .count').length) {  
  setInterval(counter, interval);
}

function contactMap() {
  var mapCanvas = document.getElementById('contact-map');

  var myLatLng = {lat: 45.498752, lng: -73.576684};

  var mapOptions = {
    center: myLatLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    draggable: false,
    streetViewControl: false,
    zoomControl : false,
    mapTypeControl: false
  }

  var map = new google.maps.Map(mapCanvas, mapOptions);

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });

  var currCenter = map.getCenter();
}

if($('.contact-map').length){
  $("#contact").validate().form();
  google.maps.event.addDomListener(window, 'load', contactMap);
}

$(".cts").click(function() {
    $('html, body').animate({
        scrollTop: $(".scroll-to").offset().top - 50
    }, 600 );
}); 

$('.tech .more').on('click', function() {
  $(this).parent().siblings('.section').toggleClass('expand');
  ($(this).text() == 'more')? $(this).text('less') : $(this).text('more');
});

var fileResume;
var fileCover;
var fileAttachment;
var fileResumeApp;

$('#resume-crew').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileResume = files[0];
});

$('#resume-app').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileResume = files[0];
});

$('#cover').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileCover = files[0];
});
$('#cover-crew').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileCover = files[0];
});

$('#attachment').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileAttachment = files[0];
});

$('#attachment-crew').bind("change", function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileAttachment = files[0];
});

function uploadResume() {
  var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
  var url = ''
  $.ajax({
    type: "POST",
    headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
    url: serverUrlResume,
    data: fileResume,
    processData: false,
    contentType: false,
    success: function(data) {
      url = data.url;

    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
    }
  });

  return url;
}

$('#submit-crew').on('click', function() {

  if($(this).parent().find('input.error').length) {
    console.log('error');
  } else {
     
    var firstName = $('#first-crew').val();
    var lastName = $('#last-crew').val();
    var city = $('#city-crew').val();
    var country = $('#country-crew').val();
    var email = $('#email-crew').val();
    var phone = $('#phone-crew').val();
    var facebook = $('#facebook-crew').val();
    var linkedin = $('#linkedin-crew').val();

    var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
    var serverUrlCover = 'https://api.parse.com/1/files/' + fileCover.name;
    var serverUrlAttachment = 'https://api.parse.com/1/files/' + fileAttachment.name;
    var resumeUrl = '';
    var coverUrl = '';
    var attachmentUrl = '';

      $.ajax({
        type: "POST",
        headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
        url: serverUrlResume,
        data: fileResume,
        processData: false,
        contentType: false,
        success: function(data) {
          resumeUrl = data.url;
           $.ajax({
            type: "POST",
            headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
            url: serverUrlCover,
            data: fileCover,
            processData: false,
            contentType: false,
            success: function(data) {
              coverUrl = data.url;
              $.ajax({
                type: "POST",
                headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
                url: serverUrlAttachment,
                data: fileAttachment,
                processData: false,
                contentType: false,
                success: function(data) {
                  attachmentUrl = data.url;
                  $.ajax({
                    type: 'POST',
                    url: "https://api.parse.com/1/functions/mail",
                    headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    data: '{ "type": "crew", "first": "'+firstName+'", "last": "'+lastName+'", "city": "'+city+'", "country": "'+country+'", "email": "'+email+'",  "phone": "'+phone+'", "facebook": "'+facebook+'", "linkedin": "'+linkedin+'", "resumeUrl": "'+resumeUrl+'",  "coverUrl": "'+coverUrl+'", "attachmentUrl": "'+attachmentUrl+'" }',
                    contentType: 'application/json',
                    success: function (data) {
                      alert(JSON.stringify(data));
                    },
                    error: function(){
                      alert("Cannot get data");
                    }
                });

                },
                error: function(data) {
                  var obj = jQuery.parseJSON(data);
                  alert(obj.error);
                }
              });

            },
            error: function(data) {
              var obj = jQuery.parseJSON(data);
              alert(obj.error);
            }
          });

        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    }
    
});


$('#submit-contact').on('click', function() {

    if($(this).parent().find('input.error').length) {
      console.log('error');
    } else {

      var firstName = $('#first-contact').val();
      var lastName = $('#last-contact').val();
      var email = $('#email-contact').val();
      var country = $('#country-contact').val();
      var message = $('#message').val();

      $.ajax({
        type: 'POST',
        url: "https://api.parse.com/1/functions/mail",
        headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        data: '{ "type": "contact", "first": "'+firstName+'", "last": "'+lastName+'", "email": "'+email+'", "country": "'+country+'", "message": "'+message+'"}',
        contentType: 'application/json',
        success: function (data) {
          alert(JSON.stringify(data));
        },
        error: function(){
          alert("Cannot get data");
        }
      });
    }
});


$('#submit-application').on('click', function() {
  if($(this).parent().find('input.error').length) {
    console.log('error');
  } else {
     
    var firstName = $('#first-app').val();
    var lastName = $('#last-app').val();
    var city = $('#city-app').val();
    var country = $('#country-app').val();
    var email = $('#email-app').val();
    var phone = $('#phone').val();
    var facebook = $('#facebook').val();
    var linkedin = $('#linkedin').val();
    var job = $('#job').val();

    var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
    var serverUrlCover = 'https://api.parse.com/1/files/' + fileCover.name;
    var serverUrlAttachment = 'https://api.parse.com/1/files/' + fileAttachment.name;
    var resumeUrl = '';
    var coverUrl = '';
    var attachmentUrl = '';

      $.ajax({
        type: "POST",
        headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
        url: serverUrlResume,
        data: fileResume,
        processData: false,
        contentType: false,
        success: function(data) {
          resumeUrl = data.url;
           $.ajax({
            type: "POST",
            headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
            url: serverUrlCover,
            data: fileCover,
            processData: false,
            contentType: false,
            success: function(data) {
              coverUrl = data.url;
              $.ajax({
                type: "POST",
                headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
                url: serverUrlAttachment,
                data: fileAttachment,
                processData: false,
                contentType: false,
                success: function(data) {
                  attachmentUrl = data.url;
                  $.ajax({
                    type: 'POST',
                    url: "https://api.parse.com/1/functions/mail",
                    headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    data: '{ "type": "application", "first": "'+firstName+'", "last": "'+lastName+'", "city": "'+city+'", "country": "'+country+'", "email": "'+email+'",  "phone": "'+phone+'", "facebook": "'+facebook+'", "linkedin": "'+linkedin+'", "resumeUrl": "'+resumeUrl+'",  "coverUrl": "'+coverUrl+'", "attachmentUrl": "'+attachmentUrl+'", "job": "'+job+'" }',
                    contentType: 'application/json',
                    success: function (data) {
                      alert(JSON.stringify(data));
                    },
                    error: function(){
                      alert("Cannot get data");
                    }
                });

                },
                error: function(data) {
                  var obj = jQuery.parseJSON(data);
                  alert(obj.error);
                }
              });

            },
            error: function(data) {
              var obj = jQuery.parseJSON(data);
              alert(obj.error);
            }
          });

        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    }
    
});


$(window).load(function() {
  if($('.technology-wrapper').length) {
      Pizza.init();
  }    
})

$('.button.apply').on('click', function(){ 
  var data = $(this).attr('data-title'); 
  $('.job-modal .title').text(data); 
  $('.job-modal .apply-for').val(data);
});

//function fo preloading images in the banner animation
var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };
            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};

preloadingImages = new Array();
for(var i = 1; i <= 37; i++) {
  preloadingImages.push('../img/banner/banner'+ [i] + '.jpg');
}

// specift images for preloading
preloadPictures( preloadingImages, function(){
  console.log('loaded 1');
    for(var k = 0; k < 8; k++) {
      $('.banner .animation-holder').append('<img src="' +preloadingImages[k]+'"/>');
    }
    preloadPictures(preloadingImages, function() {
      for(var k = 8; k < 16; k++) {
        $('.banner .animation-holder').append('<img src="' +preloadingImages[k]+'"/>');
      }
      console.log('loaded 2');
      preloadPictures(preloadingImages, function() {
        for(var k = 16; k < 24; k++) {
          $('.banner .animation-holder').append('<img src="' +preloadingImages[k]+'"/>');
        }
        console.log('loaded 3');
         preloadPictures(preloadingImages, function() {
          for(var k = 24; k < 32; k++) {
            $('.banner .animation-holder').append('<img src="' +preloadingImages[k]+'"/>');
          }
          console.log('loaded 4');
           preloadPictures(preloadingImages, function() {
            for(var k = 32; k < 37; k++) {
              $('.banner .animation-holder').append('<img src="' +preloadingImages[k]+'"/>');
            }
            console.log('loaded 5')
          });
        });
      });
    });
});

// end of preload

$(".member .img").mouseover(function() { $('.img').css('opacity', '0.5'); $(this).css('opacity', '1');}).mouseout(function() { $('.img').css('opacity', '1'); });