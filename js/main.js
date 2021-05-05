(function ($) {

  "use strict";



  /* Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  /* Testimonials Carousel 
  ========================================================*/
  var owl = $("#client-testimonial");
  owl.owlCarousel({
    navigation: true,
    pagination: false,
    slideSpeed: 1000,
    stopOnHover: true,
    autoPlay: true,
    items: 1,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    addClassActive: true,
    itemsDesktop: [1199, 1],
    itemsDesktopSmall: [980, 1],
    itemsTablet: [768, 1],
    itemsTablet: [767, 1],
    itemsTabletSmall: [480, 1],
    itemsMobile: [479, 1],
  });
  $('#client-testimonial').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
  $('#client-testimonial').find('.owl-next').html('<i class="lni-chevron-right"></i>');


  /* showcase Slider
  =============================*/
  var owl = $(".showcase-slider");
  owl.owlCarousel({
    navigation: false,
    pagination: true,
    slideSpeed: 1000,
    margin: 10,
    stopOnHover: true,
    autoPlay: true,
    items: 5,
    itemsDesktopSmall: [1024, 3],
    itemsTablet: [600, 1],
    itemsMobile: [479, 1]
  });

  $('document').ready(function () {
    $("#imgload").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#imgshow').attr('src', e.target.result);
        }
        console.log(this.files[0].readAsDataURL());
        getAPIFile(reader.readAsDataURL(this.files[0]));
      }
    });
  });



  /* 
   Sticky Nav
   ========================================================================== */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
      $('.header-top-area').addClass('menu-bg');
    } else {
      $('.header-top-area').removeClass('menu-bg');
    }
  });

  var canvas_dom = document.getElementById('sig-canvas');
  canvas_dom.addEventListener("touchstart", function (event) { event.preventDefault() })
  canvas_dom.addEventListener("touchmove", function (event) { event.preventDefault() })
  canvas_dom.addEventListener("touchend", function (event) { event.preventDefault() })
  canvas_dom.addEventListener("touchcancel", function (event) { event.preventDefault() })

  document.getElementById('upload').addEventListener("click", function (e) {
    // add array here call random and pass it into the getAPI function
    // var items = ["https://live.staticflickr.com/65535/48891486207_0ae6acf95e_q.jpg", "https://live.staticflickr.com/65535/48891307736_4e872f5a3b_m.jpg", "https://live.staticflickr.com/65535/48891485992_7fdd327308_m.jpg"]
    // var item = items[Math.floor(Math.random()*items.length)];
    var img = canvas.toDataURL("image/png");
    getAPIFile(img);
    // download();
  }, false);

  document.getElementById('clear').addEventListener("click", function (e) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    let div = document.getElementById('results');
    div.innerHTML = "";

    let para = document.createElement("p");
    div.appendChild(para);
  }, false);

  /* 
 VIDEO POP-UP
 ========================================================================== */
  $('.video-popup').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  /* 
   Back Top Link
   ========================================================================== */
  var offset = 200;
  var duration = 500;
  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
      $('.back-to-top').fadeIn(400);
    } else {
      $('.back-to-top').fadeOut(400);
    }
  });

  $('.back-to-top').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
    return false;
  })

  /* 
   One Page Navigation
   ========================================================================== */


  $(window).on('load', function () {

    $('body').scrollspy({
      target: '.navbar-collapse',
      offset: 195
    });

    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 100) {
        $('.fixed-top').addClass('menu-bg');
      } else {
        $('.fixed-top').removeClass('menu-bg');
      }
    });

  });

  /* Auto Close Responsive Navbar on Click
  ========================================================*/
  function close_toggle() {
    if ($(window).width() <= 768) {
      $('.navbar-collapse a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
      });
    }
    else {
      $('.navbar .navbar-inverse a').off('click');
    }
  }
  close_toggle();
  $(window).resize(close_toggle);

  /* Nivo Lightbox
  ========================================================*/
  $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });

}(jQuery));

// Set up the canvas
var canvas = document.getElementById("sig-canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#222222";
ctx.lineWidth = 5;

// Set up mouse events for drawing
var drawing = false;
var mousePos = { x: 0, y: 0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
  drawing = true;
  lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mouseup", function (e) {
  drawing = false;
}, false);
canvas.addEventListener("mousemove", function (e) {
  mousePos = getMousePos(canvas, e);
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimaitonFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Draw to the canvas
function renderCanvas() {
  if (drawing) {
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
  }
}

// Allow for animation
(function drawLoop() {
  requestAnimFrame(drawLoop);
  renderCanvas();
})();

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);


// function getAPI(img) {
//   var params = {
//     // Request parameters
//     "application": ""
//   };

//   $.ajax({
//     url: "https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/6fede207-de99-4fbe-8f04-44a2154495ad/classify/iterations/Iteration8/url",
//     beforeSend: function (xhrObj) {
//       // Request headers
//       xhrObj.setRequestHeader("Prediction-Key", "78a3f4d1ae95492680685c14da50480d");
//       xhrObj.setRequestHeader("Content-Type", "application/json");
//       xhrObj.setRequestHeader("Prediction-key", "78a3f4d1ae95492680685c14da50480d");
//     },
//     type: "POST",
//     processData: false,
//     // Request body
//     data: `{"Url": "${img}"}`,
//   })
//     .done(function (data) {
//       let healthyPercentage = data.predictions[0].probability;
//       let parkisonsPercentage = data.predictions[1].probability;
//       let div = document.getElementById('results');
//       div.innerHTML = "";
//       let para = document.createElement("p");
//       if (healthyPercentage <= parkisonsPercentage) {
//         para.innerHTML = "You're exhibiting symptoms of Parkison's";
//       } else {
//         para.innerHTML = "Our Model shows you're healthy ";
//       }
//       div.appendChild(para);
//     })
//     .fail(function () {
//       alert("error");
//     });
// };

function getAPIFile(img) {
  var params = {
    // Request parameters
    "application": ""
  };
  $('.loaderImage').show();
  $.ajax({
    url: "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.1/Prediction/c6ee0724-e2fc-446c-9dfd-f1cef6f40479/classify/iterations/Iteration4/image",
    beforeSend: function (xhrObj) {
      // Request headers
      xhrObj.setRequestHeader("Prediction-Key", "89884caaab6a49b08c7988717547d4f8");
      xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
    },
    type: "POST",
    // Request body
    processData: false,
    data: makeblob(img),
  })
    .done(function (data) {
      $('.loaderImage').hide();
      let parkisonsPercentage;
      let healthyPercentage;
      if (data.predictions[0].tagName === 'parkinson') {
        parkisonsPercentage = data.predictions[0].probability;
        healthyPercentage = data.predictions[1].probability;
      } else {
        healthyPercentage = data.predictions[0].probability;
        parkisonsPercentage = data.predictions[1].probability;
      }
      let div = document.getElementById('results');
      div.innerHTML = "";
      let para = document.createElement("p");
      let res = document.createElement('h4');
      res.innerHTML = 'Result: ';
      div.appendChild(res);
      if (healthyPercentage <= parkisonsPercentage) {
        para.innerHTML = `Your spiral is ${(parkisonsPercentage * 100).toFixed(1)}% similar to known Parkinson's spirals`;
      } else {
        para.innerHTML = `Your spiral is ${(healthyPercentage * 100).toFixed(1)}% similar to known healthy spirals`;
      }
      para.className = "resultText";
      div.appendChild(para);
    })
    .fail(function () {
      $('.loaderImage').hide();
      alert("error");
    });
};

function makeblob(dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

function download(){
  var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.getElementById('sig-canvas').toDataURL()
  link.click();
};
