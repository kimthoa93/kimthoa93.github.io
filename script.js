


var radius = 240;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = 120; 
var imgHeight = 170;


var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true;



setTimeout(init, 100);

var obox = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid];
var video = document.getElementById("myVideo");

ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";


var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {

  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;


if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}


// if (bgMusicURL) {
//   document.getElementById('music-container').innerHTML += `
// <audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
// <p>If you are reading this, it is because your browser does not support the audio element.</p>
// </audio>
// `;
// }

function showLightbox(imageSrc, effect) {
  var lightboxContainer = document.querySelector(".lightbox-container");
  var lightboxImage = document.querySelector(".lightbox-image");

  lightboxImage.src = imageSrc;
  lightboxContainer.style.display = "flex";
  setTimeout(function() {
    lightboxContainer.classList.add("show", effect);
  }, 100);
}

function hideLightbox() {
  var lightboxContainer = document.querySelector(".lightbox-container");
  lightboxContainer.classList.remove("show");
  setTimeout(function() {
    lightboxContainer.style.display = "none";
    lightboxContainer.removeAttribute("class");
    lightboxContainer.classList.add("lightbox-container");
  }, 300);
}

document.addEventListener("DOMContentLoaded", function() {
  var lightboxContainer = document.querySelector(".lightbox-container");

  lightboxContainer.addEventListener("click", hideLightbox);
});

document.addEventListener("DOMContentLoaded", function() {
  var lightboxContainer = document.querySelector(".lightbox-container");

  lightboxContainer.addEventListener("click", hideLightbox);
});
document.onpointerdown = function (e) {
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  clearInterval(obox.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(obox);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    obox.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(obox);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(obox.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
(function() {
  $('.btn').click(function() {
   
    
    $(this).toggleClass('active');
    if ($('.btn').hasClass("active"))
          $('.profile').animate({"left":"45%"},"slow");
        else
        $('.profile').animate({"left":"55%"},"slow");
    return $('.box').toggleClass('open');
   
  });

}).call(this);