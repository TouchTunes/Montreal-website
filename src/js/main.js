$(document).ready(function(){
  //Calls the scrolling function repeatedly
  if($('.home-wrapper').length) {
    setInterval(bgscroll, scrollSpeed);
  }

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
var scrollSpeed = 30;
  
// set the default position
var current = 0;

// target banner on home
var banner = $('.home-wrapper .banner');

function bgscroll(){

  // move the background with backgrond-position css properties
  if($(banner).hasClass('swipe')) {
    current -= 20;
    $(banner).css("backgroundPosition", current+"px bottom");
  } else {
    current -= 2;
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

// Function that creates a graph for the staff percentage
function graph() {

  var Graph = function(index, element, canvas) {
    this.reference = canvas;
    this.$element = $(canvas);
    
    this.circle = $(element);
    this.index = index;
    
    this.canvasSize = null;
    this.centre = null;
    this.radius = null;
    this.startY = null;
    
    this.init();
  };
  
  // Alias Prototype
  var proto = Graph.prototype;
  
  /**
   *
   *
   */
  proto.init = function() {
    this.createChildren()
        .enable();
  };
  
  /**
   *
   *
   */
  proto.createChildren = function() {
    this.$ring = $('.js-graphItem');
    this.canvas = Snap(this.reference);
    
    
    
    return this;
  };
  
  /**
   *
   *
   */
  proto.enable = function() {
    this.getValue();
  };
  
  /**
   *
   *
   */
  proto.setValues = function() {  
    this.canvasSize = this.$element.height();
    this.centre = this.canvasSize / 2;
    this.radius = (this.canvasSize * 0.8 / 2) - (15 * this.index);
    this.startY = this.centre - this.radius;
    
    return this;
  };
  
  
  /**
   *
   *
   */
  proto.getValue = function() {
    this.setValues(); 
    var val = this.circle.attr('data-val');
    val = parseInt(val, 10);
    var percent = val / 100;
    var color = this.circle.attr('data-color');

    this.animate(percent, color);
  };
  
  /**
   *
   *
   */
  proto.animate = function(percent, color) {
    var self = this;    


    var path = "";
    var arc = this.canvas.path(path);

    var endpoint = percent*360;
    
    Snap.animate(0, endpoint, function(val){

      arc.remove();
        
      path = self.formPath(val);

      arc = self.canvas.path(path);
      arc.attr({
        stroke: color,
        fill: 'none',
        strokeWidth: 15
      });
      
      
      
    }, 2000, mina.easeinout); 
    
  };
 
  
  proto.formPath = function(val) {
    var d = val;
    var dr = d - 90;
    var radians = Math.PI*(dr)/180;
    var endx = this.centre + this.radius * Math.cos(radians);
    var endy = this.centre + this.radius * Math.sin(radians);
    var largeArc = d >180 ? 1 : 0;  
    
    if (endx === 99.99999999999999) {
      var path = "M"+ this.centre + "," + this.startY + " A" + this.radius + "," + this.radius +" 0 "+largeArc+",1 99.99999," + endy + ' Z';
    } else {
      var path = "M"+ this.centre + "," + this.startY + " A" + this.radius + "," + this.radius +" 0 "+largeArc+",1 " + endx + "," + endy;
    }
    return path;
  };
  
  
  $('.js-graphItem').each(function(index, element){
    this.text = new Graph(index, element, '#svg');
  });
  
}

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
 google.maps.event.addDomListener(window, 'load', contactMap);
}

$(".banner .cts").click(function() {
    $('html, body').animate({
        scrollTop: $(".scroll-to").offset().top - 50
    }, 600 );
}); 

$('.tech .more').on('click', function() {
  $(this).prev('.section').toggleClass('expand');
  ($(this).text() == 'more')? $(this).text('less') : $(this).text('more');
});

var fileResume;
var fileCover;
var fileAttachment;
var fileResumeApp;

$('#resume').bind("change", function(e) {
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

$('#attachment').bind("change", function(e) {
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
   
    var name = $('#name').val();
    var email = $('#email').val();
    var link = $('#link').val();

    var test = '';

    test = uploadResume();

    console.log(test);

     var serverUrl = 'https://api.parse.com/1/files/' + fileResume.name;
     var resumeUrl = '';
      $.ajax({
        type: "POST",
        headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
        url: serverUrl,
        data: fileResume,
        processData: false,
        contentType: false,
        success: function(data) {
          resumeUrl = data.url;

          $.ajax({
            type: 'POST',
            url: "https://api.parse.com/1/functions/mail",
            headers: {'X-Parse-Application-Id':'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby','X-Parse-REST-API-Key':'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'},
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            data: '{ "type": "crew", "name": "'+name+'", "email": "'+email+'", "link": "'+link+'", "url": "'+resumeUrl+'"}',
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
  });


$('#submit-contact').on('click', function() {
   
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
});


$('#submit-application').on('click', function() {
   
  var firstName = $('#first-app').val();
  var lastName = $('#last-app').val();
  var city = $('#city-app').val();
  var country = $('#country-app').val();
  var email = $('#email-app').val();
  var phone = $('#phone').val();
  var facebook = $('#facebook').val();
  var linkedin = $('#linkedin').val();

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
                  data: '{ "type": "application", "first": "'+firstName+'", "last": "'+lastName+'", "city": "'+city+'", "country": "'+country+'", "email": "'+email+'",  "phone": "'+phone+'", "facebook": "'+facebook+'", "linkedin": "'+linkedin+'", "resumeUrl": "'+resumeUrl+'",  "coverUrl": "'+coverUrl+'", "attachmentUrl": "'+attachmentUrl+'" }',
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
    
});






