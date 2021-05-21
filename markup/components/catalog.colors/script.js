(function ($) {
  'use strict';

  $(function () {
    document.querySelectorAll('.b-catalog-colors').forEach(function () {});

    if (window.matchMedia('(max-width: 767px)').matches) {
      new Swiper('.b-catalog-colors__container', {
        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: true,
        breakpoints: {
          // when window width is >= 400px
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    } else {
    }
  });
})(jQuery);
