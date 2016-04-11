/* exported uploadResume */
function doAjaxCall(url, data, successCallback, errorCallback, isJson) {
  var ajaxData = {
    type: 'POST',
    headers: {
      'X-Parse-Application-Id': 'evLCBWGMMNYELIUJSIogf0HZ7odir6gohyUepUby',
      'X-Parse-REST-API-Key': 'T5sm7cB5buvWXsayD94YxK9cc1QM71blt8ZhMudQ'
    },
    url: url,
    data: data,
    processData: false,
    contentType: false,
    success: successCallback,
    error: errorCallback
  }
  if (isJson) {
    ajaxData.contentType = 'application/json';
    ajaxData.dataType = 'json';
  }

  $.ajax(ajaxData);
}

var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (is_firefox == true) {
  $('body').addClass('mozilla');
}

$(document).ready(function() {
  //Calls the scrolling function repeatedly
  if ($('.home-wrapper').length) {
    setTimeout(function() {
      $('.animation-placeholder').fadeIn();

      setTimeout(function() {
        $('.animation-placeholder').addClass('slide');
        $('.ld').hide();
      }, 2000);
    }, 3000);
    resetAnimation();
  }

  function resetAnimation() {
    var time = 300000;
    if ($(window).width() <= 940) {
      time = 150000;
    }

    setTimeout(function() {
      $('.animation-placeholder').removeClass('slide');
      setTimeout(function() {
        $('.animation-placeholder').addClass('slide');
      }, 1000);
      resetAnimation();
    }, time);
  }

  if ($('.header').offset().top > 50) {
    $('.header').addClass('scrolled');
  }

  if ($('.section').length) {
    hideMore();
  }

  //validation
  if ($('#contact').hasClass('fr')) {
    $('#contact').validate({
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
        message: {
          required: true
        }
      },
      messages: {
        'first-contact': {
          required: 'S\'il vous plaît entrez votre prénom'
        },
        'last-contact': {
          required: 'S\'il vous plaît entrez votre surnom'
        },
        'email-contact': {
          required: 'S\'il vous plaît entrez votre courriel',
          email: 'Veuillez fournir une adresse courriel valide'
        },
        message: {
          required: 'S\'il vous plaît entrer un message'
        }
      }
    });
  } else {
    $('#contact').validate({
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
        message: {
          required: true
        }
      },
      messages: {
        'first-contact': {
          required: 'Please enter your first name'
        },
        'last-contact': {
          required: 'Please enter your last name'
        },
        'email-contact': {
          required: 'Please enter your email address',
          email: 'Please enter a valid email address'
        },
        message: {
          required: 'Please enter a message'
        }
      }
    });
  }

  if ($('#modal-form').hasClass('fr')) {
    $('#modal-form').validate({
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
          email: true,
          minlength: 5
        },
        'country-app': {
          required: true
        },
        'phone-app': {
          required: true,
          number: true
        },
        'resume-app': {
          extension: 'doc|docx|pdf'
        },
        cover: {
          extension: 'doc|docx|pdf'
        },
        attachment: {
          extension: 'doc|docx|pdf|png|jpg|jpeg'
        }
      },

      messages: {
        'first-app': {
          required: 'S\'il vous plaît entrez votre prénom'
        },
        'last-app': {
          required: 'S\'il vous plaît entrez votre surnom'
        },
        'city-app': {
          required: 'S\'il vous plaît entrez votre ville'
        },
        'email-app': {
          required: 'S\'il vous plaît entrez votre courriel',
          email: 'Veuillez fournir une adresse courriel valide'
        },
        'country-app': {
          required: 'S\'il vous plaît entrez votre pays'
        },
        'phone-app': {
          required: 'S\'il vous plaît entrez votre téléphone',
          number: 'Veuillez fournir une telephone valide'
        },
        'resume-app': {
          required: 'S\'il vous plaît entrez votre résumé',
          extension: 'Accepte les fichiers: doc,docx, pdf'
        },
        cover: {
          extension: 'Accepte les fichiers: doc,docx, pdf'
        },
        attachment: {
          extension: 'Accepte les fichiers: doc,docx, pdf, png, jpg, jpeg'
        },
        facebook: {
          url: 'S\'il vous plaît entrer une URL valide ( doit commencer par http: // ou https: // )'
        },
        linkedin: {
          url: 'S\'il vous plaît entrer une URL valide ( doit commencer par http: // ou https: // )'
        }
      }
    });
  } else {
    $('#modal-form').validate({
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
          email: true,
          minlength: 5
        },
        'country-app': {
          required: true
        },
        'phone-app': {
          required: true,
          number: true
        },
        'resume-app': {
          extension: 'doc|docx|pdf'
        },
        cover: {
          extension: 'doc|docx|pdf'
        },
        attachment: {
          extension: 'doc|docx|pdf|png|jpg|jpeg'
        }
      },

      messages: {
        'first-app': {
          required: 'Please enter your first name'
        },
        'last-app': {
          required: 'Please enter your last name'
        },
        'city-app': {
          required: 'Please enter the city'
        },
        'email-app': {
          required: 'Please enter your email address',
          email: 'Please enter a valid email address'
        },
        'country-app': {
          required: 'Please enter your country'
        },
        'phone-app': {
          required: 'Please enter your phone',
          number: 'Please enter a valid phone number'
        },
        'resume-app': {
          extension: 'Accepted files: doc,docx, pdf'
        },
        cover: {
          extension: 'Accepted files: doc,docx, pdf'
        },
        attachment: {
          extension: 'Accepted files: doc,docx, pdf, png, jpg, jpeg'
        },
        facebook: {
          url: 'Please enter a valid url ( must start with http:// or https://)'
        },
        linkedin: {
          url: 'Please enter a valid url ( must start with http:// or https://)'
        }
      }
    });
  }

  if ($('#menu').hasClass('fr')) {
    $('#menu').validate({
      rules: {
        'first-crew': {
          required: true
        },
        'last-crew': {
          required: true
        },
        'city-crew': {
          required: true
        },
        'email-crew': {
          required: true,
          email: true,
          minlength: 5
        },
        'country-crew': {
          required: true
        },
        'phone-crew': {
          required: true,
          number: true
        },
        resume: {
          extension: 'doc|docx|pdf'
        },
        coverletter: {
          extension: 'doc|docx|pdf'
        },
        attachment: {
          extension: 'doc|docx|pdf|png|jpg|jpeg'
        }
      },

      messages: {
        'first-crew': {
          required: 'S\'il vous plaît entrez votre prénom'
        },
        'last-crew': {
          required: 'S\'il vous plaît entrez votre surnom'
        },
        'city-crew': {
          required: 'S\'il vous plaît entrez votre ville'
        },
        'email-crew': {
          required: 'S\'il vous plaît entrez votre courriel',
          email: 'Veuillez fournir une adresse courriel valide'
        },
        'country-crew': {
          required: 'S\'il vous plaît entrez votre pays'
        },
        'phone-crew': {
          required: 'S\'il vous plaît entrez votre téléphone',
          number: 'Veuillez fournir une telephone valide'
        },
        resume: {
          required: 'S\'il vous plaît entrez votre résumé',
          extension: 'Accepte les fichiers: doc,docx, pdf'
        },
        coverletter: {
          extension: 'Accepte les fichiers: doc,docx, pdf'
        },
        attachment: {
          extension: 'Accepte les fichiers: doc,docx, pdf, png, jpg, jpeg'
        },
        'facebook-crew': {
          url: 'S\'il vous plaît entrer une URL valide ( doit commencer par http: // ou https: // )'
        },
        'linkedin-crew': {
          url: 'S\'il vous plaît entrer une URL valide ( doit commencer par http: // ou https: // )'
        }
      }
    });
  } else {
    $('#menu').validate({
      rules: {
        'first-crew': {
          required: true
        },
        'last-crew': {
          required: true
        },
        'city-crew': {
          required: true
        },
        'email-crew': {
          required: true,
          email: true,
          minlength: 5
        },
        'country-crew': {
          required: true
        },
        'phone-crew': {
          required: true,
          number: true
        },
        resume: {
          extension: 'doc|docx|pdf'
        },
        coverletter: {
          extension: 'doc|docx|pdf'
        },
        attachment: {
          extension: 'doc|docx|pdf|png|jpg|jpeg'
        }
      },

      messages: {
        'first-crew': {
          required: 'Plese enter your first name'
        },
        'last-crew': {
          required: 'Please enter your last name'
        },
        'city-crew': {
          required: 'Please enter the city'
        },
        'email-crew': {
          required: 'Please enter your email address',
          email: 'Please enter a valid email address'
        },
        'country-crew': {
          required: 'Please enter your country'
        },
        'phone-crew': {
          required: 'Please enter your phone',
          number: 'Please enter a valid phone number'
        },
        resume: {
          extension: 'Accepted files: doc,docx, pdf'
        },
        coverletter: {
          extension: 'Accepted files: doc,docx, pdf'
        },
        attachment: {
          extension: 'Accepted files: doc,docx, pdf, png, jpg, jpeg'
        },
        'facebook-crew': {
          url: 'Please enter a valid url ( must start with http:// or https://)'
        },
        'linkedin-crew': {
          url: 'Please enter a valid url ( must start with http:// or https://)'
        }
      }
    });
  }
  //end of validation

  $('#contact, #modal-form, #menu').submit(function(e) {
    e.preventDefault();
  });

  /*$('#contact').validate().form();*/
  $('#menu').validate().form();
  setTimeout(function() {
    $('label[class^="error"]:not(.valid)').remove();
  }, 500);

  $('#modal-form').validate().form();

  // fix for upload button look
  if ($('.uploadBtn').length) {
    $('.uploadBtn').change(function() {
      $(this).parent().siblings($('.uploadFile')).val($(this).val());
    });
  }

  // check placeholders on IE9
  function checkInputs() {
    $('input').each(function(n, element) {
      if ($(element).val() != '') {
        $(element).prevAll('.ie-placeholder').hide();
        $(this).prevAll('.ie-placeholder').hide();
      }
    });
  }

  // ie9 fix for textarea placeholder
  $('textarea').on('keyup', function() {
    $('textarea').prev('.ie-placeholder').hide();
    if ($('textarea').val() == '') {
      if ($('html').hasClass('no-csstransitions')) {
        $('textarea').prev('.ie-placeholder').show();
      }
    }
  });

  $('.no-csstransitions input').on('keyup', function() {
    if ($(this).val() != '') {
      $(this).prevAll('.ie-placeholder').hide();
    } else {
      $(this).prevAll('.ie-placeholder').show();
    }
    setTimeout(checkInputs, 100);
  });

  $('.no-csstransitions input').on('focusout', function() {
    if ($(this).val() != '') {
      $(this).prevAll('.ie-placeholder').hide();
    } else {
      $(this).prevAll('.placeHolder').show();
    }

    setTimeout(checkInputs, 100);
  });

  $('.no-csstransitions .ie-placeholder').on('click', function() {
    $(this).hide();
    $(this).next('input').focus();
  });

});

$(window).scroll(function () {
  var z = 50;
  var y = $('.header').offset().top;
  var scrolled = $(document).scrollTop() + 400;
  var animated = 0;

  if (y >= z) {
    $('.header').addClass('scrolled');
  }

  if (y <= z) {
    $('.header').removeClass('scrolled');
  }

  if ($('.staff').length) {
    var animationOffset = $('.staff').offset().top;
    if (animationOffset < scrolled && animated == 0) {
      graph();
      animated ++;
    }
  }

  if ($('.percentage').length) {
    animationOffset = $('.percentage').offset().top;
    if (animationOffset < scrolled) {
      graph();
    }
  }
});

// trigger toggleMenu function
$('.menu-button').on('click', toggleMenu);

$('.button.apply, .close.modal').on('click', toggleModal);

$('.overlay').on('click', function() {
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

// target banner on home
var banner = $('.home-wrapper .banner');

//trigger big screen animation on click
$('.home-wrapper .banner').on('click', function() {
  if ($(window).width() >= 940) {
    $(this).find('.animation-placeholder').removeClass('slide').addClass('swipe');

    setTimeout(function() {
      $('.animation-placeholder').removeClass('swipe').addClass('slide');
    }, 700);
  }
});

$(banner).swipe({
  allowPageScroll: 'vertical'
});

//trigger small screen animation on swipe
$(banner).swipe({
  //Generic swipe handler for all directions
  swipeLeft: function() {
    if ($(window).width() < 940) {
      $('.animation-placeholder').removeClass('slide').addClass('swipe');

      setTimeout(function() {
        $('.animation-placeholder').removeClass('swipe').addClass('slide');
      }, 800);
    }
  },

  swipeRight: function() {
    if ($(window).width() < 940) {
      $('.animation-placeholder').removeClass('slide').addClass('back');

      setTimeout(function() {
        $('.animation-placeholder').removeClass('back').addClass('slide');
      }, 400);
    }
  },

  //Default is 75px, set to 0 for demo so any distance triggers swipe
  threshold: 75
});

// How fast does counter increse
var interval = 1000;

//Increse the counter on the bottom of about page by a random number
function counter() {
  var numbers = ['15', '16', '17','18', '19', '20', '21'];
  var random = numbers[Math.floor(Math.random() * numbers.length)];
  var current = $('.count').text();
  var value = parseInt(current) + parseInt(random);
  $('.count').text(value);
}

if ($('.counter .count').length) {
  setInterval(counter, interval);
}

function contactMap() {
  var mapCanvas = document.getElementById('contact-map');

  var myLatLng = {lat: 45.509258, lng: -73.669293};

  var mapOptions = {
    center: myLatLng,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    draggable: false,
    streetViewControl: false,
    zoomControl : false,
    mapTypeControl: false
  }

  var map = new google.maps.Map(mapCanvas, mapOptions);

  new google.maps.Marker({
    position: myLatLng,
    map: map
  });

  // var currCenter = map.getCenter();
}

if ($('.contact-map').length) {
  setTimeout(function() {
    $('#contact').validate().form();
  }, 500);
  google.maps.event.addDomListener(window, 'load', contactMap);
}

$('.cts').click(function() {
  $('html, body').animate({
    scrollTop: $('.scroll-to').offset().top - 75
  }, 600);
});

$('.tech .more').on('click', function() {
  $(this).prev('.section').toggleClass('expand');
  $(this).prev('.half').toggleClass('expand');
  $(this).parent().siblings('.section').toggleClass('expand');/*
  ($(this).text() == 'more')? $(this).text('less') : $(this).text('more');*/
});

$('.member .more').on('click', function() {
  $(this).prev('.half').toggleClass('expand');/*
  ($(this).text() == 'more')? $(this).text('less') : $(this).text('more');*/
});

var fileResume;
var fileCover;
var fileAttachment;

$('#resume-crew').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileResume = files[0];
});

$('#resume-app').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileResume = files[0];
});

$('#cover').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileCover = files[0];
});

$('#cover-crew').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileCover = files[0];
});

$('#attachment').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileAttachment = files[0];
});

$('#attachment-crew').on('change', function(e) {
  var files = e.target.files || e.dataTransfer.files;
  fileAttachment = files[0];
});

function uploadResume() {
  var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
  var url = '';
  doAjaxCall(serverUrlResume, fileResume, function(data) {
    url = data.url;
  }, function(data) {
    var obj = $.parseJSON(data);
    alert(obj.error);
  });
  return url;
}

$('#submit-crew').on('click', function () {

  if (!$(this).parent().find('input.error').length) {
    var firstName = $('#first-crew').val();
    var lastName = $('#last-crew').val();
    var city = $('#city-crew').val();
    var country = $('#country-crew').val();
    var email = $('#email-crew').val();
    var job = $('#job').val();
    var phone = $('#phone-crew').val();
    var facebook = $('#facebook-crew').val();
    var linkedin = $('#linkedin-crew').val();

    var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
    var serverUrlCover = '';
    var serverUrlAttachment = '';
    var resumeUrl = '';
    var coverUrl = '';
    var attachmentUrl = '';
    if (fileAttachment) {
      serverUrlAttachment = 'https://api.parse.com/1/files/' + fileAttachment.name;
    }

    if (fileCover) {
      serverUrlCover = 'https://api.parse.com/1/files/' + fileCover.name;
    }

    doAjaxCall(serverUrlResume, fileResume, function(data) {
      resumeUrl = data.url;
      if (serverUrlCover != '') {
        doAjaxCall(serverUrlCover, fileCover, function(data) {
          coverUrl = data.url;
          if (serverUrlAttachment != '') {
            doAjaxCall(serverUrlAttachment, fileAttachment, function(data) {
              attachmentUrl = data.url;
              doAjaxCall(
                'https://api.parse.com/1/functions/mail',
                '{"type": "crew", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "' + coverUrl + '", "attachmentUrl": "' + attachmentUrl + '", "job": "' + job + '" }',
                function() {
                  $('#menu').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                  $('.loader').fadeOut();
                }, function() {
                  $('#menu').append('<div class="ajax-error">Errors while submitting the application</div>');
                }, true
              );
            }, function(data) {
              var obj = $.parseJSON(data);
              alert(obj.error);
            });
          } else {
            doAjaxCall(
              'https://api.parse.com/1/functions/mail',
              '{ "type": "crew", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "' + coverUrl + '", "attachmentUrl": "", "job": "' + job + '" }',
              function() {
                $('#menu').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                $('.loader').fadeOut();
              }, function() {
                $('#menu').append('<div class="ajax-error">Errors while submitting the application</div>');
              }, true
            );
          }
        }, function(data) {
          var obj = $.parseJSON(data);
          alert(obj.error);
        });
      } else {
        if (serverUrlAttachment != '') {
          doAjaxCall(serverUrlAttachment, fileAttachment, function(data) {
            attachmentUrl = data.url;
            doAjaxCall(
              'https://api.parse.com/1/functions/mail',
              '{ "type": "crew", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "/", "attachmentUrl": "' + attachmentUrl + '", "job": "' + job + '" }',
              function() {
                $('#menu').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                $('.loader').fadeOut();
              }, function() {
                $('#menu').append('<div class="ajax-error">Errors while submitting the application</div>');
              }, true
            );
          }, function(data) {
            var obj = $.parseJSON(data);
            alert(obj.error);
          });
        } else {
          doAjaxCall(
            'https://api.parse.com/1/functions/mail',
            '{ "type": "crew", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "/", "attachmentUrl": "/", "job": "' + job + '" }',
            function() {
              $('#menu').append('<div class="ajax-success">Your application has been successfully submitted</div>');
              $('.loader').fadeOut();
            }, function() {
              $('#menu').append('<div class="ajax-error">Errors while submitting the application</div>');
            }, true
          );
        }
      }
    }, function(data) {
      var obj = $.parseJSON(data);
      alert(obj.error);
    });

    $(this).parent().find('.loader').fadeIn();
  }

});


$('#submit-contact').on('click', function () {

  if (!$(this).parent().find('input.error').length) {

    var firstName = $('#first-contact').val();
    var lastName = $('#last-contact').val();
    var email = $('#email-contact').val();
    var message = $('#message').val();

    doAjaxCall(
      'https://api.parse.com/1/functions/mail',
      '{ "type": "contact", "first": "' + firstName + '", "last": "' + lastName + '", "email": "' + email + '", "message": "' + message + '"}',
      function() {
        $('#contact').append('<div class="ajax-success">Your message has been successfully sent</div>');
        $('.loader').fadeOut();
      },
      function() {
        $('#contact').append('<div class="ajax-error">Errors while sending the message</div>');
      },
      true
    );
    $(this).parent().find('.loader').fadeIn();
  }
});


$('#submit-application').on('click', function () {
  if ($(this).parent().parent().find('input.error').length) {
    // console.log('error');
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

    var serverUrlAttachment = '';
    var serverUrlResume = 'https://api.parse.com/1/files/' + fileResume.name;
    var serverUrlCover = '';
    var resumeUrl = '';
    var coverUrl = '';
    var attachmentUrl = '';
    if (fileAttachment) {
      serverUrlAttachment = 'https://api.parse.com/1/files/' + fileAttachment.name;
    }
    if (fileCover) {
      serverUrlCover = 'https://api.parse.com/1/files/' + fileCover.name;
    }

    doAjaxCall(serverUrlResume, fileResume, function(data) {
      resumeUrl = data.url;
      if (serverUrlCover != '') {
        doAjaxCall(serverUrlCover, fileCover, function(data) {
          coverUrl = data.url;
          if (serverUrlAttachment != '') {
            doAjaxCall(serverUrlAttachment, fileAttachment, function(data) {
              attachmentUrl = data.url;
              doAjaxCall(
                'https://api.parse.com/1/functions/mail',
                '{ "type": "application", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "' + coverUrl + '", "attachmentUrl": "' + attachmentUrl + '", "job": "' + job + '" }',
                function() {
                  $('#modal-form').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                  $('.loader').fadeOut();
                }, function() {
                  $('#modal-form').append('<div class="ajax-error">Errors while submitting the application</div>');
                }, true
              );
            }, function(data) {
              var obj = $.parseJSON(data);
              alert(obj.error);
            });
          } else {
            doAjaxCall(
              'https://api.parse.com/1/functions/mail',
              '{ "type": "application", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "' + coverUrl + '", "attachmentUrl": "", "job": "' + job + '" }',
              function() {
                $('#modal-form').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                $('.loader').fadeOut();
              }, function() {
                $('#modal-form').append('<div class="ajax-error">Errors while submitting the application</div>');
              }, true
            );
          }
        }, function(data) {
          var obj = $.parseJSON(data);
          alert(obj.error);
        });
      } else {
        if (serverUrlAttachment != '') {
          doAjaxCall(serverUrlAttachment, fileAttachment, function(data) {
            attachmentUrl = data.url;
            doAjaxCall(
              'https://api.parse.com/1/functions/mail',
              '{ "type": "application", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "/", "attachmentUrl": "' + attachmentUrl + '", "job": "' + job + '" }',
              function() {
                $('#modal-form').append('<div class="ajax-success">Your application has been successfully submitted</div>');
                $('.loader').fadeOut();
              }, function() {
                $('#modal-form').append('<div class="ajax-error">Errors while submitting the application</div>');
              }, true
            );
          }, function(data) {
            var obj = $.parseJSON(data);
            alert(obj.error);
          });
        } else {
          doAjaxCall(
            'https://api.parse.com/1/functions/mail',
            '{ "type": "application", "first": "' + firstName + '", "last": "' + lastName + '", "city": "' + city + '", "country": "' + country + '", "email": "' + email + '",  "phone": "' + phone + '", "facebook": "' + facebook + '", "linkedin": "' + linkedin + '", "resumeUrl": "' + resumeUrl + '",  "coverUrl": "/", "attachmentUrl": "/", "job": "' + job + '" }',
            function() {
              $('#modal-form').append('<div class="ajax-success">Your application has been successfully submitted</div>');
              $('.loader').fadeOut();
            }, function() {
              $('#modal-form').append('<div class="ajax-error">Errors while submitting the application</div>');
            }, true
          );
        }
      }
    }, function(data) {
      var obj = $.parseJSON(data);
      alert(obj.error);
    });
    $(this).parent().siblings('.loader').fadeIn();
  }
});


$(window).on('load', function() {
  if ($('.technology-wrapper').length) {
    Pizza.init();
  }
});

$('.button.apply').on('click', function() {
  var data = $(this).attr('data-title');
  $('.job-modal .title').text(data);
  $('.job-modal .apply-for').val(data);
});

$('.member .img').on('mouseover', function() {
  $('.img').css('opacity', '0.5');
  $(this).css('opacity', '1');
}).on('mouseout', function() {
  $('.img').css('opacity', '1');
});

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf('android') > -1; //&& ua.indexOf("mobile");
if (isAndroid) {
  $('.animation-placeholder').addClass('android');
}
var scrnSize = 410;

if ($(window).width() < 350) {
  scrnSize = 394;
}

function hideMore() {
  $('.section').each(function() {
    if ($(this).outerHeight() < scrnSize) {
      $(this).next('.more').hide();
      $(this).siblings('.additional').children('.more').hide();
    }
  });
}

$('.more').on('click', function() {
  $(this).siblings('.text-container').toggleClass('extend');
  if ($(this).text() == 'Read more') {
    $(this).text('Read less');
  } else if ($(this).text() == 'En savoir plus') {
    $(this).text('En savoir moins');
  } else if ($(this).text() == 'En savoir moins') {
    $(this).text('En savoir plus');
  } else {
    $(this).text('Read more');
  }
});

function goBack() {
  window.history.back();
}