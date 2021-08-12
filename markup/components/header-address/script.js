setTimeout(() => {
  //show address
  document.querySelector('.bj-header-address').style.display = 'inline-block';

  //opacity
  document.querySelector('.bj-header-address').style.opacity = 1;

  //events
  document
    .querySelector('.bj-header-address__title')
    .addEventListener('click', (e) => {
      e.target.parentNode
        .querySelector('.bj-header-address__dropdown')
        .classList.toggle('dropdown--show');
      //Yandex Metrika
      if (ym && ymID) {
        ym(ymID, 'reachGoal', 'click_address');
      }
    });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.bj-header-address')) {
      document
        .querySelector('.bj-header-address__dropdown')
        .classList.remove('dropdown--show');
    }
  });
}, 500);

if (document.querySelector('.bj-header-address__dropdown')) {
  document.querySelector('.bj-header-address__title').classList.add('dashed');
}
