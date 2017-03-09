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
  var items = $('.slider__item'),
    activeItem,
    index = 0,
    ndx,
    nextSlide,
    duration = 500;

  function createImgList () {

  }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2ctbWVudS5qcyIsImJsdXIuanMiLCJmbGlwLmpzIiwiZm9ybXMuanMiLCJnb29nbGUtbWFwLmpzIiwibWFpbi1tZW51LmpzIiwibWFpbi1wYXJhbGF4LmpzIiwicHJlbG9hZGVyLmpzIiwic2Nyb2xsLXBhZ2UuanMiLCJzY3JvbGwtcGFyYWxheC5qcyIsInNraWxscy5qcyIsInNsaWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmxvZ01lbnUgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgZnVuY3Rpb24gX2ZpeE1lbnUoKSB7XG4gICAgdmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLW1lbnUnKSxcbiAgICAgIG5hdkNvb3JkcyA9IHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgaWYgKG5hdkNvb3JkcyA8PSAtNTApIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgbmF2LnN0eWxlLnRvcCA9ICcyMHB4JztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJzIwJSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbml0QWN0aXZlICgpIHtcbiAgICB2YXIgcG9zdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdF9fdGl0bGUnKSxcbiAgICAgIHBvc3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ibG9nLW1lbnVfX2xpbmsnKSxcbiAgICAgIGFjdGl2ZUxpbmsgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb3N0ID0gcG9zdHNbaV0sXG4gICAgICAgIHBvc3RUb3AgPSBwb3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgaWYgKHBvc3RUb3AgPD0gMTAwKSB7XG4gICAgICAgIGFjdGl2ZUxpbmtbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgICBwb3N0TGlua3NbaV0uY2xhc3NMaXN0LmFkZCgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcbiAgdmFyIF9jbG9zZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyX29wZW4nKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IF9maXhNZW51LFxuICAgIGluaXRBY3RpdmU6IF9pbml0QWN0aXZlLFxuICAgIHRvZ2dsZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhcl9vcGVuJykpIHtcbiAgICAgICAgX29wZW5NZW51KCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX2Nsb3NlTWVudSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKTsiLCIvLyBCTFVSIEVGRkVDVFxyXG52YXIgQmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2snKSxcclxuICAgIGJsdXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm0nKSxcclxuICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpbWdXaWR0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKS5vZmZzZXRXaWR0aCxcclxuICAgICAgICBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJyksXHJcbiAgICAgICAgaW1nQ29vcmRzID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHNlY3Rpb25Db29yZHMgPSBzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIGJsdXJDb29yZHMgPSBibHVyV3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBwb3NMZWZ0ID0gLWJsdXJXcmFwcGVyLm9mZnNldExlZnQsXHJcbiAgICAgICAgcG9zVG9wID0gaW1nLm9mZnNldFRvcCAtIGJsdXJXcmFwcGVyLm9mZnNldFRvcCxcclxuICAgICAgICBibHVyQ1NTID0gYmx1ci5zdHlsZTtcclxuXHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy8gaW5kZXggZmxpcFxyXG52YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XHJcblxyXG4gIHZhciBfYXV0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9O1xyXG5cclxuICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcclxuICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aDogX2F1dGgsXHJcbiAgICB3ZWxjb21lOiBfd2VsY29tZVxyXG4gIH1cclxuXHJcbn0pKCk7IiwidmFyIFZhbGlkYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgZXJyb3JGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1tc2cnKSxcbiAgICBjYXB0Y2hhRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZV9fZXJyb3InKSxcbiAgICBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2NvbnRhaW5lcicpO1xuXG4gIHZhciBfaW5pdCA9IGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgdmFyIGVsZW1zID0gZm9ybS5lbGVtZW50cztcblxuICAgIGNvbnNvbGUubG9nKGVsZW1zKTtcbiAgICByZXR1cm4gX3ZhbGlkYXRlKGVsZW1zKSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICBmdW5jdGlvbiBfdmFsaWRhdGUoaW5wdXRzKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlucHV0c1tpXS50YWdOYW1lID09PSAnQlVUVE9OJykgY29udGludWU7XG5cbiAgICAgIHZhciBlbGVtID0gaW5wdXRzW2ldO1xuXG4gICAgICBpZiAoZWxlbS52YWx1ZSA9PSAnJykge1xuICAgICAgICBjb25zb2xlLmxvZyhlbGVtKTtcbiAgICAgICAgcmV0dXJuIF9zaG93RXJyb3IoZWxlbSlcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpIHtcblxuICAgICAgICBpZiAoZWxlbS5jaGVja2VkICYmIGVsZW0udmFsdWUgPT09ICd5ZXMnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICBjYXB0Y2hhRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuXG4gIH07XG5cbiAgZnVuY3Rpb24gX3Nob3dFcnJvcihlbGVtKSB7XG4gICAgdmFyIHRleHQgPSBlbGVtLmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBwb3NpdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBlbGVtLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XG4gICAgZXJyb3JGaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBlcnJvckZpZWxkLmlubmVyVGV4dCA9ICfQktGLINC90LUg0LLQstC10LvQuCAnICsgdGV4dDtcblxuICAgIC8vIGlmIChwb3NpdGlvbiA+IGZvcm1Db250YWluZXIub2Zmc2V0SGVpZ2h0KVxuICAgIGVycm9yRmllbGQuc3R5bGUudG9wID0gcG9zaXRpb24gKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gX2NsZWFyRXJyb3IoZWxlbSkge1xuICAgIGNvbnNvbGUubG9nKGVsZW0pO1xuICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC1ncm91cF9lcnJvcicpO1xuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfaW5pdCxcbiAgICBjbGVhcjogX2NsZWFyRXJyb3JcbiAgfVxufSkoKTsiLCJmdW5jdGlvbiBpbml0TWFwICgpIHtcclxuICB2YXIgcG9pbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg3MDY5LCAzNy40NzgyMjApLFxyXG4gICAgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43ODYyNzMsIDM3LjQxODYyMyk7XHJcblxyXG4gIHZhciBzdHlsZXMgPSBbe1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzQ0NDQ0NFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmMmYyZjJcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOi0xMDB9LHtcImxpZ2h0bmVzc1wiOjQ1fV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmhpZ2h3YXlcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwic2ltcGxpZmllZFwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLmljb25cIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInRyYW5zaXRcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib2ZmXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjOTZkN2M4XCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX1dO1xyXG5cclxuICB2YXIgc3R5bGVkTWFwID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLFxyXG4gICAge25hbWU6IFwiU3R5bGVkIE1hcFwifSk7XHJcblxyXG4gIHZhciBtYXBTZXR0aW5ncyA9IHtcclxuICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgem9vbTogMTMsXHJcbiAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgbWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWFwX3N0eWxlJ11cclxuICAgIH0sXHJcbiAgICB6b29tQ29udHJvbDogdHJ1ZSxcclxuICAgIHpvb21Db250cm9sT3B0aW9uczoge1xyXG4gICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX1RPUFxyXG4gICAgfSxcclxuICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwU2V0dGluZ3MpO1xyXG5cclxuICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICBpY29uOiAnYXNzZXRzL2ltZy9kZWNvci9tYXBfbWFya2VyLnBuZycsXHJcbiAgICBwb3NpdGlvbjogcG9pbnRlcixcclxuICAgIG1hcDogbWFwLFxyXG4gICAgdGl0bGU6IFwiSSdtIGhlcmUhXCIsXHJcbiAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0VcclxuICB9KTtcclxuXHJcbiAgbWFwLm1hcFR5cGVzLnNldCgnbWFwX3N0eWxlJywgc3R5bGVkTWFwKTtcclxuICBtYXAuc2V0TWFwVHlwZUlkKCdtYXBfc3R5bGUnKTtcclxufTtcclxuIiwidmFyIE1lbnUgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpLFxyXG4gICAgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItYnRuX2Nsb3NlZCcpO1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICghbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpKSA/ICdoaWRkZW4nIDogJ2F1dG8nO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTsiLCIvL2luZGV4IHBhcmFsYXhcclxudmFyIE1haW5QYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKSxcclxuICAgICAgbGF5ZXJzID0gcGFyYWxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XHJcblxyXG4gICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF9kaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8v0LTQu9GPINC/0LvQsNC90YjQtdGC0L7QsiDQuCDRgtC10LvQtdGE0L7QvdC+0LIg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0L/RgNC+0YHRgtC+INC60LDRgNGC0LjQvdC60YMsINCwINC90LUg0LPRgNGD0LfQuNGC0Ywg0LLQtdGB0Ywg0L/QsNGA0LDQu9Cw0LrRgVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfc2hvd1xyXG4gIH07XHJcblxyXG59KSgpOyIsInZhciBQcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpLFxuICAgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5kZXgtd3JhcHBlcicpLFxuICAgIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLFxuICAgIGZsaXBDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKSxcbiAgICBwcm9jZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyX19wZXJjZW50JyksXG4gICAgcGVyY2VudCA9IDAsXG4gICAgcGVyY2VudFN0ZXAgPSAxMDAgLyAoaW1hZ2VzLmxlbmd0aCArIDAuNCk7XG5cbiAgZnVuY3Rpb24gX2xvYWRJbWFnZShpbWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwZXJjZW50ICsgcGVyY2VudFN0ZXApO1xuICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50LCBwZXJjZW50U3RlcCk7XG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICB9O1xuICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlamVjdChpbWcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gX3Nob3dMb2FkZXIoaW1nTGlzdCkge1xuICAgIHZhciBwcm9taXNlSW1nID0gaW1nTGlzdC5tYXAoX2xvYWRJbWFnZSk7XG5cbiAgICBQcm9taXNlLmFsbChwcm9taXNlSW1nKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgcGVyY2VudCA9IDEwMDtcbiAgICAgICAgcHJvY2VudEZpZWxkLmlubmVySFRNTCA9IHBlcmNlbnQgKyAnJSc7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxvYWRlci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICAgIC8vIGxvYWRlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxvYWRlcik7XG4gICAgICAgICAgbG9hZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0sIDE1MDApXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBmbGlwQ2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMSwwLDAsIDBkZWcpJztcbiAgICAgICAgfSwgMTUwMClcbiAgICAgIH0pXG4gIH07XG5cbmZ1bmN0aW9uIF9jbG9zZUxvYWRlcigpIHtcbiAgdmFyIGltZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGltYWdlcyk7XG5cbiAgX3Nob3dMb2FkZXIoaW1nQXJyKTtcbn07XG5cblxucmV0dXJuIHtcbiAgaW5pdDogX2Nsb3NlTG9hZGVyXG59XG5cbn0pXG4oKTtcblxuXG4vKlxuIDEgLSDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHQsNC8INC/0YDQtdC70L7QsNC00LXRgFxuIDIgLSDQstC30Y/RgtGMINCy0YHQtSDQutCw0YDRgtC40L3QutC4INC90LAg0YHRgtGA0LDQvdC40YbQtVxuIDMgLSDQv9C+INC80LXRgNC1INC30LDQs9GA0YPQt9C60Lgg0LrQsNGA0YLQuNC90L7QuiDQvNC10L3Rj9GC0Ywg0L/RgNC+0YbQtdC90YLRi1xuIDQgLSDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LLRgdC10YUg0LrQsNGA0YLQuNC90L7QuiDRg9Cx0YDQsNGC0Ywg0L/RgNC10LvQvtCw0LTQtdGAXG4gKi8iLCJ2YXIgU2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkb3duOiBmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICB2YXIgc2VjdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgICAgICBwb3NUb3AgPSBzZWN0aW9uLm9mZnNldFRvcDtcclxuXHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTtcclxuXHJcbi8vXHJcbi8vIHZhciBzY3JvbGxQYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuLy8gICB2YXIgc3BlZWQgPSAxLFxyXG4vLyAgICAgY3VycmVudFBvc2l0aW9uLFxyXG4vLyAgICAgZGlzdFBvc2l0aW9uO1xyXG4vL1xyXG4vLyAgIHNwZWVkID0gKGN1cnJlbnRQb3NpdGlvbiAtIGRpc3RQb3NpdGlvbikgLyAxMDAwO1xyXG4vL1xyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBkb3duVG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbi8vICAgICB2YXIgZGlzdFBvc2l0aW9uID0gZWxlbWVudC5vZmZzZXRUb3A7XHJcbi8vXHJcbi8vICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbi8vXHJcbi8vICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBkaXN0UG9zaXRpb24pO1xyXG4vL1xyXG4vLyAgICAgICBpZiAodG9wID4gMTAwMCkge1xyXG4vLyAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2NyKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSwgMTUpO1xyXG4vL1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy8gfSkoKTsiLCIvLyDQn9CQ0KDQkNCb0JDQmtChINCt0KTQpNCk0JXQmtCiINCSINCo0JDQn9Ca0JUg0KHQkNCZ0KLQkFxyXG52YXIgSGVhZGVyUGFyYWxsYXggPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICBwb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19wb3J0Zm9saW8nKSxcclxuICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJyk7XHJcblxyXG4gIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnLFxyXG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJyxcclxuICAgICAgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICBpZiAod2luZG93U2Nyb2xsIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgX21vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgaWYgKHBvcnRmb2xpbyAhPT0gbnVsbCkge1xyXG4gICAgICAgIF9tb3ZlKHBvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xyXG4gICAgICB9O1xyXG4gICAgICBfbW92ZSh1c2VyLCB3U2Nyb2xsLCAzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSkoKTsiLCIvLyDQkNCd0JjQnNCQ0KbQmNCvINCY0JrQntCd0J7QmiDQodCa0JjQm9Ce0JJcclxudmFyIFNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5za2lsbCcpLFxyXG4gICAgY2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gIC8vINCy0YvRh9C40YHQu9GP0LXQvCDQtNC70LjQvdGDINC+0LrRgNGD0LbQvdC+0YHRgtC4XHJcbiAgdmFyIGNpcmNsZUxlbmd0aCA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgIGNpcmNsZUxlbmd0aCA9IDIgKiBNYXRoLlBJICogY2lyY2xlUmFkaXVzO1xyXG5cclxuICAgIHJldHVybiBjaXJjbGVMZW5ndGg7XHJcbiAgfTtcclxuXHJcbiAgLy8g0L/RgNC40LzQtdC90Y/QtdC8INC6INC+0LrRgNGD0LbQvdC+0YHRgtC4INGB0LLQvtC50YHRgtCy0LAg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICBbXS5zbGljZS5jYWxsKGNpcmNsZXMpLmZvckVhY2goZnVuY3Rpb24gKGNpcmNsZSkge1xyXG5cclxuICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaGFycmF5ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gIHZhciBjaXJjbGVBbmltYXRpb24gPSBmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUtc2Vjb25kJyksXHJcbiAgICAgIHNraWxsUGVyY2VudCA9IHNraWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JyksXHJcbiAgICAgIGxlbmd0aCA9IGNpcmNsZUxlbmd0aChjaXJjbGVGaWxsKSxcclxuICAgICAgcGVyY2VudCA9IGxlbmd0aCAqICgxMDAgLSBza2lsbFBlcmNlbnQpIC8gMTAwO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xyXG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuXHJcbiAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgIHNraWxsLnN0eWxlLm9wYWNpdHkgPSAwLjQ7XHJcbiAgICAgICAgc2tpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG4gICAgICB9XHJcbiAgICB9LCA1MDApO1xyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ3JvdzogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChza2lsbHMpLmZvckVhY2goZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICBjaXJjbGVQb3MgPSBjaXJjbGVSZWN0LmJvdHRvbSxcclxuICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uID0gY2lyY2xlUG9zIC0gd2luZG93SGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgY2lyY2xlQW5pbWF0aW9uKHNraWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsInZhciBTbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBpdGVtcyA9ICQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgIGFjdGl2ZUl0ZW0sXHJcbiAgICBpbmRleCA9IDAsXHJcbiAgICBuZHgsXHJcbiAgICBuZXh0U2xpZGUsXHJcbiAgICBkdXJhdGlvbiA9IDUwMDtcclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlSW1nTGlzdCAoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX2luaXQoKSB7XHJcbiAgICBhY3RpdmVJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG4gICAgX21vdmVOZXh0KCk7XHJcbiAgICBfbW92ZVByZXYoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9zbGlkZVNob3coKSB7XHJcbiAgICB2YXIgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLnNsaWRlcl9faXRlbV9hY3RpdmUnKSxcclxuICAgICAgcmVxSXRlbSA9IGl0ZW1zLmVxKGluZGV4KTtcclxuXHJcbiAgICBfbW92ZU5leHQoKTtcclxuICAgIF9tb3ZlUHJldigpO1xyXG5cclxuICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgIHJlcUl0ZW0uYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBfbW92ZU5leHQoKSB7XHJcbiAgICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBuZHggPSAwO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgbmR4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5keCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhuZXh0U2xpZGUpO1xyXG4gIHZhciBjdXJyZW50SXRlbSA9IGl0ZW1zLmVxKG5keCksXHJcbiAgICBjdXJyZW50SW1nID0gY3VycmVudEl0ZW0uZmluZCgnLndvcmtfX3BpYycpLmF0dHIoXCJzcmNcIiksXHJcbiAgICBuZXh0SW1nID0gY3VycmVudEl0ZW0uZmluZCgnLndvcmtfX3BpYycpLmF0dHIoXCJzcmNcIiksXHJcbiAgICBpbWdDb250YWluZXIgPSAkKCcuYnRuLXNsaWRlcl9faW1nX2N1cnJlbnQnKSxcclxuICAgIG5leHRDb250YWluZXIgPSAkKCcuYnRuLXNsaWRlcl9faW1nX25leHQnKTtcclxuXHJcbiAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgY3VycmVudEltZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoKSB7XHJcbiAgICBuZHggPSAwO1xyXG4gIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBuZHggPSBpbmRleCAtIDE7XHJcbiAgfVxyXG5cclxuICB2YXIgY3VycmVudEl0ZW0gPSBpdGVtcy5lcShuZHgpLFxyXG4gICAgY3VycmVudEltZyA9IGN1cnJlbnRJdGVtLmZpbmQoJy53b3JrX19waWMnKS5hdHRyKFwic3JjXCIpLFxyXG4gICAgaW1nQ29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19pbWdfcHJldicpO1xyXG5cclxuICBpbWdDb250YWluZXIuYXR0cignc3JjJywgY3VycmVudEltZyk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIF9tb3ZlU2xpZGUoY29udGFpbmVyLCBkaXJlY3Rpb24sIG5keCkge1xyXG4vLyAgIHZhciBpdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbi8vICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcud29yay1zbGlkZXJfX2l0ZW1fYWN0aXZlJyksXHJcbi8vICAgICBjdXJyZW50SXRlbSA9IGl0ZW1zKG5keCksXHJcbi8vICAgICByZXFJdGVtLFxyXG4vLyAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSAndXAnID8gLTEwMCA6IDEwMDtcclxuLy9cclxuLy8gICByZXFJdGVtID0gaXRlbXMuZXEoaW5kZXgpO1xyXG4vL1xyXG4vLyAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcbi8vICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbi8vICAgfSwgZHVyYXRpb24pO1xyXG4vL1xyXG4vLyAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbi8vICAgICAndG9wJzogMFxyXG4vLyAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9hY3RpdmUnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb24gKyAnJScpO1xyXG4vLyAgICAgY3VycmVudEl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4vLyAgIH0pXHJcbi8vXHJcbi8vIH1cclxuXHJcblxyXG5yZXR1cm4ge1xyXG4gIGluaXQ6IF9pbml0LFxyXG4gIG1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19uZXh0JykpIHtcclxuICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIG5leHRTbGlkZSA9IG5keCArIDE7XHJcbiAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX3ByZXYnKSkge1xyXG4gICAgICAgIGluZGV4LS07XHJcbiAgICAgICAgbmV4dFNsaWRlID0gbmR4IC0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIF9zbGlkZVNob3coKTtcclxuXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxufSlcclxuKCk7XHJcblxyXG4iLCJ2YXIgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKTtcclxuXHJcbmlmIChwcmVsb2FkICE9PSBudWxsKSBQcmVsb2FkZXIuaW5pdCgpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy9NQUlOIFBBUkFMQVhcclxuICB2YXIgcGFyYWxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGF4ICE9PSBudWxsKSB7XHJcbiAgICBNYWluUGFyYWxheC5pbml0KCk7XHJcbiAgfVxyXG4gIC8vXHJcbiAgLy8gY29uc29sZS5sb2cocGFyYWxheCk7XHJcblxyXG5cclxuICAvL0ZMSVAgQ0FSRFxyXG4gIHZhciBhdXRoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGgtYnV0dG9uJyksXHJcbiAgICB3ZWxjb21lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1yZXR1cm4nKTtcclxuXHJcbiAgaWYgKGF1dGhCdG4gIT09IG51bGwpIHtcclxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEZsaXAuYXV0aCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpZiAod2VsY29tZUJ0biAhPT0gbnVsbCkge1xyXG4gICAgd2VsY29tZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgRmxpcC53ZWxjb21lKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vQlVSR0VSTUVOVVxyXG4gIHZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1idG4nKTtcclxuXHJcbiAgaWYgKGJ1cmdlck1lbnUgIT09IG51bGwpIHtcclxuICAgIGJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIE1lbnUudG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvL0JMVVJcclxuICB2YXIgYmx1ckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xyXG5cclxuICBpZiAoYmx1ckZvcm0gIT09IG51bGwpIHtcclxuICAgIEJsdXIuc2V0KCk7XHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsdXIuc2V0KCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vSEVBREVSIFBBUkFMQVggJiBTS0lMTFNcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICBibG9nV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNvbnRhaW5lcicpO1xyXG5cclxuICAvLyDQktCr0JfQntCSINCk0KPQndCa0KbQmNCvINCf0J4g0KHQmtCg0J7Qm9Cb0KMg0KHQotCg0JDQndCY0KbQq1xyXG4gIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICBpZiAoYmcgIT09IG51bGwpIHtcclxuICAgICAgSGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2tpbGxzICE9PSBudWxsKSB7XHJcbiAgICAgIFNraWxscy5ncm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJsb2dXcmFwcGVyICE9PSBudWxsKSB7XHJcbiAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgICAgQmxvZ01lbnUuaW5pdEFjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICB2YXIgc2lkZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZW1lbnUtYnRuJyk7XHJcblxyXG4gIGlmIChzaWRlTWVudSAhPT0gbnVsbCkge1xyXG4gICAgc2lkZU1lbnUub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgQmxvZ01lbnUudG9nZ2xlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuXHJcbiAgaWYgKGZvcm0gIT09IG51bGwpIHtcclxuICAgIC8v0L7Rh9C40YHRgtC60LAg0L7RiNC40LHQutC4XHJcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5lbGVtZW50cztcclxuICAgIHZhciBjbG9zZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLWNhcHRjaGFfX2Nsb3NlJyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaW5wdXRzW2ldLm9uZm9jdXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXBfZXJyb3InKSkge1xyXG4gICAgICAgICAgVmFsaWRhdGlvbi5jbGVhcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VFcnJvciAhPT0gbnVsbCkge1xyXG4gICAgICBjbG9zZUVycm9yLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjbG9zZUVycm9yLnBhcmVudE5vZGUucGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHZhciB2YWxpZCA9IFZhbGlkYXRpb24uaW5pdChmb3JtKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbGlkKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgLy9TQ1JPTEwgUEFHRVxyXG4gIHZhciBzY3JvbGxMaW5rRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua19kb3duJyk7XHJcbiAgdmFyIHNjcm9sbExpbmtVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua191cCcpO1xyXG5cclxuICBpZiAoc2Nyb2xsTGlua0Rvd24gIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtEb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS5kb3duKHRoaXMpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgaWYgKHNjcm9sbExpbmtVcCAhPT0gbnVsbCkge1xyXG4gICAgc2Nyb2xsTGlua1VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS51cCh0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL1NMSURFUlxyXG4gIHZhciBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya19fc2xpZGVyJyk7XHJcblxyXG4gIGlmIChzbGlkZXIgIT09IG51bGwpIHtcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIFNsaWRlci5pbml0KCk7XHJcbiAgICAgIFNsaWRlci5pbml0KCk7XHJcbiAgICAgIFNsaWRlci5tb3ZlKCk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcblxyXG59OyJdfQ==
