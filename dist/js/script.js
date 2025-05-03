// window.onload = function() {
//   // Gulirkan halaman ke bagian atas
//   window.scrollTo(0, 0);
// }

window.open("dist/doc/CV%20Muhamad%20Fadiel%20Ikchsan.pdf", "_blank");

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
  if (!carousel) return; // Jika carousel tidak ditemukan, hentikan fungsi.

  const carouselInner = carousel.querySelector('.carousel-inner');
  const prevButton = carousel.querySelector('.carousel-control.prev');
  const nextButton = carousel.querySelector('.carousel-control.next');
  const items = carousel.querySelectorAll('.carousel-item');

  if (!carouselInner || !prevButton || !nextButton || items.length === 0) return;

  let currentIndex = 0;
  let itemWidth = items[0].clientWidth;

  // Fungsi untuk memperbarui ukuran item saat layar berubah
  function updateItemWidth() {
    itemWidth = items[0].clientWidth;
    moveToSlide(currentIndex, false); // Pastikan posisi tetap setelah resize
  }

  // Fungsi untuk memindahkan carousel ke slide tertentu
  function moveToSlide(index, smooth = true) {
    carouselInner.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
    carouselInner.style.transform = `translateX(-${index * itemWidth}px)`;
    currentIndex = index;
  }

  // Event Listener untuk tombol prev
  prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  });

  // Event Listener untuk tombol next
  nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  });

  // Auto slide setiap 5 detik
  let autoSlideInterval = setInterval(() => {
    moveToSlide(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  }, 5000);

  // Hentikan auto slide saat hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      moveToSlide(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
    }, 5000);
  });

  // Menyesuaikan ukuran item saat jendela di-resize
  window.addEventListener('resize', updateItemWidth);

  // Inisialisasi pertama setelah sedikit delay untuk memastikan semua elemen ter-load
  setTimeout(() => {
    updateItemWidth();
    moveToSlide(0, false);
  }, 300);
}

// Pastikan carousel diinisialisasi setelah halaman sepenuhnya dimuat
window.addEventListener('load', function () {
  initializeCarousel('carousel-1');
  initializeCarousel('carousel-2');
  initializeCarousel('carousel-3');
  initializeCarousel('carousel-4');
  initializeCarousel('carousel-5');
  initializeCarousel('carousel-6');
  initializeCarousel('carousel-7');
  initializeCarousel('carousel-8');
  initializeCarousel('carousel-9');
  initializeCarousel('carousel-10');
});


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
