(function ($) {
  'use strict';

  $(function () {
    document
      .querySelectorAll('.b-catalog-colors')
      .forEach(function (colorsBlock) {
        if (window.matchMedia('(max-width: 767px)').matches) {
          //gallery
          new Swiper(
            colorsBlock.querySelector('.b-catalog-colors__container'),
            {
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
            }
          );
        } else {
          //button
          colorsBlock
            .querySelector('.b-catalog-colors__button .btn')
            .addEventListener('click', function (e) {
              e.preventDefault();
              const container = colorsBlock.querySelector(
                '.b-catalog-colors__container'
              );
              colorsBlock.classList.toggle('open');
            });
        }
      });
  });
})(jQuery);
