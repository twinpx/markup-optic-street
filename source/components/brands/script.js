window.addEventListener('load', () => {
  document.querySelectorAll('.b-brands').forEach((brands) => {
    //swiper gallery
    var slidesPerView = brands.getAttribute('data-slidesperview') || 6,
      spaceBetween = brands.getAttribute('data-spacebetween') || 30;

    if (window.matchMedia('(max-width: 400px)').matches) {
      slidesPerView = 1;
      spaceBetween = 10;
    } else if (window.matchMedia('(max-width: 700px)').matches) {
      slidesPerView = 2;
      spaceBetween = 10;
    }

    //swiper init
    new Swiper(document.querySelector('.b-brands .swiper-container'), {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      on: {
        init: function () {
          brands.classList.add('i-swiper-init');
        },
      },
    });
  });
});
