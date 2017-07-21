var BlogMenu = (function () {
  var sidebar = document.querySelector('.sidebar');

  function _fixMenu() {
    var nav = document.querySelector('.blog-menu'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (window.innerWidth >= 780) {
      if (navCoords <= -50) {
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.width = '20%';
      } else {
        nav.style.position = 'static';
        nav.style.width = 'auto';
      }
    } else {
      nav.style.position = 'absolute';
      nav.style.top = '';
      nav.style.width = 'auto';
    }

  }

  function _initActive () {
    var posts = document.querySelectorAll('.post__title'),
      postLinks = document.querySelectorAll('.blog-menu__link'),
      activeLink = document.getElementsByClassName('blog-menu__link_active');


    for (var i = 0; i < posts.length; i++) {
      var post = posts[i],
        postTop = post.getBoundingClientRect().top;

      if (postTop <= 100) {
        activeLink[0].classList.remove('blog-menu__link_active');
        postLinks[i].classList.add('blog-menu__link_active');
      }
    }
  }

  var _openMenu = function () {
    sidebar.classList.add('sidebar_open');
  };
  var _closeMenu = function () {
    sidebar.classList.remove('sidebar_open');
  };

  return {
    init: _fixMenu,
    initActive: _initActive,
    toggle: function () {
      if (!sidebar.classList.contains('sidebar_open')) {
        _openMenu();
      }
      else {
        _closeMenu();
      }
    }
  }
})();
// BLUR EFFECT
var Blur = (function () {
  var section = document.querySelector('.feedback'),
    blurWrapper = document.querySelector('.feedback-form'),
    blur = document.querySelector('.feedback-form__blur');

  return {
    set: function () {
      var imgWidth = document.querySelector('.feedback__bg').offsetWidth,
        img = document.querySelector('.feedback__bg'),
        imgCoords = img.getBoundingClientRect(),
        sectionCoords = section.getBoundingClientRect(),
        blurCoords = blurWrapper.getBoundingClientRect(),
        posLeft = -blurWrapper.offsetLeft,
        posTop = img.offsetTop - blurWrapper.offsetTop,
        blurCSS = blur.style;

      blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
      blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
    }
  }
})();
// index flip
var Flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  var _auth = function () {
    flipper.style.transform = 'rotateY(180deg)';
    btn.style.display = 'none';
  };

  var _welcome = function () {
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.display = 'block';
  };

  return {
    auth: _auth,
    welcome: _welcome
  }

})();
var Validation = (function () {
  var errorField = document.querySelector('.input-error-msg'),
    captchaError = document.querySelector('.welcome__error'),
    formContainer = document.querySelector('.form__container');

  var _init = function (form) {
    var elems = form.elements;

    console.log(elems);
    return _validate(elems) ? true : false;
  };

  function _validate(inputs) {

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].tagName === 'BUTTON') continue;

      var elem = inputs[i];

      if (elem.value == '') {
        console.log(elem);
        return _showError(elem)
      }

      if (elem.type === 'checkbox' || elem.type === 'radio') {

        if (elem.checked && elem.value === 'yes') {
          return true;
        }
        if (!elem.checked) {
          captchaError.style.display = 'flex';
        }
      }
    }

    return true;

  };

  function _showError(elem) {
    var text = elem.getAttribute('placeholder').toLowerCase();
    var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

    elem.parentNode.classList.add('input-group_error');
    errorField.style.display = 'block';
    errorField.innerText = 'Вы не ввели ' + text;

    // if (position > formContainer.offsetHeight)
    errorField.style.top = position + 'px';
  }

  function _clearError(elem) {
    console.log(elem);
    elem.parentNode.classList.remove('input-group_error');
    errorField.style.display = 'none';
  }


  return {
    init: _init,
    clear: _clearError
  }
})();
function initMap () {
  var pointer = new google.maps.LatLng(55.787069, 37.478220),
    center = new google.maps.LatLng(55.786273, 37.418623);

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#96d7c8"},{"visibility":"on"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapSettings = {
    center: center,
    scrollwheel: false,
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map'), mapSettings);

  var marker = new google.maps.Marker({
    icon: 'assets/img/decor/map_marker.png',
    position: pointer,
    map: map,
    title: "I'm here!",
    animation: google.maps.Animation.BOUNCE
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
};

var Menu = (function () {
  var menu = document.querySelector('.main-navigation'),
    burgerMenu = document.querySelector('.hamburger-btn');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('hamburger-btn_closed');
      menu.classList.toggle('main-navigation_disabled');

      document.body.style.overflow = (!menu.classList.contains('main-navigation_disabled')) ? 'hidden' : 'auto';
    }
  }
})();
//index paralax
var MainParalax = (function () {

  var _show = function () {

    var paralaxContainer = document.querySelector('#paralax'),
      layers = paralaxContainer.children;

    window.addEventListener('mousemove', function (e) {

      var pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY;

      [].slice.call(layers).forEach(function (layer, i) {
        var layerStyle = layer.style,
          divider = i / 40,
          bottomPosition = (window.innerHeight / 2) * divider,
          horizontalPosition = (window.innerWidth / 2) * divider,
          positionX = initialX * divider,
          positionY = initialY * divider,
          transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

        layerStyle.transform = transformString;
        layerStyle.webkitTransform = transformString;
        layerStyle.bottom = '-' + bottomPosition + 'px';
        layerStyle.left = '-' + horizontalPosition + 'px';
        layerStyle.right = '-' + horizontalPosition + 'px';
      })

    });
  };

  var _disabled = function () {
    //для планшетов и телефонов подставить просто картинку, а не грузить весь паралакс
  };

  return {
    init: _show
  };

})();
// var Slider = new function () {
//     var items,
//         index,
//         initialIndex = 1,
//         ndx,
//         duration = 500,
//         toggle = document.querySelector('.work-slider');
//
//     function init(data) {
//         var activeSlide = {
//             index: initialIndex,
//             title: document.querySelector('.work__title'),
//             technology: document.querySelector('.work__technology'),
//             img: document.querySelector('.work__pic'),
//             next: document.querySelector('.work-slider__list_next'),
//             prev: document.querySelector('.work-slider__list_prev')
//
//         };
//
//         items = data;
//
//         // отрисовка основного слайда
//         changeSlide(activeSlide);
//
//         // подготовка слайдов-переключателей
//         activeSlide.next.appendChild(createSlides(items, activeSlide.index + 1));
//         activeSlide.prev.appendChild(createSlides(items, activeSlide.index - 1));
//
//         // слушаем событие по нажатию на слайды
//         toggle.addEventListener('click', function(e) {
//             e.preventDefault();
//             slideShow(e.target);
//         })
//     }
//
//     function createSlides(items, active) {
//         var list = document.createDocumentFragment();
//
//         items.forEach(function (item, i) {
//             var span = document.createElement('LI');
//             var img = new Image();
//
//             (i === active) && span.classList.add('work-slider__item_current');
//             span.classList.add('work-slider__item');
//             span.dataset.title = item.name;
//             span.dataset.technology = item.technology;
//             span.dataset.link = item.link;
//             img.src = item.img;
//             img.classList.add('work-slider__img');
//
//             span.appendChild(img);
//             list.appendChild(span);
//         });
//
//         return list;
//     }
//
//     function slideShow (target) {
//         if (target.contains(next)) {
//             index++;
//         } else if (target.contains(prev)) {
//             index--;
//         }
//
//         if (index > items.length - 1) {
//             index = 0;
//         } else if (index < 0) {
//             index = items.length - 1;
//         }
//       // moveSlide(next);
//       // moveSlide(prev);
//         console.log(index)
//       changeSlide(index);
//     }
//
//     function moveSlide() {
//
//     }
//
//     function changeSlide(activeItem) {
//         console.log(activeItem)
//         activeItem.title.innerHTML = items[activeItem.index].name;
//         activeItem.technology.innerHTML = items[activeItem.index].technology.join(', ');
//         activeItem.img.src = items[activeItem.index].img;
//     }
//
//
//     this.init = init;
// };
var Preloader = (function () {
  var loader = document.querySelector('.preloader'),
    wrapper = document.querySelector('.index-wrapper'),
    images = document.querySelectorAll('img'),
    flipCard = document.querySelector('.flipper'),
    procentField = document.querySelector('.preloader__percent'),
    percent = 0,
    percentStep = 100 / (images.length + 0.4);

  function _loadImage(img) {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        percent = Math.ceil(percent + percentStep);
        console.log(percent, percentStep);
        procentField.innerHTML = percent + '%';
        resolve(img);
      };
      img.onerror = function () {
        reject(img);
      }
    });
  }

  function _showLoader(imgList) {
    var promiseImg = imgList.map(_loadImage);

    Promise.all(promiseImg)
      .then(function (value) {
        wrapper.style.display = 'block';

        percent = 100;
        procentField.innerHTML = percent + '%';
        setTimeout(function () {
          loader.style.opacity = '0';
          // loader.parentNode.removeChild(loader);
          loader.style.display = 'none';
        }, 1500)
      })
      .then(function () {
        setTimeout(function () {
          flipCard.style.transform = 'rotate3d(1,0,0, 0deg)';
        }, 1500)
      })
  };

function _closeLoader() {
  var imgArr = Array.prototype.slice.call(images);

  _showLoader(imgArr);
};


return {
  init: _closeLoader
}

})
();


/*
 1 - загрузить сам прелоадер
 2 - взять все картинки на странице
 3 - по мере загрузки картинок менять проценты
 4 - после загрузки всех картинок убрать прелоадер
 */
var ScrollPage = (function () {

  return {
    down: function (elem) {
      var section = elem.parentNode.nextSibling.nextSibling,
        posTop = section.offsetTop;

      $('body,html').animate({scrollTop: posTop}, 1500);
    },

    up: function () {
      $('body,html').animate({scrollTop: 0}, 1200);
    }
  }
})();

//
// var scrollPage = (function () {
//   var speed = 1,
//     currentPosition,
//     distPosition;
//
//   speed = (currentPosition - distPosition) / 1000;
//
//   return {
//     downTo: function (element) {
//     var distPosition = element.offsetTop;
//
//     setInterval(function () {
//
//       window.scrollTo(0, distPosition);
//
//       if (top > 1000) {
//         clearInterval(scr);
//       }
//     }, 15);
//
//     }
//   }
// })();
// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var HeaderParallax = (function () {
  var bg = document.querySelector('.header__bg'),
    portfolio = document.querySelector('.header__portfolio'),
    user = document.querySelector('.header__user');

  var _move = function (block, windowScroll, strafeAmount) {
    var strafe = windowScroll / -strafeAmount + '%',
      transformString = 'translate3d(0, ' + strafe + ', 0)',
      style = block.style;

    if (windowScroll < window.innerHeight) {
      style.transform = transformString;
      style.webkitTransform = transformString;
    }
  };

  return {

    init: function (wScroll) {
      _move(bg, wScroll, 45);
      if (portfolio !== null) {
        _move(portfolio, wScroll, 20);
      };
      _move(user, wScroll, 3);
    }

  }

})();
// АНИМАЦИЯ ИКОНОК СКИЛОВ
var Skills = (function () {
  var skills = document.querySelectorAll('.skill'),
    circles = document.querySelectorAll('.circle-second'),
    windowHeight = window.innerHeight;

  // вычисляем длину окружности
  var circleLength = function (circle) {
    var circleRadius = circle.getAttribute('r'),
      circleLength = 2 * Math.PI * circleRadius;

    return circleLength;
  };

  // применяем к окружности свойства по умолчанию
  [].slice.call(circles).forEach(function (circle) {

    circle.style.strokeDashoffset = circleLength(circle);
    circle.style.strokeDasharray = circleLength(circle);

  });

  // функция анимирования окружности в зависимости от процентов
  var circleAnimation = function (skill) {

    var circleFill = skill.querySelector('.circle-second'),
      skillPercent = skill.getAttribute('data-percent'),
      length = circleLength(circleFill),
      percent = length * (100 - skillPercent) / 100;

    setTimeout(function () {
      circleFill.style.strokeDashoffset = percent;
      circleFill.style.transition = 'all 1s';

      if (skillPercent < 50) {
        skill.style.opacity = 0.4;
        skill.style.transition = 'all 1s';
      }
    }, 500);

  };

  return {
    grow: function () {

      [].slice.call(skills).forEach(function (skill) {

        var circleRect = skill.getBoundingClientRect(),
          circlePos = circleRect.bottom,
          startAnimation = circlePos - windowHeight;

        if (startAnimation <= 0) {
          circleAnimation(skill);
        }

      });
    }
  }

})();
var Slider = (function () {
    var items,
        index = 1,
        ndx,
        duration = 500,
        title = $('.work__title'),
        skills = $('.work__technology'),
        imgContainer = $('.work__pic'),
        link = $('.work__link');

    function _init(data) {
        items = data;

        var activeItem = items.eq(index),
            imgSrc = activeItem.find('img').attr('src'),
            activeTitle = activeItem.data('title'),
            activeSlill = activeItem.data('technology'),
            activeLink = activeItem.data('link');


        console.log(items)

        imgContainer.attr('src', imgSrc);
        title.text(activeTitle);
        skills.text(activeSlill);
        link.attr('href', activeLink);

        var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
        nextItem.addClass('work-slider__item_current');
        var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
        prevItem.addClass('work-slider__item_current');
    }

    function animateSlide(ndx, container, direction) {
        var nextItems = $('.work-slider__item', container),
            currentItem = nextItems.filter('.work-slider__item_current'),
            reqItem = nextItems.eq(ndx);
        direction = direction === 'up' ? -100 : 100;

        currentItem.animate({
            'top': direction + '%'
        }, duration);

        reqItem.animate({
            'top': 0
        }, duration, function () {
            currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
            reqItem.addClass('work-slider__item_current');
        })
    }

    function _moveNext() {
        var container = $('.work-slider__list_next'),
            direction = 'up';

        if (index == items.length - 1) {
            ndx = 0;
        } else if (index < 0) {
            ndx = items.length - 1;
        } else {
            ndx = index + 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _movePrev() {
        var container = $('.work-slider__list_prev'),
            direction = 'down';

        if (index > items.length - 1) {
            ndx = 0;
        } else if (index <= 0) {
            ndx = items.length - 1;
        } else {
            ndx = index - 1;
        }

        animateSlide(ndx, container, direction);
    }

    function _slideShow() {
        var fadedOut = $.Deferred(),
            loaded = $.Deferred(),
            nextItem = items.eq(index),
            nextSrc = nextItem.find('img').attr('src'),
            nextTitle = nextItem.data('title'),
            nextSkills = nextItem.data('technology'),
            nextLink = nextItem.data('link');

        _moveNext();
        _movePrev();

        imgContainer.fadeOut(function () {
            title.slideUp();
            skills.fadeOut();
            fadedOut.resolve();
        });

        fadedOut.done(function () {
            title.text(nextTitle);
            skills.text(nextSkills);

            imgContainer.attr('src', nextSrc).on('load', function () {

                link.attr('href', nextLink);
                loaded.resolve();
            })
        });

        loaded.done(function () {
            title.slideDown();
            skills.fadeIn();
            imgContainer.fadeIn();
        });
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

                if (index > items.length - 1) {
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
var request = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr. open('GET', url, true);
        xhr.addEventListener('load', function() {

            if (xhr.status > 400) {
                reject('не удалось загрузить файл');
            } else {
                var data = JSON.parse(xhr.responseText);

                resolve(data);
            }
        });
        xhr.send();
    })
};

var preload = document.querySelector('.preloader');

if (preload !== null) Preloader.init();

window.onload = function () {

  //MAIN PARALAX
  var paralax = document.querySelector('#paralax');

  if (paralax !== null) {
    MainParalax.init();
  }
  //
  // console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      Flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      Flip.welcome();
    });
  }

  //BURGERMENU
  var burgerMenu = document.querySelector('.hamburger-btn');

  if (burgerMenu !== null) {
    burgerMenu.addEventListener('click', function () {
      Menu.toggle();
    });
  }


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    Blur.set();
    window.onresize = function () {
      Blur.set();
    };
  }


  var form = document.querySelector('form');

  if (form !== null) {
    //очистка ошибки
    var inputs = form.elements;
    var closeError = document.querySelector('.input-error-captcha__close');

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onfocus = function() {
        if (this.parentNode.classList.contains('input-group_error')) {
          Validation.clear(this);
        }
      }
    }

    if (closeError !== null) {
      closeError.onclick = function() {
        closeError.parentNode.parentNode.style.display = 'none';
      };
    }


    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = Validation.init(form);

      console.log(valid);
    })
  }


  //SCROLL PAGE
  var scrollLinkDown = document.querySelector('.scroll-link_down');
  var scrollLinkUp = document.querySelector('.scroll-link_up');

  if (scrollLinkDown !== null) {
    scrollLinkDown.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.down(this);
    })
  }
  if (scrollLinkUp !== null) {
    scrollLinkUp.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.up(this);
    })
  }

  //SLIDER
  var slider = document.querySelector('.work__slider');

  if (slider !== null) {
    $.getJSON('../data/works.json', function (data) {
        // console.log(data)
        $('.work-slider__list_prev').append(createSlides(data));
        $('.work-slider__list_next').append(createSlides(data));

        Slider.init($('.work-slider__list_next').children());
        Slider.move();
    });
  }

        function createSlides(items, active) {
        var list = document.createDocumentFragment();

        items.forEach(function (item, i) {
            var span = document.createElement('LI');
            var img = new Image();

            (i === active) && span.classList.add('work-slider__item_current');
            span.classList.add('work-slider__item');
            span.dataset.title = item.name;
            span.dataset.technology = item.technology;
            span.dataset.link = item.link;
            img.src = item.img;
            img.classList.add('work-slider__img');

            span.appendChild(img);
            list.appendChild(span);
        });

        return list;
    }
  //HEADER PARALAX & SKILLS
  var bg = document.querySelector('.header__bg'),
    skills = document.querySelectorAll('.skill'),
    blogWrapper = document.querySelector('.blog-container');

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {

    var wScroll = window.pageYOffset;

    if (bg !== null) {
      HeaderParallax.init(wScroll);
    }

    if (skills !== null) {
      Skills.grow();
    }

    if (blogWrapper !== null) {
      BlogMenu.init();
      BlogMenu.initActive();
    }

  };

  var sideMenu = document.querySelector('.sidemenu-btn');

  if (sideMenu !== null) {
    sideMenu.onclick = function () {
      BlogMenu.toggle();
    }
  }

  window.onresize = function () {
    BlogMenu.init();
  }


};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwibmV3U2xpZGVyLmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsInhoci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCbG9nTWVudSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICBmdW5jdGlvbiBfZml4TWVudSgpIHtcbiAgICB2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctbWVudScpLFxuICAgICAgbmF2Q29vcmRzID0gc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzgwKSB7XG4gICAgICBpZiAobmF2Q29vcmRzIDw9IC01MCkge1xuICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBuYXYuc3R5bGUudG9wID0gJzIwcHgnO1xuICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnMjAlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xuICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBuYXYuc3R5bGUudG9wID0gJyc7XG4gICAgICBuYXYuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBfaW5pdEFjdGl2ZSAoKSB7XG4gICAgdmFyIHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RfX3RpdGxlJyksXG4gICAgICBwb3N0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvZy1tZW51X19saW5rJyksXG4gICAgICBhY3RpdmVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcG9zdCA9IHBvc3RzW2ldLFxuICAgICAgICBwb3N0VG9wID0gcG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChwb3N0VG9wIDw9IDEwMCkge1xuICAgICAgICBhY3RpdmVMaW5rWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgcG9zdExpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG4gIHZhciBfY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfZml4TWVudSxcbiAgICBpbml0QWN0aXZlOiBfaW5pdEFjdGl2ZSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXJfb3BlbicpKSB7XG4gICAgICAgIF9vcGVuTWVudSgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF9jbG9zZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKCk7IiwiLy8gQkxVUiBFRkZFQ1RcclxudmFyIEJsdXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyksXHJcbiAgICBibHVyV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtJyksXHJcbiAgICBibHVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLFxyXG4gICAgICAgIGltZ0Nvb3JkcyA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBibHVyQ29vcmRzID0gYmx1cldyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgcG9zTGVmdCA9IC1ibHVyV3JhcHBlci5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXHJcbiAgICAgICAgYmx1ckNTUyA9IGJsdXIuc3R5bGU7XHJcblxyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHggJyArIHBvc1RvcCArICdweCc7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpOyIsIi8vIGluZGV4IGZsaXBcclxudmFyIEZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG5cclxuICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF93ZWxjb21lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGF1dGg6IF9hdXRoLFxyXG4gICAgd2VsY29tZTogX3dlbGNvbWVcclxuICB9XHJcblxyXG59KSgpOyIsInZhciBWYWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZXJyb3JGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1tc2cnKSxcclxuICAgIGNhcHRjaGFFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lX19lcnJvcicpLFxyXG4gICAgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jb250YWluZXInKTtcclxuXHJcbiAgdmFyIF9pbml0ID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgIHZhciBlbGVtcyA9IGZvcm0uZWxlbWVudHM7XHJcblxyXG4gICAgY29uc29sZS5sb2coZWxlbXMpO1xyXG4gICAgcmV0dXJuIF92YWxpZGF0ZShlbGVtcykgPyB0cnVlIDogZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gX3ZhbGlkYXRlKGlucHV0cykge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbnB1dHNbaV0udGFnTmFtZSA9PT0gJ0JVVFRPTicpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgdmFyIGVsZW0gPSBpbnB1dHNbaV07XHJcblxyXG4gICAgICBpZiAoZWxlbS52YWx1ZSA9PSAnJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVsZW0pO1xyXG4gICAgICAgIHJldHVybiBfc2hvd0Vycm9yKGVsZW0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKSB7XHJcblxyXG4gICAgICAgIGlmIChlbGVtLmNoZWNrZWQgJiYgZWxlbS52YWx1ZSA9PT0gJ3llcycpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgY2FwdGNoYUVycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcblxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIF9zaG93RXJyb3IoZWxlbSkge1xyXG4gICAgdmFyIHRleHQgPSBlbGVtLmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdmFyIHBvc2l0aW9uID0gZWxlbS5wYXJlbnROb2RlLm9mZnNldFRvcCArIGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XHJcbiAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZXJyb3JGaWVsZC5pbm5lclRleHQgPSAn0JLRiyDQvdC1INCy0LLQtdC70LggJyArIHRleHQ7XHJcblxyXG4gICAgLy8gaWYgKHBvc2l0aW9uID4gZm9ybUNvbnRhaW5lci5vZmZzZXRIZWlnaHQpXHJcbiAgICBlcnJvckZpZWxkLnN0eWxlLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9jbGVhckVycm9yKGVsZW0pIHtcclxuICAgIGNvbnNvbGUubG9nKGVsZW0pO1xyXG4gICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XHJcbiAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IF9pbml0LFxyXG4gICAgY2xlYXI6IF9jbGVhckVycm9yXHJcbiAgfVxyXG59KSgpOyIsImZ1bmN0aW9uIGluaXRNYXAgKCkge1xyXG4gIHZhciBwb2ludGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43ODcwNjksIDM3LjQ3ODIyMCksXHJcbiAgICBjZW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc4NjI3MywgMzcuNDE4NjIzKTtcclxuXHJcbiAgdmFyIHN0eWxlcyA9IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM5NmQ3YzhcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV07XHJcblxyXG4gIHZhciBzdHlsZWRNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShzdHlsZXMsXHJcbiAgICB7bmFtZTogXCJTdHlsZWQgTWFwXCJ9KTtcclxuXHJcbiAgdmFyIG1hcFNldHRpbmdzID0ge1xyXG4gICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICB6b29tOiAxMyxcclxuICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICBtYXBUeXBlSWRzOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdtYXBfc3R5bGUnXVxyXG4gICAgfSxcclxuICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXHJcbiAgICB9LFxyXG4gICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCBtYXBTZXR0aW5ncyk7XHJcblxyXG4gIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgIGljb246ICdhc3NldHMvaW1nL2RlY29yL21hcF9tYXJrZXIucG5nJyxcclxuICAgIHBvc2l0aW9uOiBwb2ludGVyLFxyXG4gICAgbWFwOiBtYXAsXHJcbiAgICB0aXRsZTogXCJJJ20gaGVyZSFcIixcclxuICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRVxyXG4gIH0pO1xyXG5cclxuICBtYXAubWFwVHlwZXMuc2V0KCdtYXBfc3R5bGUnLCBzdHlsZWRNYXApO1xyXG4gIG1hcC5zZXRNYXBUeXBlSWQoJ21hcF9zdHlsZScpO1xyXG59O1xyXG4iLCJ2YXIgTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1uYXZpZ2F0aW9uJyksXHJcbiAgICBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1idG4nKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBidXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlci1idG5fY2xvc2VkJyk7XHJcbiAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gKCFtZW51LmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJykpID8gJ2hpZGRlbicgOiAnYXV0byc7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpOyIsIi8vaW5kZXggcGFyYWxheFxyXG52YXIgTWFpblBhcmFsYXggPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICB2YXIgX3Nob3cgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHBhcmFsYXhDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFyYWxheCcpLFxyXG4gICAgICBsYXllcnMgPSBwYXJhbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcclxuICAgICAgICBwYWdlWSA9IGUucGFnZVksXHJcbiAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XHJcblxyXG4gICAgICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcclxuICAgICAgICB2YXIgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxyXG4gICAgICAgICAgZGl2aWRlciA9IGkgLyA0MCxcclxuICAgICAgICAgIGJvdHRvbVBvc2l0aW9uID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcclxuICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogZGl2aWRlcixcclxuICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuXHJcbiAgICAgICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS5sZWZ0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICBsYXllclN0eWxlLnJpZ2h0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgfSlcclxuXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICB2YXIgX2Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy/QtNC70Y8g0L/Qu9Cw0L3RiNC10YLQvtCyINC4INGC0LXQu9C10YTQvtC90L7QsiDQv9C+0LTRgdGC0LDQstC40YLRjCDQv9GA0L7RgdGC0L4g0LrQsNGA0YLQuNC90LrRgywg0LAg0L3QtSDQs9GA0YPQt9C40YLRjCDQstC10YHRjCDQv9Cw0YDQsNC70LDQutGBXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IF9zaG93XHJcbiAgfTtcclxuXHJcbn0pKCk7IiwiLy8gdmFyIFNsaWRlciA9IG5ldyBmdW5jdGlvbiAoKSB7XG4vLyAgICAgdmFyIGl0ZW1zLFxuLy8gICAgICAgICBpbmRleCxcbi8vICAgICAgICAgaW5pdGlhbEluZGV4ID0gMSxcbi8vICAgICAgICAgbmR4LFxuLy8gICAgICAgICBkdXJhdGlvbiA9IDUwMCxcbi8vICAgICAgICAgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstc2xpZGVyJyk7XG4vL1xuLy8gICAgIGZ1bmN0aW9uIGluaXQoZGF0YSkge1xuLy8gICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSB7XG4vLyAgICAgICAgICAgICBpbmRleDogaW5pdGlhbEluZGV4LFxuLy8gICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrX190aXRsZScpLFxuLy8gICAgICAgICAgICAgdGVjaG5vbG9neTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3RlY2hub2xvZ3knKSxcbi8vICAgICAgICAgICAgIGltZzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3BpYycpLFxuLy8gICAgICAgICAgICAgbmV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcbi8vICAgICAgICAgICAgIHByZXY6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2Jylcbi8vXG4vLyAgICAgICAgIH07XG4vL1xuLy8gICAgICAgICBpdGVtcyA9IGRhdGE7XG4vL1xuLy8gICAgICAgICAvLyDQvtGC0YDQuNGB0L7QstC60LAg0L7RgdC90L7QstC90L7Qs9C+INGB0LvQsNC50LTQsFxuLy8gICAgICAgICBjaGFuZ2VTbGlkZShhY3RpdmVTbGlkZSk7XG4vL1xuLy8gICAgICAgICAvLyDQv9C+0LTQs9C+0YLQvtCy0LrQsCDRgdC70LDQudC00L7Qsi3Qv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5XG4vLyAgICAgICAgIGFjdGl2ZVNsaWRlLm5leHQuYXBwZW5kQ2hpbGQoY3JlYXRlU2xpZGVzKGl0ZW1zLCBhY3RpdmVTbGlkZS5pbmRleCArIDEpKTtcbi8vICAgICAgICAgYWN0aXZlU2xpZGUucHJldi5hcHBlbmRDaGlsZChjcmVhdGVTbGlkZXMoaXRlbXMsIGFjdGl2ZVNsaWRlLmluZGV4IC0gMSkpO1xuLy9cbi8vICAgICAgICAgLy8g0YHQu9GD0YjQsNC10Lwg0YHQvtCx0YvRgtC40LUg0L/QviDQvdCw0LbQsNGC0LjRjiDQvdCwINGB0LvQsNC50LTRi1xuLy8gICAgICAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4vLyAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgICAgICAgICBzbGlkZVNob3coZS50YXJnZXQpO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gY3JlYXRlU2xpZGVzKGl0ZW1zLCBhY3RpdmUpIHtcbi8vICAgICAgICAgdmFyIGxpc3QgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4vL1xuLy8gICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4vLyAgICAgICAgICAgICB2YXIgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0xJJyk7XG4vLyAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4vL1xuLy8gICAgICAgICAgICAgKGkgPT09IGFjdGl2ZSkgJiYgc3Bhbi5jbGFzc0xpc3QuYWRkKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XG4vLyAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ3dvcmstc2xpZGVyX19pdGVtJyk7XG4vLyAgICAgICAgICAgICBzcGFuLmRhdGFzZXQudGl0bGUgPSBpdGVtLm5hbWU7XG4vLyAgICAgICAgICAgICBzcGFuLmRhdGFzZXQudGVjaG5vbG9neSA9IGl0ZW0udGVjaG5vbG9neTtcbi8vICAgICAgICAgICAgIHNwYW4uZGF0YXNldC5saW5rID0gaXRlbS5saW5rO1xuLy8gICAgICAgICAgICAgaW1nLnNyYyA9IGl0ZW0uaW1nO1xuLy8gICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ3dvcmstc2xpZGVyX19pbWcnKTtcbi8vXG4vLyAgICAgICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGltZyk7XG4vLyAgICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKHNwYW4pO1xuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIHJldHVybiBsaXN0O1xuLy8gICAgIH1cbi8vXG4vLyAgICAgZnVuY3Rpb24gc2xpZGVTaG93ICh0YXJnZXQpIHtcbi8vICAgICAgICAgaWYgKHRhcmdldC5jb250YWlucyhuZXh0KSkge1xuLy8gICAgICAgICAgICAgaW5kZXgrKztcbi8vICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQuY29udGFpbnMocHJldikpIHtcbi8vICAgICAgICAgICAgIGluZGV4LS07XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbi8vICAgICAgICAgICAgIGluZGV4ID0gMDtcbi8vICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcbi8vICAgICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgLy8gbW92ZVNsaWRlKG5leHQpO1xuLy8gICAgICAgLy8gbW92ZVNsaWRlKHByZXYpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcbi8vICAgICAgIGNoYW5nZVNsaWRlKGluZGV4KTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGZ1bmN0aW9uIG1vdmVTbGlkZSgpIHtcbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICBmdW5jdGlvbiBjaGFuZ2VTbGlkZShhY3RpdmVJdGVtKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZUl0ZW0pXG4vLyAgICAgICAgIGFjdGl2ZUl0ZW0udGl0bGUuaW5uZXJIVE1MID0gaXRlbXNbYWN0aXZlSXRlbS5pbmRleF0ubmFtZTtcbi8vICAgICAgICAgYWN0aXZlSXRlbS50ZWNobm9sb2d5LmlubmVySFRNTCA9IGl0ZW1zW2FjdGl2ZUl0ZW0uaW5kZXhdLnRlY2hub2xvZ3kuam9pbignLCAnKTtcbi8vICAgICAgICAgYWN0aXZlSXRlbS5pbWcuc3JjID0gaXRlbXNbYWN0aXZlSXRlbS5pbmRleF0uaW1nO1xuLy8gICAgIH1cbi8vXG4vL1xuLy8gICAgIHRoaXMuaW5pdCA9IGluaXQ7XG4vLyB9OyIsInZhciBQcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyJyksXHJcbiAgICB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZGV4LXdyYXBwZXInKSxcclxuICAgIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLFxyXG4gICAgZmxpcENhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpLFxyXG4gICAgcHJvY2VudEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fcGVyY2VudCcpLFxyXG4gICAgcGVyY2VudCA9IDAsXHJcbiAgICBwZXJjZW50U3RlcCA9IDEwMCAvIChpbWFnZXMubGVuZ3RoICsgMC40KTtcclxuXHJcbiAgZnVuY3Rpb24gX2xvYWRJbWFnZShpbWcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwZXJjZW50ICsgcGVyY2VudFN0ZXApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBlcmNlbnQsIHBlcmNlbnRTdGVwKTtcclxuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcclxuICAgICAgICByZXNvbHZlKGltZyk7XHJcbiAgICAgIH07XHJcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJlamVjdChpbWcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9zaG93TG9hZGVyKGltZ0xpc3QpIHtcclxuICAgIHZhciBwcm9taXNlSW1nID0gaW1nTGlzdC5tYXAoX2xvYWRJbWFnZSk7XHJcblxyXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZUltZylcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgd3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICAgICAgcGVyY2VudCA9IDEwMDtcclxuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGxvYWRlci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgICAgLy8gbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGVyKTtcclxuICAgICAgICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDE1MDApXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGZsaXBDYXJkLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgxLDAsMCwgMGRlZyknO1xyXG4gICAgICAgIH0sIDE1MDApXHJcbiAgICAgIH0pXHJcbiAgfTtcclxuXHJcbmZ1bmN0aW9uIF9jbG9zZUxvYWRlcigpIHtcclxuICB2YXIgaW1nQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaW1hZ2VzKTtcclxuXHJcbiAgX3Nob3dMb2FkZXIoaW1nQXJyKTtcclxufTtcclxuXHJcblxyXG5yZXR1cm4ge1xyXG4gIGluaXQ6IF9jbG9zZUxvYWRlclxyXG59XHJcblxyXG59KVxyXG4oKTtcclxuXHJcblxyXG4vKlxyXG4gMSAtINC30LDQs9GA0YPQt9C40YLRjCDRgdCw0Lwg0L/RgNC10LvQvtCw0LTQtdGAXHJcbiAyIC0g0LLQt9GP0YLRjCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcclxuIDMgLSDQv9C+INC80LXRgNC1INC30LDQs9GA0YPQt9C60Lgg0LrQsNGA0YLQuNC90L7QuiDQvNC10L3Rj9GC0Ywg0L/RgNC+0YbQtdC90YLRi1xyXG4gNCAtINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INGD0LHRgNCw0YLRjCDQv9GA0LXQu9C+0LDQtNC10YBcclxuICovIiwidmFyIFNjcm9sbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZG93bjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgdmFyIHNlY3Rpb24gPSBlbGVtLnBhcmVudE5vZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcsXHJcbiAgICAgICAgcG9zVG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHBvc1RvcH0sIDE1MDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxyXG4vL1xyXG4vLyB2YXIgc2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcbi8vICAgdmFyIHNwZWVkID0gMSxcclxuLy8gICAgIGN1cnJlbnRQb3NpdGlvbixcclxuLy8gICAgIGRpc3RQb3NpdGlvbjtcclxuLy9cclxuLy8gICBzcGVlZCA9IChjdXJyZW50UG9zaXRpb24gLSBkaXN0UG9zaXRpb24pIC8gMTAwMDtcclxuLy9cclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgZG93blRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4vLyAgICAgdmFyIGRpc3RQb3NpdGlvbiA9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4vL1xyXG4vLyAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4vL1xyXG4vLyAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZGlzdFBvc2l0aW9uKTtcclxuLy9cclxuLy8gICAgICAgaWYgKHRvcCA+IDEwMDApIHtcclxuLy8gICAgICAgICBjbGVhckludGVydmFsKHNjcik7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0sIDE1KTtcclxuLy9cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pKCk7IiwiLy8g0J/QkNCg0JDQm9CQ0JrQoSDQrdCk0KTQpNCV0JrQoiDQkiDQqNCQ0J/QmtCVINCh0JDQmdCi0JBcclxudmFyIEhlYWRlclBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgcG9ydGZvbGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcG9ydGZvbGlvJyksXHJcbiAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xyXG5cclxuICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKScsXHJcbiAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG4gICAgaWYgKHdpbmRvd1Njcm9sbCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgIGlmIChwb3J0Zm9saW8gIT09IG51bGwpIHtcclxuICAgICAgICBfbW92ZShwb3J0Zm9saW8sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgfTtcclxuICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy8g0JDQndCY0JzQkNCm0JjQryDQmNCa0J7QndCe0Jog0KHQmtCY0JvQntCSXHJcbnZhciBTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgIGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAvLyDQstGL0YfQuNGB0LvRj9C10Lwg0LTQu9C40L3RgyDQvtC60YDRg9C20L3QvtGB0YLQuFxyXG4gIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxyXG4gICAgICBjaXJjbGVMZW5ndGggPSAyICogTWF0aC5QSSAqIGNpcmNsZVJhZGl1cztcclxuXHJcbiAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gIH07XHJcblxyXG4gIC8vINC/0YDQuNC80LXQvdGP0LXQvCDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQstCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG4gICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgLy8g0YTRg9C90LrRhtC40Y8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICB2YXIgY2lyY2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxyXG4gICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXHJcbiAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGVyY2VudDtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcblxyXG4gICAgICBpZiAoc2tpbGxQZXJjZW50IDwgNTApIHtcclxuICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xyXG4gICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgfVxyXG4gICAgfSwgNTAwKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCJ2YXIgU2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtcyxcclxuICAgICAgICBpbmRleCA9IDEsXHJcbiAgICAgICAgbmR4LFxyXG4gICAgICAgIGR1cmF0aW9uID0gNTAwLFxyXG4gICAgICAgIHRpdGxlID0gJCgnLndvcmtfX3RpdGxlJyksXHJcbiAgICAgICAgc2tpbGxzID0gJCgnLndvcmtfX3RlY2hub2xvZ3knKSxcclxuICAgICAgICBpbWdDb250YWluZXIgPSAkKCcud29ya19fcGljJyksXHJcbiAgICAgICAgbGluayA9ICQoJy53b3JrX19saW5rJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gX2luaXQoZGF0YSkge1xyXG4gICAgICAgIGl0ZW1zID0gZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcbiAgICAgICAgICAgIGltZ1NyYyA9IGFjdGl2ZUl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICAgIGFjdGl2ZVRpdGxlID0gYWN0aXZlSXRlbS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICBhY3RpdmVTbGlsbCA9IGFjdGl2ZUl0ZW0uZGF0YSgndGVjaG5vbG9neScpLFxyXG4gICAgICAgICAgICBhY3RpdmVMaW5rID0gYWN0aXZlSXRlbS5kYXRhKCdsaW5rJyk7XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtcylcclxuXHJcbiAgICAgICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIGltZ1NyYyk7XHJcbiAgICAgICAgdGl0bGUudGV4dChhY3RpdmVUaXRsZSk7XHJcbiAgICAgICAgc2tpbGxzLnRleHQoYWN0aXZlU2xpbGwpO1xyXG4gICAgICAgIGxpbmsuYXR0cignaHJlZicsIGFjdGl2ZUxpbmspO1xyXG5cclxuICAgICAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xyXG4gICAgICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgdmFyIHByZXZJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuZXEoaW5kZXggLSAxKTtcclxuICAgICAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIG5leHRJdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcclxuICAgICAgICAgICAgcmVxSXRlbSA9IG5leHRJdGVtcy5lcShuZHgpO1xyXG4gICAgICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xMDAgOiAxMDA7XHJcblxyXG4gICAgICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbiAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAndG9wJzogMFxyXG4gICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgICAgICAgcmVxSXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX21vdmVOZXh0KCkge1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIG5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmR4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9zbGlkZVNob3coKSB7XHJcbiAgICAgICAgdmFyIGZhZGVkT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBsb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIG5leHRJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICAgICAgICBuZXh0U3JjID0gbmV4dEl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICAgIG5leHRUaXRsZSA9IG5leHRJdGVtLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgIG5leHRTa2lsbHMgPSBuZXh0SXRlbS5kYXRhKCd0ZWNobm9sb2d5JyksXHJcbiAgICAgICAgICAgIG5leHRMaW5rID0gbmV4dEl0ZW0uZGF0YSgnbGluaycpO1xyXG5cclxuICAgICAgICBfbW92ZU5leHQoKTtcclxuICAgICAgICBfbW92ZVByZXYoKTtcclxuXHJcbiAgICAgICAgaW1nQ29udGFpbmVyLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aXRsZS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgIHNraWxscy5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgIGZhZGVkT3V0LnJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmFkZWRPdXQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRpdGxlLnRleHQobmV4dFRpdGxlKTtcclxuICAgICAgICAgICAgc2tpbGxzLnRleHQobmV4dFNraWxscyk7XHJcblxyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgbmV4dFNyYykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGluay5hdHRyKCdocmVmJywgbmV4dExpbmspO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbG9hZGVkLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgc2tpbGxzLmZhZGVJbigpO1xyXG4gICAgICAgICAgICBpbWdDb250YWluZXIuZmFkZUluKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBfaW5pdCxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX25leHQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19wcmV2JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBfc2xpZGVTaG93KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuKCk7IiwidmFyIHJlcXVlc3QgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIHhoci4gb3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPiA0MDApIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ9C90LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINGE0LDQudC7Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgIH0pXG59O1xuIiwidmFyIHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyJyk7XHJcblxyXG5pZiAocHJlbG9hZCAhPT0gbnVsbCkgUHJlbG9hZGVyLmluaXQoKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vTUFJTiBQQVJBTEFYXHJcbiAgdmFyIHBhcmFsYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFyYWxheCcpO1xyXG5cclxuICBpZiAocGFyYWxheCAhPT0gbnVsbCkge1xyXG4gICAgTWFpblBhcmFsYXguaW5pdCgpO1xyXG4gIH1cclxuICAvL1xyXG4gIC8vIGNvbnNvbGUubG9nKHBhcmFsYXgpO1xyXG5cclxuXHJcbiAgLy9GTElQIENBUkRcclxuICB2YXIgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgd2VsY29tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuJyk7XHJcblxyXG4gIGlmIChhdXRoQnRuICE9PSBudWxsKSB7XHJcbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGbGlwLmF1dGgoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdlbGNvbWVCdG4gIT09IG51bGwpIHtcclxuICAgIHdlbGNvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEZsaXAud2VsY29tZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL0JVUkdFUk1FTlVcclxuICB2YXIgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIGlmIChidXJnZXJNZW51ICE9PSBudWxsKSB7XHJcbiAgICBidXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBNZW51LnRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9CTFVSXHJcbiAgdmFyIGJsdXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgaWYgKGJsdXJGb3JtICE9PSBudWxsKSB7XHJcbiAgICBCbHVyLnNldCgpO1xyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbHVyLnNldCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG5cclxuICB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuXHJcbiAgaWYgKGZvcm0gIT09IG51bGwpIHtcclxuICAgIC8v0L7Rh9C40YHRgtC60LAg0L7RiNC40LHQutC4XHJcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5lbGVtZW50cztcclxuICAgIHZhciBjbG9zZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLWNhcHRjaGFfX2Nsb3NlJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaW5wdXRzW2ldLm9uZm9jdXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXBfZXJyb3InKSkge1xyXG4gICAgICAgICAgVmFsaWRhdGlvbi5jbGVhcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VFcnJvciAhPT0gbnVsbCkge1xyXG4gICAgICBjbG9zZUVycm9yLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjbG9zZUVycm9yLnBhcmVudE5vZGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHZhciB2YWxpZCA9IFZhbGlkYXRpb24uaW5pdChmb3JtKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgLy9TQ1JPTEwgUEFHRVxyXG4gIHZhciBzY3JvbGxMaW5rRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua19kb3duJyk7XHJcbiAgdmFyIHNjcm9sbExpbmtVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua191cCcpO1xyXG5cclxuICBpZiAoc2Nyb2xsTGlua0Rvd24gIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtEb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS5kb3duKHRoaXMpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgaWYgKHNjcm9sbExpbmtVcCAhPT0gbnVsbCkge1xyXG4gICAgc2Nyb2xsTGlua1VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS51cCh0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL1NMSURFUlxyXG4gIHZhciBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya19fc2xpZGVyJyk7XHJcblxyXG4gIGlmIChzbGlkZXIgIT09IG51bGwpIHtcclxuICAgICQuZ2V0SlNPTignLi4vZGF0YS93b3Jrcy5qc29uJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICQoJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuYXBwZW5kKGNyZWF0ZVNsaWRlcyhkYXRhKSk7XHJcbiAgICAgICAgJCgnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5hcHBlbmQoY3JlYXRlU2xpZGVzKGRhdGEpKTtcclxuXHJcbiAgICAgICAgU2xpZGVyLmluaXQoJCgnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5jaGlsZHJlbigpKTtcclxuICAgICAgICBTbGlkZXIubW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTbGlkZXMoaXRlbXMsIGFjdGl2ZSkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnTEknKTtcclxuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgKGkgPT09IGFjdGl2ZSkgJiYgc3Bhbi5jbGFzc0xpc3QuYWRkKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnd29yay1zbGlkZXJfX2l0ZW0nKTtcclxuICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LnRpdGxlID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICBzcGFuLmRhdGFzZXQudGVjaG5vbG9neSA9IGl0ZW0udGVjaG5vbG9neTtcclxuICAgICAgICAgICAgc3Bhbi5kYXRhc2V0LmxpbmsgPSBpdGVtLmxpbms7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBpdGVtLmltZztcclxuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ3dvcmstc2xpZGVyX19pbWcnKTtcclxuXHJcbiAgICAgICAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgLy9IRUFERVIgUEFSQUxBWCAmIFNLSUxMU1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgIGJsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY29udGFpbmVyJyk7XHJcblxyXG4gIC8vINCS0KvQl9Ce0JIg0KTQo9Cd0JrQptCY0K8g0J/QniDQodCa0KDQntCb0JvQoyDQodCi0KDQkNCd0JjQptCrXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgIGlmIChiZyAhPT0gbnVsbCkge1xyXG4gICAgICBIZWFkZXJQYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChza2lsbHMgIT09IG51bGwpIHtcclxuICAgICAgU2tpbGxzLmdyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmxvZ1dyYXBwZXIgIT09IG51bGwpIHtcclxuICAgICAgQmxvZ01lbnUuaW5pdCgpO1xyXG4gICAgICBCbG9nTWVudS5pbml0QWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHZhciBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbWVudS1idG4nKTtcclxuXHJcbiAgaWYgKHNpZGVNZW51ICE9PSBudWxsKSB7XHJcbiAgICBzaWRlTWVudS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbG9nTWVudS50b2dnbGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIEJsb2dNZW51LmluaXQoKTtcclxuICB9XHJcblxyXG5cclxufTsiXX0=
