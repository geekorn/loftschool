var Slider = (function () {
  var items = $('.slider__item'),
    activeItem,
    index = 0,
    ndx,
    nextSlide,
    duration = 500;

  function _init() {
    activeItem = items.eq(index);
    _moveNext();
    _movePrev();
  }

  function _slideShow() {
    var activeItem = items.filter('.slider__item_active'),
      reqItem = items.eq(index);

    _moveNext();
    _movePrev();

    activeItem.removeClass('slider__item_active');
    reqItem.addClass('slider__item_active');
  }


  function _moveNext() {
    if (index == items.length - 1) {
      ndx = 0;
    } else if (index < 0) {
      ndx = items.length - 1;
    } else {
      ndx = index + 1;
    }

    // console.log(nextSlide);
  var currentItem = items.eq(ndx),
    currentImg = currentItem.find('.work__pic').attr("src"),
    nextImg = currentItem.find('.work__pic').attr("src"),
    imgContainer = $('.btn-slider__img_current'),
    nextContainer = $('.btn-slider__img_next');

    imgContainer.attr('src', currentImg);
}

function _movePrev() {
  if (index == items.length) {
    ndx = 0;
  } else if (index < 0) {
    ndx = items.length - 1;
  } else {
    ndx = index - 1;
  }

  var currentItem = items.eq(ndx),
    currentImg = currentItem.find('.work__pic').attr("src"),
    imgContainer = $('.work-slider__img_prev');

  imgContainer.attr('src', currentImg);
}

// function _moveSlide(container, direction, ndx) {
//   var items = $('.work-slider__item', container),
//     activeItem = items.filter('.work-slider__item_active'),
//     currentItem = items(ndx),
//     reqItem,
//     direction = direction === 'up' ? -100 : 100;
//
//   reqItem = items.eq(index);
//
//   activeItem.animate({
//     'top': direction + '%'
//   }, duration);
//
//   reqItem.animate({
//     'top': 0
//   }, duration, function () {
//     activeItem.removeClass('work-slider__item_active').css('top', -direction + '%');
//     currentItem.addClass('work-slider__item_active');
//   })
//
// }


return {
  init: _init,
  move: function () {

    $('.toggle__link').on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('toggle__link_next')) {
        index++;
        nextSlide = ndx + 1;
      } else if ($(this).hasClass('toggle__link_prev')) {
        index--;
        nextSlide = ndx - 1;
      }

      if (index >= items.length) {
        index = 0;
      } else if (index < 0) {
        index = items.length - 1;
      }

      _slideShow();

    })

  }
}
})
();

