window.onload = function () {
  //swiper gallery
  const swiper = new Swiper('#storiesGallery', {
    slidesPerView: 3.5,
    spaceBetween: 30,
    freeMode: true,
    centeredSlides: true,
  });

  //set and remember preview item as visited
  document.querySelectorAll('.b-stories__preview__item').forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      if (item.className.search('i-visited') !== -1) return;

      //add class
      item.classList.add('i-visited');

      //rememver in localStorage
      let storiesPreviewVisited =
        JSON.parse(window.localStorage.getItem('stories-preview-visited')) ||
        {};

      storiesPreviewVisited[String(item.getAttribute('data-id'))] = true;

      window.localStorage.setItem(
        'stories-preview-visited',
        JSON.stringify(storiesPreviewVisited)
      );
    });
  });

  //mark visited preview
  let storiesPreviewVisited = JSON.parse(
    window.localStorage.getItem('stories-preview-visited')
  );
  if (storiesPreviewVisited) {
    document.querySelectorAll('.b-stories__preview__item').forEach((item) => {
      if (
        storiesPreviewVisited[String(item.getAttribute('data-id'))] === true
      ) {
        item.classList.add('i-visited');
      }
    });
  }
};
