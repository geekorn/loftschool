var BlogMenu = (function () {
  var sidebar = document.querySelector('.sidebar');

  function _fixMenu() {
    var nav = document.querySelector('.blog-menu'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (window.innerWidth >= 768) {
      if (navCoords <= -50) {
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.width = '20%';
      } else {
        nav.style.position = 'static';
        nav.style.width = 'auto';
      }
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
  var items = $('.work-slider__item', '.work-slider__list_next'),
    index = 1,
    ndx,
    duration = 500,
    title = $('.work__title'),
    skills = $('.work__technology'),
    imgContainer = $('.work__pic');

  function _init() {
    var activeItem = items.eq(index),
      imgSrc = activeItem.find('img').attr('src'),
      activeTitle = activeItem.data('title'),
      activeSlill = activeItem.data('technology');

    imgContainer.attr('src', imgSrc);
    title.text(activeTitle);
    skills.text(activeSlill);

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
      nextSrc = items.eq(index).find('img').attr('src'),
      nextTitle = items.eq(index).data('title'),
      nextSkills = items.eq(index).data('technology');

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
    (function () {
      // Slider.init();
      Slider.init();
      Slider.move();
    })();
  }


};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJsb2dNZW51ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIGZ1bmN0aW9uIF9maXhNZW51KCkge1xuICAgIHZhciBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1tZW51JyksXG4gICAgICBuYXZDb29yZHMgPSBzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHtcbiAgICAgIGlmIChuYXZDb29yZHMgPD0gLTUwKSB7XG4gICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIG5hdi5zdHlsZS50b3AgPSAnMjBweCc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICcyMCUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfaW5pdEFjdGl2ZSAoKSB7XG4gICAgdmFyIHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RfX3RpdGxlJyksXG4gICAgICBwb3N0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvZy1tZW51X19saW5rJyksXG4gICAgICBhY3RpdmVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcG9zdCA9IHBvc3RzW2ldLFxuICAgICAgICBwb3N0VG9wID0gcG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChwb3N0VG9wIDw9IDEwMCkge1xuICAgICAgICBhY3RpdmVMaW5rWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgcG9zdExpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG4gIHZhciBfY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfZml4TWVudSxcbiAgICBpbml0QWN0aXZlOiBfaW5pdEFjdGl2ZSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXJfb3BlbicpKSB7XG4gICAgICAgIF9vcGVuTWVudSgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF9jbG9zZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKCk7IiwiLy8gQkxVUiBFRkZFQ1RcclxudmFyIEJsdXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyksXHJcbiAgICBibHVyV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtJyksXHJcbiAgICBibHVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLFxyXG4gICAgICAgIGltZ0Nvb3JkcyA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBibHVyQ29vcmRzID0gYmx1cldyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgcG9zTGVmdCA9IC1ibHVyV3JhcHBlci5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXHJcbiAgICAgICAgYmx1ckNTUyA9IGJsdXIuc3R5bGU7XHJcblxyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHggJyArIHBvc1RvcCArICdweCc7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpOyIsIi8vIGluZGV4IGZsaXBcclxudmFyIEZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG5cclxuICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF93ZWxjb21lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGF1dGg6IF9hdXRoLFxyXG4gICAgd2VsY29tZTogX3dlbGNvbWVcclxuICB9XHJcblxyXG59KSgpOyIsInZhciBWYWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVycm9yRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZXJyb3ItbXNnJyksXG4gICAgY2FwdGNoYUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlbGNvbWVfX2Vycm9yJyksXG4gICAgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jb250YWluZXInKTtcblxuICB2YXIgX2luaXQgPSBmdW5jdGlvbiAoZm9ybSkge1xuICAgIHZhciBlbGVtcyA9IGZvcm0uZWxlbWVudHM7XG5cbiAgICBjb25zb2xlLmxvZyhlbGVtcyk7XG4gICAgcmV0dXJuIF92YWxpZGF0ZShlbGVtcykgPyB0cnVlIDogZmFsc2U7XG4gIH07XG5cbiAgZnVuY3Rpb24gX3ZhbGlkYXRlKGlucHV0cykge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpbnB1dHNbaV0udGFnTmFtZSA9PT0gJ0JVVFRPTicpIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgZWxlbSA9IGlucHV0c1tpXTtcblxuICAgICAgaWYgKGVsZW0udmFsdWUgPT0gJycpIHtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbSk7XG4gICAgICAgIHJldHVybiBfc2hvd0Vycm9yKGVsZW0pXG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKSB7XG5cbiAgICAgICAgaWYgKGVsZW0uY2hlY2tlZCAmJiBlbGVtLnZhbHVlID09PSAneWVzJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbS5jaGVja2VkKSB7XG4gICAgICAgICAgY2FwdGNoYUVycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9O1xuXG4gIGZ1bmN0aW9uIF9zaG93RXJyb3IoZWxlbSkge1xuICAgIHZhciB0ZXh0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgcG9zaXRpb24gPSBlbGVtLnBhcmVudE5vZGUub2Zmc2V0VG9wICsgZWxlbS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcblxuICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC1ncm91cF9lcnJvcicpO1xuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZXJyb3JGaWVsZC5pbm5lclRleHQgPSAn0JLRiyDQvdC1INCy0LLQtdC70LggJyArIHRleHQ7XG5cbiAgICAvLyBpZiAocG9zaXRpb24gPiBmb3JtQ29udGFpbmVyLm9mZnNldEhlaWdodClcbiAgICBlcnJvckZpZWxkLnN0eWxlLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jbGVhckVycm9yKGVsZW0pIHtcbiAgICBjb25zb2xlLmxvZyhlbGVtKTtcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcbiAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX2luaXQsXG4gICAgY2xlYXI6IF9jbGVhckVycm9yXG4gIH1cbn0pKCk7IiwiZnVuY3Rpb24gaW5pdE1hcCAoKSB7XHJcbiAgdmFyIHBvaW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc4NzA2OSwgMzcuNDc4MjIwKSxcclxuICAgIGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg2MjczLCAzNy40MTg2MjMpO1xyXG5cclxuICB2YXIgc3R5bGVzID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzk2ZDdjOFwifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19XTtcclxuXHJcbiAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcclxuICAgIHtuYW1lOiBcIlN0eWxlZCBNYXBcIn0pO1xyXG5cclxuICB2YXIgbWFwU2V0dGluZ3MgPSB7XHJcbiAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIHpvb206IDEzLFxyXG4gICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ21hcF9zdHlsZSddXHJcbiAgICB9LFxyXG4gICAgem9vbUNvbnRyb2w6IHRydWUsXHJcbiAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgIH0sXHJcbiAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2VcclxuICB9O1xyXG5cclxuICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcFNldHRpbmdzKTtcclxuXHJcbiAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgaWNvbjogJ2Fzc2V0cy9pbWcvZGVjb3IvbWFwX21hcmtlci5wbmcnLFxyXG4gICAgcG9zaXRpb246IHBvaW50ZXIsXHJcbiAgICBtYXA6IG1hcCxcclxuICAgIHRpdGxlOiBcIkknbSBoZXJlIVwiLFxyXG4gICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFXHJcbiAgfSk7XHJcblxyXG4gIG1hcC5tYXBUeXBlcy5zZXQoJ21hcF9zdHlsZScsIHN0eWxlZE1hcCk7XHJcbiAgbWFwLnNldE1hcFR5cGVJZCgnbWFwX3N0eWxlJyk7XHJcbn07XHJcbiIsInZhciBNZW51ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24nKSxcclxuICAgIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLWJ0bl9jbG9zZWQnKTtcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAoIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKSkgPyAnaGlkZGVuJyA6ICdhdXRvJztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy9pbmRleCBwYXJhbGF4XHJcbnZhciBNYWluUGFyYWxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcGFyYWxheENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4JyksXHJcbiAgICAgIGxheWVycyA9IHBhcmFsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICBkaXZpZGVyID0gaSAvIDQwLFxyXG4gICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHZhciBfZGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL9C00LvRjyDQv9C70LDQvdGI0LXRgtC+0LIg0Lgg0YLQtdC70LXRhNC+0L3QvtCyINC/0L7QtNGB0YLQsNCy0LjRgtGMINC/0YDQvtGB0YLQviDQutCw0YDRgtC40L3QutGDLCDQsCDQvdC1INCz0YDRg9C30LjRgtGMINCy0LXRgdGMINC/0LDRgNCw0LvQsNC60YFcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX3Nob3dcclxuICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgUHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKSxcbiAgICB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZGV4LXdyYXBwZXInKSxcbiAgICBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSxcbiAgICBmbGlwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyksXG4gICAgcHJvY2VudEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fcGVyY2VudCcpLFxuICAgIHBlcmNlbnQgPSAwLFxuICAgIHBlcmNlbnRTdGVwID0gMTAwIC8gKGltYWdlcy5sZW5ndGggKyAwLjQpO1xuXG4gIGZ1bmN0aW9uIF9sb2FkSW1hZ2UoaW1nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmNlbnQgPSBNYXRoLmNlaWwocGVyY2VudCArIHBlcmNlbnRTdGVwKTtcbiAgICAgICAgY29uc29sZS5sb2cocGVyY2VudCwgcGVyY2VudFN0ZXApO1xuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcbiAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgfTtcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QoaW1nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zaG93TG9hZGVyKGltZ0xpc3QpIHtcbiAgICB2YXIgcHJvbWlzZUltZyA9IGltZ0xpc3QubWFwKF9sb2FkSW1hZ2UpO1xuXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZUltZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHBlcmNlbnQgPSAxMDA7XG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2FkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAvLyBsb2FkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkZXIpO1xuICAgICAgICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9LCAxNTAwKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxpcENhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDEsMCwwLCAwZGVnKSc7XG4gICAgICAgIH0sIDE1MDApXG4gICAgICB9KVxuICB9O1xuXG5mdW5jdGlvbiBfY2xvc2VMb2FkZXIoKSB7XG4gIHZhciBpbWdBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZXMpO1xuXG4gIF9zaG93TG9hZGVyKGltZ0Fycik7XG59O1xuXG5cbnJldHVybiB7XG4gIGluaXQ6IF9jbG9zZUxvYWRlclxufVxuXG59KVxuKCk7XG5cblxuLypcbiAxIC0g0LfQsNCz0YDRg9C30LjRgtGMINGB0LDQvCDQv9GA0LXQu9C+0LDQtNC10YBcbiAyIC0g0LLQt9GP0YLRjCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcbiAzIC0g0L/QviDQvNC10YDQtSDQt9Cw0LPRgNGD0LfQutC4INC60LDRgNGC0LjQvdC+0Log0LzQtdC90Y/RgtGMINC/0YDQvtGG0LXQvdGC0YtcbiA0IC0g0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0YPQsdGA0LDRgtGMINC/0YDQtdC70L7QsNC00LXRgFxuICovIiwidmFyIFNjcm9sbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZG93bjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgdmFyIHNlY3Rpb24gPSBlbGVtLnBhcmVudE5vZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcsXHJcbiAgICAgICAgcG9zVG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHBvc1RvcH0sIDE1MDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxyXG4vL1xyXG4vLyB2YXIgc2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcbi8vICAgdmFyIHNwZWVkID0gMSxcclxuLy8gICAgIGN1cnJlbnRQb3NpdGlvbixcclxuLy8gICAgIGRpc3RQb3NpdGlvbjtcclxuLy9cclxuLy8gICBzcGVlZCA9IChjdXJyZW50UG9zaXRpb24gLSBkaXN0UG9zaXRpb24pIC8gMTAwMDtcclxuLy9cclxuLy8gICByZXR1cm4ge1xyXG4vLyAgICAgZG93blRvOiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4vLyAgICAgdmFyIGRpc3RQb3NpdGlvbiA9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4vL1xyXG4vLyAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4vL1xyXG4vLyAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZGlzdFBvc2l0aW9uKTtcclxuLy9cclxuLy8gICAgICAgaWYgKHRvcCA+IDEwMDApIHtcclxuLy8gICAgICAgICBjbGVhckludGVydmFsKHNjcik7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0sIDE1KTtcclxuLy9cclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vIH0pKCk7IiwiLy8g0J/QkNCg0JDQm9CQ0JrQoSDQrdCk0KTQpNCV0JrQoiDQkiDQqNCQ0J/QmtCVINCh0JDQmdCi0JBcclxudmFyIEhlYWRlclBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgcG9ydGZvbGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcG9ydGZvbGlvJyksXHJcbiAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xyXG5cclxuICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKScsXHJcbiAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG4gICAgaWYgKHdpbmRvd1Njcm9sbCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgIGlmIChwb3J0Zm9saW8gIT09IG51bGwpIHtcclxuICAgICAgICBfbW92ZShwb3J0Zm9saW8sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgfTtcclxuICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy8g0JDQndCY0JzQkNCm0JjQryDQmNCa0J7QndCe0Jog0KHQmtCY0JvQntCSXHJcbnZhciBTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgIGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAvLyDQstGL0YfQuNGB0LvRj9C10Lwg0LTQu9C40L3RgyDQvtC60YDRg9C20L3QvtGB0YLQuFxyXG4gIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxyXG4gICAgICBjaXJjbGVMZW5ndGggPSAyICogTWF0aC5QSSAqIGNpcmNsZVJhZGl1cztcclxuXHJcbiAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gIH07XHJcblxyXG4gIC8vINC/0YDQuNC80LXQvdGP0LXQvCDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQstCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG4gICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgLy8g0YTRg9C90LrRhtC40Y8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICB2YXIgY2lyY2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxyXG4gICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXHJcbiAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGVyY2VudDtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcblxyXG4gICAgICBpZiAoc2tpbGxQZXJjZW50IDwgNTApIHtcclxuICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xyXG4gICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgfVxyXG4gICAgfSwgNTAwKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCJ2YXIgU2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgaXRlbXMgPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcclxuICAgIGluZGV4ID0gMSxcclxuICAgIG5keCxcclxuICAgIGR1cmF0aW9uID0gNTAwLFxyXG4gICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcclxuICAgIHNraWxscyA9ICQoJy53b3JrX190ZWNobm9sb2d5JyksXHJcbiAgICBpbWdDb250YWluZXIgPSAkKCcud29ya19fcGljJyk7XHJcblxyXG4gIGZ1bmN0aW9uIF9pbml0KCkge1xyXG4gICAgdmFyIGFjdGl2ZUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcbiAgICAgIGltZ1NyYyA9IGFjdGl2ZUl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgIGFjdGl2ZVRpdGxlID0gYWN0aXZlSXRlbS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICBhY3RpdmVTbGlsbCA9IGFjdGl2ZUl0ZW0uZGF0YSgndGVjaG5vbG9neScpO1xyXG5cclxuICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBpbWdTcmMpO1xyXG4gICAgdGl0bGUudGV4dChhY3RpdmVUaXRsZSk7XHJcbiAgICBza2lsbHMudGV4dChhY3RpdmVTbGlsbCk7XHJcblxyXG4gICAgdmFyIG5leHRJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JykuZXEoaW5kZXggKyAxKTtcclxuICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICB2YXIgcHJldkl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKS5lcShpbmRleCAtIDEpO1xyXG4gICAgcHJldkl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICB2YXIgbmV4dEl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgY3VycmVudEl0ZW0gPSBuZXh0SXRlbXMuZmlsdGVyKCcud29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpLFxyXG4gICAgICByZXFJdGVtID0gbmV4dEl0ZW1zLmVxKG5keCk7XHJcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICd1cCcgPyAtMTAwIDogMTAwO1xyXG5cclxuICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbiAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgJ3RvcCc6IDBcclxuICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgcmVxSXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9tb3ZlTmV4dCgpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgIGlmIChpbmRleCA9PSBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIG5keCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLFxyXG4gICAgICBkaXJlY3Rpb24gPSAnZG93bic7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBuZHggPSAwO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZHggPSBpbmRleCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX3NsaWRlU2hvdygpIHtcclxuICAgIHZhciBmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgbG9hZGVkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICBuZXh0U3JjID0gaXRlbXMuZXEoaW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICBuZXh0VGl0bGUgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgbmV4dFNraWxscyA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgX21vdmVOZXh0KCk7XHJcbiAgICBfbW92ZVByZXYoKTtcclxuXHJcbiAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpdGxlLnNsaWRlVXAoKTtcclxuICAgICAgc2tpbGxzLmZhZGVPdXQoKTtcclxuICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmFkZWRPdXQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpdGxlLnRleHQobmV4dFRpdGxlKTtcclxuICAgICAgc2tpbGxzLnRleHQobmV4dFNraWxscyk7XHJcbiAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBuZXh0U3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkZWQucmVzb2x2ZSgpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbG9hZGVkLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgc2tpbGxzLmZhZGVJbigpO1xyXG4gICAgICBpbWdDb250YWluZXIuZmFkZUluKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfaW5pdCxcclxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoJy50b2dnbGVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19uZXh0JykpIHtcclxuICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfcHJldicpKSB7XHJcbiAgICAgICAgICBpbmRleC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfc2xpZGVTaG93KCk7XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuKCk7IiwidmFyIHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyJyk7XHJcblxyXG5pZiAocHJlbG9hZCAhPT0gbnVsbCkgUHJlbG9hZGVyLmluaXQoKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vTUFJTiBQQVJBTEFYXHJcbiAgdmFyIHBhcmFsYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFyYWxheCcpO1xyXG5cclxuICBpZiAocGFyYWxheCAhPT0gbnVsbCkge1xyXG4gICAgTWFpblBhcmFsYXguaW5pdCgpO1xyXG4gIH1cclxuICAvL1xyXG4gIC8vIGNvbnNvbGUubG9nKHBhcmFsYXgpO1xyXG5cclxuXHJcbiAgLy9GTElQIENBUkRcclxuICB2YXIgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgd2VsY29tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuJyk7XHJcblxyXG4gIGlmIChhdXRoQnRuICE9PSBudWxsKSB7XHJcbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGbGlwLmF1dGgoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdlbGNvbWVCdG4gIT09IG51bGwpIHtcclxuICAgIHdlbGNvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEZsaXAud2VsY29tZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL0JVUkdFUk1FTlVcclxuICB2YXIgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIGlmIChidXJnZXJNZW51ICE9PSBudWxsKSB7XHJcbiAgICBidXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBNZW51LnRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9CTFVSXHJcbiAgdmFyIGJsdXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgaWYgKGJsdXJGb3JtICE9PSBudWxsKSB7XHJcbiAgICBCbHVyLnNldCgpO1xyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbHVyLnNldCgpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG5cclxuICAvL0hFQURFUiBQQVJBTEFYICYgU0tJTExTXHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYmcnKSxcclxuICAgIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgYmxvZ1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jb250YWluZXInKTtcclxuXHJcbiAgLy8g0JLQq9CX0J7QkiDQpNCj0J3QmtCm0JjQryDQn9CeINCh0JrQoNCe0JvQm9CjINCh0KLQoNCQ0J3QmNCm0KtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGJnICE9PSBudWxsKSB7XHJcbiAgICAgIEhlYWRlclBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICBTa2lsbHMuZ3JvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChibG9nV3JhcHBlciAhPT0gbnVsbCkge1xyXG4gICAgICBCbG9nTWVudS5pbml0KCk7XHJcbiAgICAgIEJsb2dNZW51LmluaXRBY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyIHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVtZW51LWJ0bicpO1xyXG5cclxuICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgIHNpZGVNZW51Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsb2dNZW51LnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XHJcblxyXG4gIGlmIChmb3JtICE9PSBudWxsKSB7XHJcbiAgICAvL9C+0YfQuNGB0YLQutCwINC+0YjQuNCx0LrQuFxyXG4gICAgdmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHM7XHJcbiAgICB2YXIgY2xvc2VFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1jYXB0Y2hhX19jbG9zZScpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlucHV0c1tpXS5vbmZvY3VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2lucHV0LWdyb3VwX2Vycm9yJykpIHtcclxuICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlRXJyb3IgIT09IG51bGwpIHtcclxuICAgICAgY2xvc2VFcnJvci5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY2xvc2VFcnJvci5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICB2YXIgdmFsaWQgPSBWYWxpZGF0aW9uLmluaXQoZm9ybSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyh2YWxpZCk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIC8vU0NST0xMIFBBR0VcclxuICB2YXIgc2Nyb2xsTGlua0Rvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfZG93bicpO1xyXG4gIHZhciBzY3JvbGxMaW5rVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfdXAnKTtcclxuXHJcbiAgaWYgKHNjcm9sbExpbmtEb3duICE9PSBudWxsKSB7XHJcbiAgICBzY3JvbGxMaW5rRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGlmIChzY3JvbGxMaW5rVXAgIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UudXAodGhpcyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy9TTElERVJcclxuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xyXG5cclxuICBpZiAoc2xpZGVyICE9PSBudWxsKSB7XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICBTbGlkZXIubW92ZSgpO1xyXG4gICAgfSkoKTtcclxuICB9XHJcblxyXG5cclxufTsiXX0=
