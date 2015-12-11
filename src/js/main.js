$(document).ready(function(){
  //Calls the scrolling function repeatedly
  if($('.home-wrapper').length) {
    /*setInterval(bgscroll, scrollSpeed);*/
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
  $(this).parent().prev('.section').toggleClass('expand');
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
    
});


(function ($, window, document, undefined) {
  'use strict';

  var Pizza = {
    version : '0.0.1',

    settings : {
      donut: false,
      donut_inner_ratio: 0.4,   // between 0 and 1
      percent_offset: 35,       // relative to radius
      stroke_color: '#333',
      stroke_width: 0,
      show_percent: true,       // show or hide the percentage on the chart.
      animation_speed: 500,
      animation_type: 'elastic' // options: backin, backout, bounce, easein, 
                                //          easeinout, easeout, linear
    },

    init : function (scope, options) {
      var self = this;
      this.scope = scope || document.body;

      var pies = $('[data-pie-id]', this.scope);

      $.extend(true, this.settings, options)

      if (pies.length > 0) {
        pies.each(function () {
          return self.build($(this), options);
        });
      } else {
        this.build($(this.scope), options);
      }

      this.events();
    },

    events : function () {
      var self = this;

      $(window).off('.pizza').on('resize.pizza', self.throttle(function () {
        self.init();
      }, 100));

      $(this.scope).off('.pizza').on('mouseenter.pizaa mouseleave.pizza touchstart.pizza', '[data-pie-id] li', function (e) {
        var parent = $(this).parent(),
            path = Snap($('#' + parent.data('pie-id') + ' path[data-id="s' + $(this).index() + '"]')[0]),
            text = Snap($(path.node).parent()
              .find('text[data-id="' + path.node.getAttribute('data-id') + '"]')[0]),
            settings = $(this).parent().data('settings');

        if (/start/i.test(e.type)) {
          $(path.node).siblings('path').each(function () {
            if (this.nodeName) {
              path.animate({
                transform: 's1 1 ' + path.node.getAttribute('data-cx') + ' ' + path.node.getAttribute('data-cy')
              }, settings.animation_speed, mina[settings.animation_type]);
              Snap($(this).next()[0]).animate({
                opacity: 0
              }, settings.animation_speed);
            }
          });
        }

        if (/enter|start/i.test(e.type)) {
          path.animate({
            transform: 's1.05 1.05 ' + path.node.getAttribute('data-cx') + ' ' + path.node.getAttribute('data-cy')
          }, settings.animation_speed, mina[settings.animation_type]);

          if (settings.show_percent) {
            text.animate({
              opacity: 1
            }, settings.animation_speed);
          }
        } else {
          path.animate({
            transform: 's1 1 ' + path.node.getAttribute('data-cx') + ' ' + path.node.getAttribute('data-cy')
          }, settings.animation_speed, mina[settings.animation_type]);
          text.animate({
            opacity: 0
          }, settings.animation_speed);
        }
      });
    },

    build : function(legends, options) {
      var self = this;

      var legend = legends, graph;

      legend.data('settings', $.extend({}, self.settings, options, legend.data('options')));
      self.data(legend, options || {});

      return self.update_DOM(self.pie(legend));
    },

    data : function (legend, options) {
      var data = [],
          count = 0;

      $('li', legend).each(function () {
        var segment = $(this);

        if (options.data) {
          data.push({
            value: options.data[segment.index()], 
            color: segment.css('color'),
            segment: segment
          });
        } else {
          data.push({
            value: segment.data('value'), 
            color: segment.css('color'),
            segment: segment
          });
        }
      });

      return legend.data('graph-data', data);
    },

    update_DOM : function (parts) {
      var legend = parts[0],
          graph = parts[1];

      return $(this.identifier(legend)).html(graph);
    },

    pie : function (legend) {
      // pie chart concept from JavaScript the 
      // Definitive Guide 6th edition by David Flanagan
      var settings = legend.data('settings'),
          svg = this.svg(legend, settings),
          data = legend.data('graph-data'),
          total = 0,
          angles = [],
          start_angle = 0,
          base = $(this.identifier(legend)).width() - 4;

      for (var i = 0; i < data.length; i++) {
        total += data[i].value;
      }

      for (var i = 0; i < data.length; i++) {
        angles[i] = data[i].value / total * Math.PI * 2;
      }

      for (var i = 0; i < data.length; i++) {
        var end_angle = start_angle + angles[i];
        var cx = (base / 2),
            cy = (base / 2),
            r = ((base / 2) * 0.85);

        if (!settings.donut) {
          // Compute the two points where our wedge intersects the circle
          // These formulas are chosen so that an angle of 0 is at 12 o'clock
          // and positive angles increase clockwise
          var x1 = cx + r * Math.sin(start_angle);
          var y1 = cy - r * Math.cos(start_angle);
          var x2 = cx + r * Math.sin(end_angle);
          var y2 = cy - r * Math.cos(end_angle);

          // This is a flag for angles larger than than a half circle
          // It is required by the SVG arc drawing component
          var big = 0;
          if (end_angle - start_angle > Math.PI) big = 1;

          // This string holds the path details
          var d = "M" + cx + "," + cy +  // Start at circle center
              " L" + x1 + "," + y1 +     // Draw line to (x1,y1)
              " A" + r + "," + r +       // Draw an arc of radius r
              " 0 " + big + " 1 " +      // Arc details...
              x2 + "," + y2 +            // Arc goes to to (x2,y2)
              " Z";                      // Close path back to (cx,cy)
        }

        var existing_path = $('path[data-id="s' + i + '"]', svg.node);

        if (existing_path.length > 0) {
          var path = Snap(existing_path[0]);
        } else {
          var path = svg.path();
        }

        var percent = (data[i].value / total) * 100.0;

        // thanks to Raphael.js
        var existing_text = $('text[data-id="s' + i + '"]', svg.node);

        if (existing_text.length > 0) {
          var text = Snap(existing_text[0]);
          text.attr({
            x: cx + (r + settings.percent_offset) * Math.sin(start_angle + (angles[i] / 2)),
            y: cy - (r + settings.percent_offset) * Math.cos(start_angle + (angles[i] / 2))
          });
        } else {
          var text = path.paper.text(cx + (r + settings.percent_offset) * Math.sin(start_angle + (angles[i] / 2)),
               cy - (r + settings.percent_offset) * Math.cos(start_angle + (angles[i] / 2)), Math.ceil(percent) + '%');
        }

        var left_offset = text.getBBox().width / 2;

        text.attr({
          x: text.attr('x') - left_offset,
          opacity: 0
        });

        text.node.setAttribute('data-id', 's' + i);
        path.node.setAttribute('data-cx', cx);
        path.node.setAttribute('data-cy', cy);

        if (settings.donut) {
          this.annular_sector(path.node, {
            centerX:cx, centerY:cy,
            startDegrees:start_angle, endDegrees:end_angle,
            innerRadius: (r * settings.donut_inner_ratio), outerRadius:r
          });
        } else {
          path.attr({d:d});
        }

        path.attr({
          fill: data[i].color,
          stroke: settings.stroke_color,
          strokeWidth: settings.stroke_width
        });

        path.node.setAttribute('data-id', 's' + i);

        this.animate(path, cx, cy, settings);

        // The next wedge begins where this one ends
        start_angle = end_angle;
      }

      return [legend, svg.node];
    },

    animate : function (el, cx, cy, settings) {
      var self = this;

      el.hover(function (e) {
        var path = Snap(e.target),
            text = Snap($(path.node).parent()
              .find('text[data-id="' + path.node.getAttribute('data-id') + '"]')[0]);

        path.animate({
          transform: 's1.05 1.05 ' + cx + ' ' + cy
        }, settings.animation_speed, mina[settings.animation_type]);

        text.touchend(function () {
          path.animate({
            transform: 's1.05 1.05 ' + cx + ' ' + cy
          }, settings.animation_speed, mina[settings.animation_type]);
        });

        if (settings.show_percent) {
          text.animate({
            opacity: 1
          }, settings.animation_speed);
          text.touchend(function () {
            text.animate({
              opacity: 1
            }, settings.animation_speed);
          });
        }
      }, function (e) {
        var path = Snap(e.target),
            text = Snap($(path.node).parent()
              .find('text[data-id="' + path.node.getAttribute('data-id') + '"]')[0]);

        path.animate({
          transform: 's1 1 ' + cx + ' ' + cy
        }, settings.animation_speed, mina[settings.animation_type]);

        text.animate({
          opacity: 0
        }, settings.animation_speed);
      });
    },

    svg : function (legend, settings) {
      var container = $(this.identifier(legend)),
          svg = $('svg', container),
          width = container.width(),
          height = width;

      if (svg.length > 0) {
        svg = Snap(svg[0]);
      } else {
        svg = Snap(width, height);
      }

      svg.node.setAttribute('width', width + settings.percent_offset);
      svg.node.setAttribute('height', height + settings.percent_offset);
      svg.node.setAttribute('viewBox', '-' + settings.percent_offset + ' -' + settings.percent_offset + ' ' + 
        (width + (settings.percent_offset * 1.5)) + ' ' + 
        (height + (settings.percent_offset * 1.5)));

      return svg;
    },

    // http://stackoverflow.com/questions/11479185/svg-donut-slice-as-path-element-annular-sector
    annular_sector : function (path, options) {
      var opts = optionsWithDefaults(options);

      var p = [ // points
        [opts.cx + opts.r2*Math.sin(opts.startRadians),
         opts.cy - opts.r2*Math.cos(opts.startRadians)],
        [opts.cx + opts.r2*Math.sin(opts.closeRadians),
         opts.cy - opts.r2*Math.cos(opts.closeRadians)],
        [opts.cx + opts.r1*Math.sin(opts.closeRadians),
         opts.cy - opts.r1*Math.cos(opts.closeRadians)],
        [opts.cx + opts.r1*Math.sin(opts.startRadians),
         opts.cy - opts.r1*Math.cos(opts.startRadians)],
      ];

      var angleDiff = opts.closeRadians - opts.startRadians;
      var largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0;
      var cmds = [];
      cmds.push("M"+p[0].join());                                // Move to P0
      cmds.push("A"+[opts.r2,opts.r2,0,largeArc,1,p[1]].join()); // Arc to  P1
      cmds.push("L"+p[2].join());                                // Line to P2
      cmds.push("A"+[opts.r1,opts.r1,0,largeArc,0,p[3]].join()); // Arc to  P3
      cmds.push("z");                                // Close path (Line to P0)
      path.setAttribute('d',cmds.join(' '));

      function optionsWithDefaults(o){
        // Create a new object so that we don't mutate the original
        var o2 = {
          cx           : o.centerX || 0,
          cy           : o.centerY || 0,
          startRadians : (o.startDegrees || 0),
          closeRadians : (o.endDegrees   || 0),
        };

        var t = o.thickness!==undefined ? o.thickness : 100;
        if (o.innerRadius!==undefined)      o2.r1 = o.innerRadius;
        else if (o.outerRadius!==undefined) o2.r1 = o.outerRadius - t;
        else                                o2.r1 = 200           - t;
        if (o.outerRadius!==undefined)      o2.r2 = o.outerRadius;
        else                                o2.r2 = o2.r1         + t;

        if (o2.r1<0) o2.r1 = 0;
        if (o2.r2<0) o2.r2 = 0;

        return o2;
      }
    },

    identifier : function (legend) {
      return '#' + legend.data('pie-id');
    },

    throttle : function(fun, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fun.apply(context, args);
        }, delay);
      };
    }
  };

  window.Pizza = Pizza;

}($, this, this.document));

$(window).load(function() {
  if($('.technology-wrapper').length) {
      Pizza.init();
  }    
})

$('.button.apply').on('click', function(){ var data = $(this).attr('data-title'); $('.job-modal .title').text(data); $('.job-modal .apply-for').val(data); });
