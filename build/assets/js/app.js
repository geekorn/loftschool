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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJsb2dNZW51ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuXG4gIGZ1bmN0aW9uIF9maXhNZW51KCkge1xuICAgIHZhciBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1tZW51JyksXG4gICAgICBuYXZDb29yZHMgPSBzaWRlYmFyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3ODApIHtcbiAgICAgIGlmIChuYXZDb29yZHMgPD0gLTUwKSB7XG4gICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG4gICAgICAgIG5hdi5zdHlsZS50b3AgPSAnMjBweCc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICcyMCUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XG4gICAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIG5hdi5zdHlsZS50b3AgPSAnJztcbiAgICAgIG5hdi5zdHlsZS53aWR0aCA9ICdhdXRvJztcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbml0QWN0aXZlICgpIHtcbiAgICB2YXIgcG9zdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdF9fdGl0bGUnKSxcbiAgICAgIHBvc3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9nLW1lbnVfX2xpbmsnKSxcbiAgICAgIGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb3N0ID0gcG9zdHNbaV0sXG4gICAgICAgIHBvc3RUb3AgPSBwb3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKHBvc3RUb3AgPD0gMTAwKSB7XG4gICAgICAgIGFjdGl2ZUxpbmtbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgICBwb3N0TGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcbiAgdmFyIF9jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IF9maXhNZW51LFxuICAgIGluaXRBY3RpdmU6IF9pbml0QWN0aXZlLFxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9vcGVuJykpIHtcbiAgICAgICAgX29wZW5NZW51KCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX2Nsb3NlTWVudSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKTsiLCIvLyBCTFVSIEVGRkVDVFxyXG52YXIgQmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSxcclxuICAgIGJsdXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm0nKSxcclxuICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKS5vZmZzZXRXaWR0aCxcclxuICAgICAgICBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJyksXHJcbiAgICAgICAgaW1nQ29vcmRzID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHNlY3Rpb25Db29yZHMgPSBzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIGJsdXJDb29yZHMgPSBibHVyV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBwb3NMZWZ0ID0gLWJsdXJXcmFwcGVyLm9mZnNldExlZnQsXHJcbiAgICAgICAgcG9zVG9wID0gaW1nLm9mZnNldFRvcCAtIGJsdXJXcmFwcGVyLm9mZnNldFRvcCxcclxuICAgICAgICBibHVyQ1NTID0gYmx1ci5zdHlsZTtcclxuXHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy8gaW5kZXggZmxpcFxyXG52YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XHJcblxyXG4gIHZhciBfYXV0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9O1xyXG5cclxuICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcclxuICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aDogX2F1dGgsXHJcbiAgICB3ZWxjb21lOiBfd2VsY29tZVxyXG4gIH1cclxuXHJcbn0pKCk7IiwidmFyIFZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgZXJyb3JGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1tc2cnKSxcbiAgICBjYXB0Y2hhRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZV9fZXJyb3InKSxcbiAgICBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2NvbnRhaW5lcicpO1xuXG4gIHZhciBfaW5pdCA9IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgdmFyIGVsZW1zID0gZm9ybS5lbGVtZW50cztcblxuICAgIGNvbnNvbGUubG9nKGVsZW1zKTtcbiAgICByZXR1cm4gX3ZhbGlkYXRlKGVsZW1zKSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBmdW5jdGlvbiBfdmFsaWRhdGUoaW5wdXRzKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlucHV0c1tpXS50YWdOYW1lID09PSAnQlVUVE9OJykgY29udGludWU7XG5cbiAgICAgIHZhciBlbGVtID0gaW5wdXRzW2ldO1xuXG4gICAgICBpZiAoZWxlbS52YWx1ZSA9PSAnJykge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtKTtcbiAgICAgICAgcmV0dXJuIF9zaG93RXJyb3IoZWxlbSlcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpIHtcblxuICAgICAgICBpZiAoZWxlbS5jaGVja2VkICYmIGVsZW0udmFsdWUgPT09ICd5ZXMnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICBjYXB0Y2hhRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIH07XG5cbiAgZnVuY3Rpb24gX3Nob3dFcnJvcihlbGVtKSB7XG4gICAgdmFyIHRleHQgPSBlbGVtLmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBwb3NpdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBlbGVtLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XG4gICAgZXJyb3JGaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBlcnJvckZpZWxkLmlubmVyVGV4dCA9ICfQktGLINC90LUg0LLQstC10LvQuCAnICsgdGV4dDtcblxuICAgIC8vIGlmIChwb3NpdGlvbiA+IGZvcm1Db250YWluZXIub2Zmc2V0SGVpZ2h0KVxuICAgIGVycm9yRmllbGQuc3R5bGUudG9wID0gcG9zaXRpb24gKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gX2NsZWFyRXJyb3IoZWxlbSkge1xuICAgIGNvbnNvbGUubG9nKGVsZW0pO1xuICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC1ncm91cF9lcnJvcicpO1xuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfaW5pdCxcbiAgICBjbGVhcjogX2NsZWFyRXJyb3JcbiAgfVxufSkoKTsiLCJmdW5jdGlvbiBpbml0TWFwICgpIHtcclxuICB2YXIgcG9pbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg3MDY5LCAzNy40NzgyMjApLFxyXG4gICAgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43ODYyNzMsIDM3LjQxODYyMyk7XHJcblxyXG4gIHZhciBzdHlsZXMgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ0NDQ0NFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjOTZkN2M4XCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dO1xyXG5cclxuICB2YXIgc3R5bGVkTWFwID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLFxyXG4gICAge25hbWU6IFwiU3R5bGVkIE1hcFwifSk7XHJcblxyXG4gIHZhciBtYXBTZXR0aW5ncyA9IHtcclxuICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgem9vbTogMTMsXHJcbiAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgbWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWFwX3N0eWxlJ11cclxuICAgIH0sXHJcbiAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgIHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX1RPUFxyXG4gICAgfSxcclxuICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwU2V0dGluZ3MpO1xyXG5cclxuICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICBpY29uOiAnYXNzZXRzL2ltZy9kZWNvci9tYXBfbWFya2VyLnBuZycsXHJcbiAgICBwb3NpdGlvbjogcG9pbnRlcixcclxuICAgIG1hcDogbWFwLFxyXG4gICAgdGl0bGU6IFwiSSdtIGhlcmUhXCIsXHJcbiAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0VcclxuICB9KTtcclxuXHJcbiAgbWFwLm1hcFR5cGVzLnNldCgnbWFwX3N0eWxlJywgc3R5bGVkTWFwKTtcclxuICBtYXAuc2V0TWFwVHlwZUlkKCdtYXBfc3R5bGUnKTtcclxufTtcclxuIiwidmFyIE1lbnUgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpLFxyXG4gICAgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItYnRuX2Nsb3NlZCcpO1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICghbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpKSA/ICdoaWRkZW4nIDogJ2F1dG8nO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTsiLCIvL2luZGV4IHBhcmFsYXhcclxudmFyIE1haW5QYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKSxcclxuICAgICAgbGF5ZXJzID0gcGFyYWxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XHJcblxyXG4gICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF9kaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8v0LTQu9GPINC/0LvQsNC90YjQtdGC0L7QsiDQuCDRgtC10LvQtdGE0L7QvdC+0LIg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0L/RgNC+0YHRgtC+INC60LDRgNGC0LjQvdC60YMsINCwINC90LUg0LPRgNGD0LfQuNGC0Ywg0LLQtdGB0Ywg0L/QsNGA0LDQu9Cw0LrRgVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfc2hvd1xyXG4gIH07XHJcblxyXG59KSgpOyIsInZhciBQcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpLFxuICAgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5kZXgtd3JhcHBlcicpLFxuICAgIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLFxuICAgIGZsaXBDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKSxcbiAgICBwcm9jZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyX19wZXJjZW50JyksXG4gICAgcGVyY2VudCA9IDAsXG4gICAgcGVyY2VudFN0ZXAgPSAxMDAgLyAoaW1hZ2VzLmxlbmd0aCArIDAuNCk7XG5cbiAgZnVuY3Rpb24gX2xvYWRJbWFnZShpbWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwZXJjZW50ICsgcGVyY2VudFN0ZXApO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50LCBwZXJjZW50U3RlcCk7XG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICB9O1xuICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdChpbWcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3Nob3dMb2FkZXIoaW1nTGlzdCkge1xuICAgIHZhciBwcm9taXNlSW1nID0gaW1nTGlzdC5tYXAoX2xvYWRJbWFnZSk7XG5cbiAgICBQcm9taXNlLmFsbChwcm9taXNlSW1nKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgcGVyY2VudCA9IDEwMDtcbiAgICAgICAgcHJvY2VudEZpZWxkLmlubmVySFRNTCA9IHBlcmNlbnQgKyAnJSc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxvYWRlci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICAgIC8vIGxvYWRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRlcik7XG4gICAgICAgICAgbG9hZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0sIDE1MDApXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGlwQ2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMSwwLDAsIDBkZWcpJztcbiAgICAgICAgfSwgMTUwMClcbiAgICAgIH0pXG4gIH07XG5cbmZ1bmN0aW9uIF9jbG9zZUxvYWRlcigpIHtcbiAgdmFyIGltZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGltYWdlcyk7XG5cbiAgX3Nob3dMb2FkZXIoaW1nQXJyKTtcbn07XG5cblxucmV0dXJuIHtcbiAgaW5pdDogX2Nsb3NlTG9hZGVyXG59XG5cbn0pXG4oKTtcblxuXG4vKlxuIDEgLSDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHQsNC8INC/0YDQtdC70L7QsNC00LXRgFxuIDIgLSDQstC30Y/RgtGMINCy0YHQtSDQutCw0YDRgtC40L3QutC4INC90LAg0YHRgtGA0LDQvdC40YbQtVxuIDMgLSDQv9C+INC80LXRgNC1INC30LDQs9GA0YPQt9C60Lgg0LrQsNGA0YLQuNC90L7QuiDQvNC10L3Rj9GC0Ywg0L/RgNC+0YbQtdC90YLRi1xuIDQgLSDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDRg9Cx0YDQsNGC0Ywg0L/RgNC10LvQvtCw0LTQtdGAXG4gKi8iLCJ2YXIgU2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkb3duOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICB2YXIgc2VjdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vXHJcbi8vIHZhciBzY3JvbGxQYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuLy8gICB2YXIgc3BlZWQgPSAxLFxyXG4vLyAgICAgY3VycmVudFBvc2l0aW9uLFxyXG4vLyAgICAgZGlzdFBvc2l0aW9uO1xyXG4vL1xyXG4vLyAgIHNwZWVkID0gKGN1cnJlbnRQb3NpdGlvbiAtIGRpc3RQb3NpdGlvbikgLyAxMDAwO1xyXG4vL1xyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBkb3duVG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbi8vICAgICB2YXIgZGlzdFBvc2l0aW9uID0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbi8vXHJcbi8vICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbi8vXHJcbi8vICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBkaXN0UG9zaXRpb24pO1xyXG4vL1xyXG4vLyAgICAgICBpZiAodG9wID4gMTAwMCkge1xyXG4vLyAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2NyKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSwgMTUpO1xyXG4vL1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gfSkoKTsiLCIvLyDQn9CQ0KDQkNCb0JDQmtChINCt0KTQpNCk0JXQmtCiINCSINCo0JDQn9Ca0JUg0KHQkNCZ0KLQkFxyXG52YXIgSGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICBwb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19wb3J0Zm9saW8nKSxcclxuICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJyk7XHJcblxyXG4gIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJyxcclxuICAgICAgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgaWYgKHBvcnRmb2xpbyAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9tb3ZlKHBvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xyXG4gICAgICB9O1xyXG4gICAgICBfbW92ZSh1c2VyLCB3U2Nyb2xsLCAzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSkoKTsiLCIvLyDQkNCd0JjQnNCQ0KbQmNCvINCY0JrQntCd0J7QmiDQodCa0JjQm9Ce0JJcclxudmFyIFNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gIC8vINCy0YvRh9C40YHQu9GP0LXQvCDQtNC70LjQvdGDINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgdmFyIGNpcmNsZUxlbmd0aCA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgIHJldHVybiBjaXJjbGVMZW5ndGg7XHJcbiAgfTtcclxuXHJcbiAgLy8g0L/RgNC40LzQtdC90Y/QtdC8INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCy0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xyXG5cclxuICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICAgIHNraWxsUGVyY2VudCA9IHNraWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JyksXHJcbiAgICAgIGxlbmd0aCA9IGNpcmNsZUxlbmd0aChjaXJjbGVGaWxsKSxcclxuICAgICAgcGVyY2VudCA9IGxlbmd0aCAqICgxMDAgLSBza2lsbFBlcmNlbnQpIC8gMTAwO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgIHNraWxsLnN0eWxlLm9wYWNpdHkgPSAwLjQ7XHJcbiAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ3JvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcclxuICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uID0gY2lyY2xlUG9zIC0gd2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgY2lyY2xlQW5pbWF0aW9uKHNraWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsInZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBpdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgaW5kZXggPSAxLFxyXG4gICAgbmR4LFxyXG4gICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICB0aXRsZSA9ICQoJy53b3JrX190aXRsZScpLFxyXG4gICAgc2tpbGxzID0gJCgnLndvcmtfX3RlY2hub2xvZ3knKSxcclxuICAgIGltZ0NvbnRhaW5lciA9ICQoJy53b3JrX19waWMnKTtcclxuXHJcbiAgZnVuY3Rpb24gX2luaXQoKSB7XHJcbiAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmVxKGluZGV4KSxcclxuICAgICAgaW1nU3JjID0gYWN0aXZlSXRlbS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcclxuICAgICAgYWN0aXZlVGl0bGUgPSBhY3RpdmVJdGVtLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgIGFjdGl2ZVNsaWxsID0gYWN0aXZlSXRlbS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIGltZ1NyYyk7XHJcbiAgICB0aXRsZS50ZXh0KGFjdGl2ZVRpdGxlKTtcclxuICAgIHNraWxscy50ZXh0KGFjdGl2ZVNsaWxsKTtcclxuXHJcbiAgICB2YXIgbmV4dEl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKS5lcShpbmRleCArIDEpO1xyXG4gICAgbmV4dEl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICAgIHZhciBwcmV2SXRlbSA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLmVxKGluZGV4IC0gMSk7XHJcbiAgICBwcmV2SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pIHtcclxuICAgIHZhciBuZXh0SXRlbXMgPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICBjdXJyZW50SXRlbSA9IG5leHRJdGVtcy5maWx0ZXIoJy53b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JyksXHJcbiAgICAgIHJlcUl0ZW0gPSBuZXh0SXRlbXMuZXEobmR4KTtcclxuICAgIGRpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xMDAgOiAxMDA7XHJcblxyXG4gICAgY3VycmVudEl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICd0b3AnOiBkaXJlY3Rpb24gKyAnJSdcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAndG9wJzogMFxyXG4gICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY3VycmVudEl0ZW0ucmVtb3ZlQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb24gKyAnJScpO1xyXG4gICAgICByZXFJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX21vdmVOZXh0KCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JyksXHJcbiAgICAgIGRpcmVjdGlvbiA9ICd1cCc7XHJcblxyXG4gICAgaWYgKGluZGV4ID09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgbmR4ID0gMDtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZHggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX21vdmVQcmV2KCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9ICQoJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JyksXHJcbiAgICAgIGRpcmVjdGlvbiA9ICdkb3duJztcclxuXHJcbiAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIG5keCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4IDw9IDApIHtcclxuICAgICAgbmR4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5keCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfc2xpZGVTaG93KCkge1xyXG4gICAgdmFyIGZhZGVkT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICBsb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgIG5leHRTcmMgPSBpdGVtcy5lcShpbmRleCkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgIG5leHRUaXRsZSA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICBuZXh0U2tpbGxzID0gaXRlbXMuZXEoaW5kZXgpLmRhdGEoJ3RlY2hub2xvZ3knKTtcclxuXHJcbiAgICBfbW92ZU5leHQoKTtcclxuICAgIF9tb3ZlUHJldigpO1xyXG5cclxuICAgIGltZ0NvbnRhaW5lci5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGl0bGUuc2xpZGVVcCgpO1xyXG4gICAgICBza2lsbHMuZmFkZU91dCgpO1xyXG4gICAgICBmYWRlZE91dC5yZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmYWRlZE91dC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGl0bGUudGV4dChuZXh0VGl0bGUpO1xyXG4gICAgICBza2lsbHMudGV4dChuZXh0U2tpbGxzKTtcclxuICAgICAgaW1nQ29udGFpbmVyLmF0dHIoJ3NyYycsIG5leHRTcmMpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxvYWRlZC5yZXNvbHZlKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBsb2FkZWQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpdGxlLnNsaWRlRG93bigpO1xyXG4gICAgICBza2lsbHMuZmFkZUluKCk7XHJcbiAgICAgIGltZ0NvbnRhaW5lci5mYWRlSW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IF9pbml0LFxyXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJCgnLnRvZ2dsZV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX25leHQnKSkge1xyXG4gICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9IGVsc2UgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19wcmV2JykpIHtcclxuICAgICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBpbmRleCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9zbGlkZVNob3coKTtcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4oKTsiLCJ2YXIgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKTtcclxuXHJcbmlmIChwcmVsb2FkICE9PSBudWxsKSBQcmVsb2FkZXIuaW5pdCgpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy9NQUlOIFBBUkFMQVhcclxuICB2YXIgcGFyYWxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGF4ICE9PSBudWxsKSB7XHJcbiAgICBNYWluUGFyYWxheC5pbml0KCk7XHJcbiAgfVxyXG4gIC8vXHJcbiAgLy8gY29uc29sZS5sb2cocGFyYWxheCk7XHJcblxyXG5cclxuICAvL0ZMSVAgQ0FSRFxyXG4gIHZhciBhdXRoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGgtYnV0dG9uJyksXHJcbiAgICB3ZWxjb21lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1yZXR1cm4nKTtcclxuXHJcbiAgaWYgKGF1dGhCdG4gIT09IG51bGwpIHtcclxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEZsaXAuYXV0aCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAod2VsY29tZUJ0biAhPT0gbnVsbCkge1xyXG4gICAgd2VsY29tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgRmxpcC53ZWxjb21lKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vQlVSR0VSTUVOVVxyXG4gIHZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1idG4nKTtcclxuXHJcbiAgaWYgKGJ1cmdlck1lbnUgIT09IG51bGwpIHtcclxuICAgIGJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIE1lbnUudG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvL0JMVVJcclxuICB2YXIgYmx1ckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xyXG5cclxuICBpZiAoYmx1ckZvcm0gIT09IG51bGwpIHtcclxuICAgIEJsdXIuc2V0KCk7XHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsdXIuc2V0KCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcblxyXG4gIHZhciBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG5cclxuICBpZiAoZm9ybSAhPT0gbnVsbCkge1xyXG4gICAgLy/QvtGH0LjRgdGC0LrQsCDQvtGI0LjQsdC60LhcclxuICAgIHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzO1xyXG4gICAgdmFyIGNsb3NlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZXJyb3ItY2FwdGNoYV9fY2xvc2UnKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpbnB1dHNbaV0ub25mb2N1cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnB1dC1ncm91cF9lcnJvcicpKSB7XHJcbiAgICAgICAgICBWYWxpZGF0aW9uLmNsZWFyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbG9zZUVycm9yICE9PSBudWxsKSB7XHJcbiAgICAgIGNsb3NlRXJyb3Iub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNsb3NlRXJyb3IucGFyZW50Tm9kZS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgdmFyIHZhbGlkID0gVmFsaWRhdGlvbi5pbml0KGZvcm0pO1xyXG5cclxuICAgICAgY29uc29sZS5sb2codmFsaWQpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICAvL1NDUk9MTCBQQUdFXHJcbiAgdmFyIHNjcm9sbExpbmtEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC1saW5rX2Rvd24nKTtcclxuICB2YXIgc2Nyb2xsTGlua1VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC1saW5rX3VwJyk7XHJcblxyXG4gIGlmIChzY3JvbGxMaW5rRG93biAhPT0gbnVsbCkge1xyXG4gICAgc2Nyb2xsTGlua0Rvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBTY3JvbGxQYWdlLmRvd24odGhpcyk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBpZiAoc2Nyb2xsTGlua1VwICE9PSBudWxsKSB7XHJcbiAgICBzY3JvbGxMaW5rVXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBTY3JvbGxQYWdlLnVwKHRoaXMpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vU0xJREVSXHJcbiAgdmFyIHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JrX19zbGlkZXInKTtcclxuXHJcbiAgaWYgKHNsaWRlciAhPT0gbnVsbCkge1xyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gU2xpZGVyLmluaXQoKTtcclxuICAgICAgU2xpZGVyLmluaXQoKTtcclxuICAgICAgU2xpZGVyLm1vdmUoKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICAvL0hFQURFUiBQQVJBTEFYICYgU0tJTExTXHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYmcnKSxcclxuICAgIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgYmxvZ1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxvZy1jb250YWluZXInKTtcclxuXHJcbiAgLy8g0JLQq9CX0J7QkiDQpNCj0J3QmtCm0JjQryDQn9CeINCh0JrQoNCe0JvQm9CjINCh0KLQoNCQ0J3QmNCm0KtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGJnICE9PSBudWxsKSB7XHJcbiAgICAgIEhlYWRlclBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNraWxscyAhPT0gbnVsbCkge1xyXG4gICAgICBTa2lsbHMuZ3JvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChibG9nV3JhcHBlciAhPT0gbnVsbCkge1xyXG4gICAgICBCbG9nTWVudS5pbml0KCk7XHJcbiAgICAgIEJsb2dNZW51LmluaXRBY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyIHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVtZW51LWJ0bicpO1xyXG5cclxuICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgIHNpZGVNZW51Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsb2dNZW51LnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgQmxvZ01lbnUuaW5pdCgpO1xyXG4gIH1cclxuXHJcblxyXG59OyJdfQ==
