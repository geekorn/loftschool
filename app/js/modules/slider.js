var Slider = (function () {
  var index = 0,
    duration = 500;

  function _init() {
    // var activeItem = items.eq(index);

    console.log('смещаем');
    _moveNext();
    // сразу запустить функцию move

  }

  function _moveNext() {
    var items = $('.work-slider__item', '.work-slider__list_next');

    if (index >= items.length) {
      index = 0;
    } else if (index < 0) {
      index = items.length;
    }

    var activeItem = items.eq(index),
      currentItem = activeItem.next(),
      reqItem = currentItem.next();

    if (reqItem === undefined) reqItem = items.first();


    console.log(index);
    console.log(activeItem);
    console.log(currentItem);
    console.log(reqItem);

    currentItem.animate({
      'top': 100 + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      activeItem.removeClass('work-slider__item_active').css('top', -100 + '%');
      currentItem.addClass('work-slider__item_active');
    })


  }

  function _movePrev() {
    var ndx = index - 1,
      currentItem = items.eq(ndx),
      reqItem = currentItem.prev();


  }

  function _moveSlide(container, direction, ndx) {
    var items = $('.work-slider__item', container),
      activeItem = items.filter('.work-slider__item_active'),
      currentItem = items(ndx),
      reqItem,
      direction = direction === 'up' ? -100 : 100;

    // var ndx = direction === 'up' ? index + 1 : index - 1;

    // console.log(ndx);

    // if (index >= items.length) {
    //   index = 0;
    // } else if (index < 0) {
    //   index = items.length - 1;
    // }

    reqItem = items.eq(index);

    activeItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      activeItem.removeClass('work-slider__item_active').css('top', -direction + '%');
      currentItem.addClass('work-slider__item_active');
    })

  }

  return {
    init: _init,
    move: function () {

      $('.toggle__link').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('toggle__link_next')) {
          index++;
        } else if ($(this).hasClass('toggle__link_prev')) {
          index--;
        }


        _moveNext();
        // _moveSlide($('.work-slider__list_next'), 'up');
        // _moveSlide($('.work-slider__list_prev'), 'down');

      })

    }
    // next:
  }
})();


/*
 1- найти слайдер
 2- разделить его на элементы
 3- выделить отдельные элементы(текст, картинку)
 4- при клике вперед
 1- взять картинки из следующего и предыдущего эл-тов
 2- подставить их в кнопки
 3- текущую картинку подставить в основное окно
 4- поменять текст
 */