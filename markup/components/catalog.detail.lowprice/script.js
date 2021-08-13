(function ($) {
  'use strict';

  $(function () {
    //low price link
    $('#lowPrice')
      .on('show.bs.modal', function (e) {
        //blur the page
        $(this).appendTo('body');
        document.querySelector('html').classList.add('i-blur');

        var $link = $(e.relatedTarget);

        $.ajax({
          url: $link.data('ajax-url'),
          type: 'GET',
          dataType: 'html',
          data: 'id=' + $('.b-catalog-detail').attr('data-id'),
          success: function (data) {
            if (data) {
              $('#lowPrice form').remove();
              $('#lowPrice .modal-header').after(data);
            }
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'goal_lowprice_begin');
            }
          },
          error: function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
          },
        });
      })
      .on('hide.bs.modal', function () {
        //focus the page
        document.querySelector('html').classList.remove('i-blur');
      });

    $('#lowPrice').delegate('form', 'submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      var $body = $('#lowPrice .modal-body');

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        dataType: 'json',
        data: $form.serialize(),
        success: function (data) {
          if (data && data.MESSAGE) {
            $body.height($body.height());
            $body
              .empty()
              .append('<p class="text-center">' + data.MESSAGE + '</p>');
            $body.height($body.find('p').height());

            $('#lowPrice .modal-footer .btn').hide();
            $('#lowPrice .modal-footer .i-gray').show();
            //ecommerce event trigger
            //Yandex Metrika
            if (ym && ymID) {
              ym(ymID, 'reachGoal', 'goal_lowprice_success'); //Покупка в 1 клик успешно завершена
            }
          }
        },
        error: function (a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
        },
      });
    });
  });
})(jQuery);
