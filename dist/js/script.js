// window.onload = function() {
//   // Gulirkan halaman ke bagian atas
//   window.scrollTo(0, 0);
// }

function toHome() {
  window.scrollTo(0, 0);
}

// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector('#to-top');

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
    toTop.classList.remove('hidden');
    toTop.classList.add('flex');
  } else {
    header.classList.remove('navbar-fixed');
    toTop.classList.remove('flex');
    toTop.classList.add('hidden');
  }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

// Klik di luar hamburger
window.addEventListener('click', function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
  }
});

// Darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');
// const employement = document.getElementById('employement');

darkToggle.addEventListener('click', function () {
  if (darkToggle.checked) {
    html.classList.add('dark');
    localStorage.theme = 'dark';
    // employement.style.backgroundImage = 'url(dist/img/dark-stars.jpg)';
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light';
    // employement.style.backgroundImage = 'url(dist/img/gifsky.gif)';
  }
});

// pindahkan posisi toggle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  darkToggle.checked = true;
  // employement.style.backgroundImage = 'url(dist/img/dark-stars.jpg)';
} else {
  darkToggle.checked = false;
  // employement.style.backgroundImage = 'url(dist/img/gifsky.gif)';
}

// carousel
function initializeCarousel(carouselId) {
  const carousel = document.querySelector(`#${carouselId}`);
  const carouselInner = carousel.querySelector('.carousel-inner');
  const prevButton = carousel.querySelector('.carousel-control.prev');
  const nextButton = carousel.querySelector('.carousel-control.next');
  const items = carousel.querySelectorAll('.carousel-item');
  const itemWidth = items[0].clientWidth;
  let currentIndex = 0;

  function moveToSlide(index) {
    carouselInner.style.transform = `translateX(-${index * itemWidth}px)`;
    currentIndex = index;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else {
      moveToSlide(items.length - 1);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
      moveToSlide(currentIndex + 1);
    } else {
      moveToSlide(0);
    }
  });

  // Auto slide (optional)
  setInterval(() => {
    if (currentIndex === items.length - 1) {
      moveToSlide(0);
    } else {
      moveToSlide(currentIndex + 1);
    }
  }, 5000);
}
initializeCarousel('carousel-1');
initializeCarousel('carousel-2');
initializeCarousel('carousel-5');

document.addEventListener('DOMContentLoaded', init);
function init() {
  let textElement = document.querySelector('.txt-type');
  let words = JSON.parse(textElement.getAttribute('data-words'));
  let wait = parseInt(textElement.getAttribute('data-wait'));
  let txt = '';
  let wordIndex = 0;
  let isDeleting = false;
  function type() {
    const current = wordIndex % words.length;
    const fullTxt = words[current];
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }
    textElement.innerHTML = `${txt}`;
    let typeSpeed = 500;
    if (isDeleting) {
      typeSpeed /= 2;
    }
    if (!isDeleting && txt === fullTxt) {
      typeSpeed = wait;
      isDeleting = true;
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => type(), typeSpeed);
  }
  type();
}

//Paralax
(function ($) {
  "use strict";
  function scrollBanner() {
    $(document).on("scroll", function () {
      let scrollPos = $(this).scrollTop();
      let opacity = 1 - scrollPos / 550;
      $(".parallax-fade-top").css({
        top: scrollPos / 2 + "px",
        opacity: opacity,
        'z-index': 5,
        'position': 'relative'
      });
    });
  }
  scrollBanner();
})(jQuery);

AOS.init();
