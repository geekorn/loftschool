// BLUR EFFECT
var blur = (function () {
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
var flip = (function () {
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
// function initMap () {
//   var pointer = new google.maps.LatLng(55.787069, 37.478220),
//     center = new google.maps.LatLng(55.786273, 37.418623);
//
//   var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#96d7c8"},{"visibility":"on"}]}];
//
//   var styledMap = new google.maps.StyledMapType(styles,
//     {name: "Styled Map"});
//
//   var mapSettings = {
//     center: center,
//     scrollwheel: false,
//     zoom: 13,
//     mapTypeControlOptions: {
//       mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
//     },
//     zoomControl: true,
//     zoomControlOptions: {
//       position: google.maps.ControlPosition.RIGHT_TOP
//     },
//     streetViewControl: false
//   };
//
//   var map = new google.maps.Map(document.getElementById('map'), mapSettings);
//
//   var marker = new google.maps.Marker({
//     icon: 'assets/img/decor/map_marker.png',
//     position: pointer,
//     map: map,
//     title: "I'm here!",
//     animation: google.maps.Animation.BOUNCE
//   });
//
//   map.mapTypes.set('map_style', styledMap);
//   map.setMapTypeId('map_style');
// };

var menu = (function () {
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

var mainParalax = (function () {

  var paralaxContainer = document.querySelector('.paralax'),
    layers = paralaxContainer.children;

  var _show = function () {
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

var map = (function () {
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

  return {
    init: initMap()
  }
});
// var scrollPage = (function () {
//
//
//   return {
//     down: function (elem) {
//       var section = this.parentNode.nextSibling.nextSibling,
//         posTop = section.offsetTop;
//
//       $('body,html').animate({scrollTop: posTop}, 1500);
//     },
//
//     up: function () {
//       $('body,html').animate({scrollTop: 0}, 1200);
//     }
//   }
// });


var scrollPage = (function () {
  var speed = 1,
    currentPosition,
    distPosition;

  speed = (currentPosition - distPosition) / 1000;

  return {
    downTo: function (element) {
    var distPosition = element.offsetTop;

    setInterval(function () {

      window.scrollTo(0, distPosition);

      if (top > 1000) {
        clearInterval(scr);
      }
    }, 15);

    }
  }
})();
// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var headerParallax = (function () {
  var bg = document.querySelector('.header__bg'),
    portfolio = document.querySelector('.header__portfolio'),
    user = document.querySelector('.header__user');

  return {

    move: function (block, windowScroll, strafeAmount) {
      var strafe = windowScroll / -strafeAmount + '%',
        transformString = 'translate3d(0, ' + strafe + ', 0)',
        style = block.style;

      style.transform = transformString;
      style.webkitTransform = transformString;
    },

    init: function (wScroll) {
      this.move(bg, wScroll, 45);
      if (portfolio !== null) {
        this.move(portfolio, wScroll, 20);
      };
      this.move(user, wScroll, 3);
    }

  }

})();
// АНИМАЦИЯ ИКОНОК СКИЛОВ
var skillsDraw = (function () {
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

// window.onload = function () {

  //MAIN PARALAX
  var paralax = document.querySelector('.paralax');

  if (paralax !== null) {
    mainParalax.init();
  }

  console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      flip.welcome();
    });
  }

  //BURGERMENU
var burgerMenu = document.querySelector('.hamburger-btn');

if (burgerMenu !== null) {
  burgerMenu.addEventListener('click', function () {
    menu.toggle();
  });
}


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    blur.set();
    window.onresize = function () {
      blur.set();
    };


  }
  blur.set();
  //HEADER PARALAX & SKILLS

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {
    var wScroll = window.pageYOffset;

    console.log(wScroll);
    headerParallax.init(wScroll);

    skillsDraw.grow(wScroll);
  };


// };
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsdXIuanMiLCJmbGlwLmpzIiwiZ29vZ2xlLW1hcC5qcyIsIm1haW4tbWVudS5qcyIsIm1haW4tcGFyYWxheC5qcyIsIm1hcC5qcyIsInNjcm9sbC1wYWdlLmpzIiwic2Nyb2xsLXBhcmFsYXguanMiLCJza2lsbHMuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEJMVVIgRUZGRUNUXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyksXG4gICAgYmx1cldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybScpLFxuICAgIGJsdXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybV9fYmx1cicpO1xuXG4gIHJldHVybiB7XG4gICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXG4gICAgICAgIGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKSxcbiAgICAgICAgaW1nQ29vcmRzID0gaW1nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgYmx1ckNvb3JkcyA9IGJsdXJXcmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBwb3NMZWZ0ID0gLWJsdXJXcmFwcGVyLm9mZnNldExlZnQsXG4gICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXG4gICAgICAgIGJsdXJDU1MgPSBibHVyLnN0eWxlO1xuXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xuICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4ICcgKyBwb3NUb3AgKyAncHgnO1xuICAgIH1cbiAgfVxufSkoKTsiLCIvLyBpbmRleCBmbGlwXG52YXIgZmxpcCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcbiAgICBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcblxuICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgxODBkZWcpJztcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfTtcblxuICB2YXIgX3dlbGNvbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXV0aDogX2F1dGgsXG4gICAgd2VsY29tZTogX3dlbGNvbWVcbiAgfVxuXG59KSgpOyIsIi8vIGZ1bmN0aW9uIGluaXRNYXAgKCkge1xuLy8gICB2YXIgcG9pbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg3MDY5LCAzNy40NzgyMjApLFxuLy8gICAgIGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg2MjczLCAzNy40MTg2MjMpO1xuLy9cbi8vICAgdmFyIHN0eWxlcyA9IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM5NmQ3YzhcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV07XG4vL1xuLy8gICB2YXIgc3R5bGVkTWFwID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLFxuLy8gICAgIHtuYW1lOiBcIlN0eWxlZCBNYXBcIn0pO1xuLy9cbi8vICAgdmFyIG1hcFNldHRpbmdzID0ge1xuLy8gICAgIGNlbnRlcjogY2VudGVyLFxuLy8gICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcbi8vICAgICB6b29tOiAxMyxcbi8vICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcbi8vICAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ21hcF9zdHlsZSddXG4vLyAgICAgfSxcbi8vICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbi8vICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcbi8vICAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXG4vLyAgICAgfSxcbi8vICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2Vcbi8vICAgfTtcbi8vXG4vLyAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwgbWFwU2V0dGluZ3MpO1xuLy9cbi8vICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuLy8gICAgIGljb246ICdhc3NldHMvaW1nL2RlY29yL21hcF9tYXJrZXIucG5nJyxcbi8vICAgICBwb3NpdGlvbjogcG9pbnRlcixcbi8vICAgICBtYXA6IG1hcCxcbi8vICAgICB0aXRsZTogXCJJJ20gaGVyZSFcIixcbi8vICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0Vcbi8vICAgfSk7XG4vL1xuLy8gICBtYXAubWFwVHlwZXMuc2V0KCdtYXBfc3R5bGUnLCBzdHlsZWRNYXApO1xuLy8gICBtYXAuc2V0TWFwVHlwZUlkKCdtYXBfc3R5bGUnKTtcbi8vIH07XG4iLCJ2YXIgbWVudSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpLFxuICAgIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xuXG4gIHJldHVybiB7XG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBidXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlci1idG5fY2xvc2VkJyk7XG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpO1xuXG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gKCFtZW51LmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJykpID8gJ2hpZGRlbicgOiAnYXV0byc7XG4gICAgfVxuICB9XG59KSgpOyIsIi8vaW5kZXggcGFyYWxheFxyXG5cclxudmFyIG1haW5QYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIHBhcmFsYXhDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYWxheCcpLFxyXG4gICAgbGF5ZXJzID0gcGFyYWxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuXHJcbiAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICBkaXZpZGVyID0gaSAvIDQwLFxyXG4gICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHZhciBfZGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL9C00LvRjyDQv9C70LDQvdGI0LXRgtC+0LIg0Lgg0YLQtdC70LXRhNC+0L3QvtCyINC/0L7QtNGB0YLQsNCy0LjRgtGMINC/0YDQvtGB0YLQviDQutCw0YDRgtC40L3QutGDLCDQsCDQvdC1INCz0YDRg9C30LjRgtGMINCy0LXRgdGMINC/0LDRgNCw0LvQsNC60YFcclxuICB9O1xyXG5cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IF9zaG93XHJcbiAgfTtcclxuXHJcbn0pKCk7XHJcbiIsInZhciBtYXAgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpbml0TWFwICgpIHtcbiAgICB2YXIgcG9pbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg3MDY5LCAzNy40NzgyMjApLFxuICAgICAgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43ODYyNzMsIDM3LjQxODYyMyk7XG5cbiAgICB2YXIgc3R5bGVzID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzk2ZDdjOFwifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19XTtcblxuICAgIHZhciBzdHlsZWRNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShzdHlsZXMsXG4gICAgICB7bmFtZTogXCJTdHlsZWQgTWFwXCJ9KTtcblxuICAgIHZhciBtYXBTZXR0aW5ncyA9IHtcbiAgICAgIGNlbnRlcjogY2VudGVyLFxuICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgem9vbTogMTMsXG4gICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcbiAgICAgICAgbWFwVHlwZUlkczogW2dvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLCAnbWFwX3N0eWxlJ11cbiAgICAgIH0sXG4gICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLlJJR0hUX1RPUFxuICAgICAgfSxcbiAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZVxuICAgIH07XG5cbiAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcFNldHRpbmdzKTtcblxuICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIGljb246ICdhc3NldHMvaW1nL2RlY29yL21hcF9tYXJrZXIucG5nJyxcbiAgICAgIHBvc2l0aW9uOiBwb2ludGVyLFxuICAgICAgbWFwOiBtYXAsXG4gICAgICB0aXRsZTogXCJJJ20gaGVyZSFcIixcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRVxuICAgIH0pO1xuXG4gICAgbWFwLm1hcFR5cGVzLnNldCgnbWFwX3N0eWxlJywgc3R5bGVkTWFwKTtcbiAgICBtYXAuc2V0TWFwVHlwZUlkKCdtYXBfc3R5bGUnKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRNYXAoKVxuICB9XG59KTsiLCIvLyB2YXIgc2Nyb2xsUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4vL1xuLy9cbi8vICAgcmV0dXJuIHtcbi8vICAgICBkb3duOiBmdW5jdGlvbiAoZWxlbSkge1xuLy8gICAgICAgdmFyIHNlY3Rpb24gPSB0aGlzLnBhcmVudE5vZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmcsXG4vLyAgICAgICAgIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xuLy9cbi8vICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogcG9zVG9wfSwgMTUwMCk7XG4vLyAgICAgfSxcbi8vXG4vLyAgICAgdXA6IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDEyMDApO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfSk7XG5cblxudmFyIHNjcm9sbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc3BlZWQgPSAxLFxuICAgIGN1cnJlbnRQb3NpdGlvbixcbiAgICBkaXN0UG9zaXRpb247XG5cbiAgc3BlZWQgPSAoY3VycmVudFBvc2l0aW9uIC0gZGlzdFBvc2l0aW9uKSAvIDEwMDA7XG5cbiAgcmV0dXJuIHtcbiAgICBkb3duVG86IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdmFyIGRpc3RQb3NpdGlvbiA9IGVsZW1lbnQub2Zmc2V0VG9wO1xuXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgZGlzdFBvc2l0aW9uKTtcblxuICAgICAgaWYgKHRvcCA+IDEwMDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzY3IpO1xuICAgICAgfVxuICAgIH0sIDE1KTtcblxuICAgIH1cbiAgfVxufSkoKTsiLCIvLyDQn9CQ0KDQkNCb0JDQmtChINCt0KTQpNCk0JXQmtCiINCSINCo0JDQn9Ca0JUg0KHQkNCZ0KLQkFxudmFyIGhlYWRlclBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYmcnKSxcbiAgICBwb3J0Zm9saW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19wb3J0Zm9saW8nKSxcbiAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xuXG4gIHJldHVybiB7XG5cbiAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XG4gICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcbiAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKScsXG4gICAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XG5cbiAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcbiAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xuICAgICAgaWYgKHBvcnRmb2xpbyAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLm1vdmUocG9ydGZvbGlvLCB3U2Nyb2xsLCAyMCk7XG4gICAgICB9O1xuICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xuICAgIH1cblxuICB9XG5cbn0pKCk7IiwiLy8g0JDQndCY0JzQkNCm0JjQryDQmNCa0J7QndCe0Jog0KHQmtCY0JvQntCSXG52YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcbiAgICBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZS1zZWNvbmQnKSxcbiAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgLy8g0LLRi9GH0LjRgdC70Y/QtdC8INC00LvQuNC90YMg0L7QutGA0YPQttC90L7RgdGC0LhcbiAgdmFyIGNpcmNsZUxlbmd0aCA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxuICAgICAgY2lyY2xlTGVuZ3RoID0gMiAqIE1hdGguUEkgKiBjaXJjbGVSYWRpdXM7XG5cbiAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xuICB9O1xuXG4gIC8vINC/0YDQuNC80LXQvdGP0LXQvCDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQstCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXG4gIFtdLnNsaWNlLmNhbGwoY2lyY2xlcykuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlKSB7XG5cbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xuICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcblxuICB9KTtcblxuICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxuICB2YXIgY2lyY2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKHNraWxsKSB7XG5cbiAgICB2YXIgY2lyY2xlRmlsbCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUtc2Vjb25kJyksXG4gICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxuICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxuICAgICAgcGVyY2VudCA9IGxlbmd0aCAqICgxMDAgLSBza2lsbFBlcmNlbnQpIC8gMTAwO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBjaXJjbGVGaWxsLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBwZXJjZW50O1xuICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XG5cbiAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xuICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xuICAgICAgICBza2lsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcblxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ3JvdzogZnVuY3Rpb24gKCkge1xuXG4gICAgICBbXS5zbGljZS5jYWxsKHNraWxscykuZm9yRWFjaChmdW5jdGlvbiAoc2tpbGwpIHtcblxuICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGNpcmNsZVBvcyA9IGNpcmNsZVJlY3QuYm90dG9tLFxuICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uID0gY2lyY2xlUG9zIC0gd2luZG93SGVpZ2h0O1xuXG4gICAgICAgIGlmIChzdGFydEFuaW1hdGlvbiA8PSAwKSB7XG4gICAgICAgICAgY2lyY2xlQW5pbWF0aW9uKHNraWxsKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufSkoKTsiLCJcclxuLy8gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgLy9NQUlOIFBBUkFMQVhcclxuICB2YXIgcGFyYWxheCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJhbGF4Jyk7XHJcblxyXG4gIGlmIChwYXJhbGF4ICE9PSBudWxsKSB7XHJcbiAgICBtYWluUGFyYWxheC5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyhwYXJhbGF4KTtcclxuXHJcblxyXG4gIC8vRkxJUCBDQVJEXHJcbiAgdmFyIGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIHdlbGNvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xyXG5cclxuICBpZiAoYXV0aEJ0biAhPT0gbnVsbCkge1xyXG4gICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmxpcC5hdXRoKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmICh3ZWxjb21lQnRuICE9PSBudWxsKSB7XHJcbiAgICB3ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbGlwLndlbGNvbWUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9CVVJHRVJNRU5VXHJcbnZhciBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlci1idG4nKTtcclxuXHJcbmlmIChidXJnZXJNZW51ICE9PSBudWxsKSB7XHJcbiAgYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIG1lbnUudG9nZ2xlKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG4gIC8vQkxVUlxyXG4gIHZhciBibHVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gIGlmIChibHVyRm9ybSAhPT0gbnVsbCkge1xyXG4gICAgYmx1ci5zZXQoKTtcclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYmx1ci5zZXQoKTtcclxuICAgIH07XHJcblxyXG5cclxuICB9XHJcbiAgYmx1ci5zZXQoKTtcclxuICAvL0hFQURFUiBQQVJBTEFYICYgU0tJTExTXHJcblxyXG4gIC8vINCS0KvQl9Ce0JIg0KTQo9Cd0JrQptCY0K8g0J/QniDQodCa0KDQntCb0JvQoyDQodCi0KDQkNCd0JjQptCrXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgY29uc29sZS5sb2cod1Njcm9sbCk7XHJcbiAgICBoZWFkZXJQYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG5cclxuICAgIHNraWxsc0RyYXcuZ3Jvdyh3U2Nyb2xsKTtcclxuICB9O1xyXG5cclxuXHJcbi8vIH07Il19
