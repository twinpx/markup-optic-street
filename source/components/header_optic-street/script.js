(function ($) {
  'use strict';

  $(function () {
    //gallery
    document
      .querySelectorAll('.bj-page-header__sub-menu__gallery')
      .forEach((galleryBlock) => {
        const container = galleryBlock.querySelector('.swiper-container');
        if (container) {
          new Swiper(container, {
            slidesPerView: 1,
            loop: true,
            pagination: {
              el: '.swiper-pagination',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        }
      });

    //header search
    $('.bj-search-icon').click(function () {
      $('.bj-page-header').addClass('i-search');
      setTimeout(function () {
        $('.bj-page-header').addClass('i-ready');
        $('.bj-page-header__search__input').focus();
      }, 100);
    });

    $('.bj-page-header__search-close').click(function (e) {
      e.preventDefault();
      $('.bj-page-header').removeClass('i-ready');
      setTimeout(function () {
        $('.bj-page-header').removeClass('i-search');
      }, 300);
    });

    //menu sandwich
    document
      .querySelector('.ob-menu-sandwich')
      .addEventListener('click', function (e) {
        e.preventDefault();
        $('.ob-catalog-menu__block').slideToggle();
        $('.ob-catalog-menu-sub:visible').slideUp();
        document
          .querySelectorAll('.ob-catalog-menu__item.active')
          .forEach(function (item) {
            item.classList.remove('active');
          });
      });

    $('#nav-button').click(function (e) {
      //desktop
      e.preventDefault();
      $('.bj-page-header__sub').slideToggle();
    });

    //header dropdown
    const headerOS = document.querySelector('#headerOS');
    let overTimeoutId;
    document
      .querySelectorAll('.bj-page-header__sub-item.i-menu')
      .forEach(function (item) {
        item.addEventListener('mouseenter', function (e) {
          //hide sidenav
          $('.ob-catalog-menu__block').slideUp();

          //hide cart dropdown
          if (window.cartDropdownFlag) {
            window.cartDropdownFlag = false;
            setTimeout(function () {
              if (!window.cartDropdownFlag) {
                $('.bj-page-header__cart-dropdown article')
                  .slideUp()
                  .removeClass('i-animate');
                $('#cartDropdown').removeClass('i-loaded');
              }
            }, 100);
          }

          //open sub menu
          const subMenu = item.querySelector('.bj-page-header__sub-menu');

          subMenu.classList.add('i-show');
          headerOS.classList.add('i-show-submenu');
          setTimeout(function () {
            subMenu.classList.add('i-visible');
          }, 100);
          clearTimeout(overTimeoutId);
          overTimeoutId = setTimeout(function () {
            headerOS.classList.add('i-visible-submenu');
          }, 100);
        });
        item.addEventListener('mouseleave', function (e) {
          const subMenu = item.querySelector('.bj-page-header__sub-menu');
          subMenu.classList.remove('i-visible');
          headerOS.classList.remove('i-visible-submenu');
          setTimeout(function () {
            subMenu.classList.remove('i-show');
          }, 300);
          clearTimeout(overTimeoutId);
          overTimeoutId = setTimeout(function () {
            headerOS.classList.remove('i-show-submenu');
          }, 300);
        });
      });

    $('.bj-page-header__dropdown article').click(function (e) {
      e.stopPropagation();
    });
    $('.bj-page-header__dropdown .up').click(function (e) {
      $(this).closest('article').slideUp().removeClass('i-animate');
      e.preventDefault();
    });

    //user dropdown
    $('.bj-personal-icon').click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      $('.ob-catalog-menu__block').slideUp();
      $('.bj-page-header__user-dropdown article')
        .slideToggle()
        .toggleClass('i-animate');

      if (window.cartDropdownFlag) {
        window.cartDropdownFlag = false;
        setTimeout(function () {
          if (!window.cartDropdownFlag) {
            $('.bj-page-header__cart-dropdown article')
              .slideUp()
              .removeClass('i-animate');
            $('#cartDropdown').removeClass('i-loaded');
          }
        }, 100);
      }
    });

    //header cart-dropdown
    if (!$('html').hasClass('bx-touch')) {
      //desktop

      $('.bj-cart-icon').click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (!window.cartDropdownFlag) {
          window.cartDropdownFlag = true;

          $('.ob-catalog-menu__block').slideUp();
          $('.bj-page-header__user-dropdown article')
            .slideUp()
            .removeClass('i-animate');

          $('.bj-page-header__cart-dropdown article').slideDown();
          setTimeout(function () {
            $('.bj-page-header__cart-dropdown article').addClass('i-animate');
          }, 100);

          //ajax
          $.ajax({
            url: $('#cartDropdown').data('url'),
            type: $('#cartDropdown').data('method'),
            dataType: 'html',
            success: function (html) {
              if (html) {
                $('#cartDropdown .container-fluid').html(html);
                setTimeout(function () {
                  $('#cartDropdown').addClass('i-loaded');
                }, 100);
              }
            },
            error: function (a, b, c) {
              if (window.console) {
                console.log(a);
                console.log(b);
                console.log(c);
              }
            },
          });
        } else {
          window.cartDropdownFlag = false;
          setTimeout(function () {
            if (!window.cartDropdownFlag) {
              $('.bj-page-header__cart-dropdown article')
                .slideUp()
                .removeClass('i-animate');
            }
          }, 100);
          setTimeout(function () {
            if (!window.cartDropdownFlag) {
              $('#cartDropdown').removeClass('i-loaded');
            }
          }, 500);
        }
      });
    } else {
      $('.bj-cart-icon').click(function (e) {
        e.stopPropagation();
      });
    }

    $(document).bind('click', function (e) {
      $('.bj-page-header__dropdown article').slideUp().removeClass('i-animate');
      $('.bj-page-header__user-dropdown article')
        .slideUp()
        .removeClass('i-animate');

      if (
        window.cartDropdownFlag &&
        !$(e.target).closest('#cartDropdown').length
      ) {
        window.cartDropdownFlag = false;
        setTimeout(function () {
          if (!window.cartDropdownFlag) {
            $('.bj-page-header__cart-dropdown article')
              .slideUp()
              .removeClass('i-animate');
            $('#cartDropdown').removeClass('i-loaded');
          }
        }, 100);
      }
    });

    //Search close
    document
      .getElementById('title-search-input')
      .addEventListener('keyup', function () {
        if (document.getElementById('title-search-input').value !== '') {
          document
            .querySelector('.bj-page-header')
            .classList.add('i-search-input-filled');
        } else {
          document
            .querySelector('.bj-page-header')
            .classList.remove('i-search-input-filled');
        }
      });

    $('.bj-page-header__search-close').click(function (e) {
      e.preventDefault();
      document.getElementById('title-search-input').value = '';
      document
        .querySelector('.bj-page-header')
        .classList.remove('i-search-input-filled');
      document.getElementById('title-search-input').focus();
    });

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);

window.addEventListener('load', fetchMobileMenu);
window.addEventListener('resize', fetchMobileMenu);
window.fetchMobileMenuFlag;

function fetchMobileMenu() {
  if (
    window.matchMedia('(max-width: 1024px)').matches &&
    !window.fetchMobileMenuFlag
  ) {
    window.fetchMobileMenuFlag = true;
    (async function () {
      try {
        var response = await fetch(menuAjaxPath);
        var result = await response.text();
        var obCatalogMenuTitleElem = document.querySelector(
          '#OBCatalogMenu .ob-catalog-menu__title'
        );
        var mobileMenu = document.createElement('div');
        mobileMenu.innerHTML = result;

        if (obCatalogMenuTitleElem) {
          obCatalogMenuTitleElem.after(mobileMenu);
          //events
          mobileMenu
            .querySelectorAll('.ob-catalog-menu__link')
            .forEach(function (elem) {
              elem.addEventListener('click', function (e) {
                if (elem.classList.contains('i-link')) {
                  return;
                }
                e.preventDefault();

                if (
                  !elem
                    .closest('.ob-catalog-menu__item')
                    .classList.contains('active')
                ) {
                  //slide up
                  mobileMenu
                    .querySelectorAll('.ob-catalog-menu__item.active')
                    .forEach(function (menuItem) {
                      menuItem.classList.remove('active');
                    });
                  $('.ob-catalog-menu-sub:visible').slideUp();
                }

                //show current
                elem
                  .closest('.ob-catalog-menu__item')
                  .classList.toggle('active');
                $(
                  elem.parentNode.querySelector('.ob-catalog-menu-sub')
                ).slideToggle();
              });
            });
        }
      } catch (err) {
        throw err;
      }
    })();
  }
}
