'use strict';

window.onload = function () {

// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
  var parallax = (function () {
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
        this.move(portfolio, wScroll, 20);
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


  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {
    var wScroll = window.pageYOffset;

    parallax.init(wScroll);
    skillsDraw.grow(wScroll);
  };

// BLUR EFFECT
  var blur = (function () {
    var wrapper = document.querySelector('.feedback-form'),
      form = document.querySelector('.feedback-form__blur');

    return {
      set: function () {
        var imgWidth = document.querySelector('.feedback__bg').offsetWidth,
          wrapperCoords = wrapper.getBoundingClientRect(),
          parentCoords = wrapper.parentNode.getBoundingClientRect(),
          posLeft = -wrapper.offsetLeft,
          posTop = - (parentCoords.bottom - wrapperCoords.bottom) / 2,
          blurCSS = form.style;

        blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
        blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
      }
    }
  })();

  blur.set();

  window.onresize = function () {
    blur.set();
  };


  // СКРЫТЬ/ПОКАЗАТЬ ГЛАВНОЕ МЕНЮ
  var burgerMenu = document.querySelector('.hamburger-btn');

  burgerMenu.addEventListener('click', function () {
    var menu = document.querySelector('.main-navigation');

    console.log(this);
    this.classList.toggle('hamburger-btn_closed');
    menu.classList.toggle('main-navigation_disabled');

  });

  // СКРОЛЛ СТРАНИЦЫ ПО КЛИКУ НА ССЫЛКУ В ШАПКЕ
  var scrollDown = document.querySelector('.scroll-link_down');

  scrollDown.addEventListener('click', function (e) {
    e.preventDefault();
    var section = this.parentNode.nextSibling.nextSibling,
      posTop = section.offsetTop;

    $('body,html').animate({scrollTop: posTop}, 1500);

  });

  // СРОЛЛ СТРАНИЦЫ ВВЕРХ
  var scrollUp = document.querySelector('.scroll-link_up');

  scrollUp.addEventListener('click', function (e) {
    e.preventDefault();

    $('body,html').animate({scrollTop: 0}, 1200);
  });


};




//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbi8vINCf0JDQoNCQ0JvQkNCa0KEg0K3QpNCk0KTQldCa0KIg0JIg0KjQkNCf0JrQlSDQodCQ0JnQotCQXHJcbiAgdmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICAgIHBvcnRmb2xpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3BvcnRmb2xpbycpLFxyXG4gICAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBtb3ZlOiBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwgJyArIHN0cmFmZSArICcsIDApJyxcclxuICAgICAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG4gICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgIHRoaXMubW92ZShwb3J0Zm9saW8sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH0pKCk7XHJcblxyXG5cclxuICAvLyDQkNCd0JjQnNCQ0KbQmNCvINCY0JrQntCd0J7QmiDQodCa0JjQm9Ce0JJcclxuICB2YXIgc2tpbGxzRHJhdyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICAgIGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgICB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgLy8g0LLRi9GH0LjRgdC70Y/QtdC8INC00LvQuNC90YMg0L7QutGA0YPQttC90L7RgdGC0LhcclxuICAgIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICAgIHZhciBjaXJjbGVSYWRpdXMgPSBjaXJjbGUuZ2V0QXR0cmlidXRlKCdyJyksXHJcbiAgICAgICAgY2lyY2xlTGVuZ3RoID0gMiAqIE1hdGguUEkgKiBjaXJjbGVSYWRpdXM7XHJcblxyXG4gICAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDQv9GA0LjQvNC10L3Rj9C10Lwg0Log0L7QutGA0YPQttC90L7RgdGC0Lgg0YHQstC+0LnRgdGC0LLQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gY2lyY2xlTGVuZ3RoKGNpcmNsZSk7XHJcbiAgICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDRhNGD0L3QutGG0LjRjyDQsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0L7QutGA0YPQttC90L7RgdGC0Lgg0LIg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQvtGCINC/0YDQvtGG0LXQvdGC0L7QslxyXG4gICAgdmFyIGNpcmNsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgICAgIHNraWxsUGVyY2VudCA9IHNraWxsLmdldEF0dHJpYnV0ZSgnZGF0YS1wZXJjZW50JyksXHJcbiAgICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxyXG4gICAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNpcmNsZUZpbGwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBlcmNlbnQ7XHJcbiAgICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcblxyXG4gICAgICAgIGlmIChza2lsbFBlcmNlbnQgPCA1MCkge1xyXG4gICAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcclxuICAgICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBncm93OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICAgIHZhciBjaXJjbGVSZWN0ID0gc2tpbGwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIGNpcmNsZVBvcyA9IGNpcmNsZVJlY3QuYm90dG9tLFxyXG4gICAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgICBpZiAoc3RhcnRBbmltYXRpb24gPD0gMCkge1xyXG4gICAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9KSgpO1xyXG5cclxuXHJcbiAgLy8g0JLQq9CX0J7QkiDQpNCj0J3QmtCm0JjQryDQn9CeINCh0JrQoNCe0JvQm9CjINCh0KLQoNCQ0J3QmNCm0KtcclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgc2tpbGxzRHJhdy5ncm93KHdTY3JvbGwpO1xyXG4gIH07XHJcblxyXG4vLyBCTFVSIEVGRkVDVFxyXG4gIHZhciBibHVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm0nKSxcclxuICAgICAgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGltZ1dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLm9mZnNldFdpZHRoLFxyXG4gICAgICAgICAgd3JhcHBlckNvb3JkcyA9IHdyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICBwYXJlbnRDb29yZHMgPSB3cmFwcGVyLnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICBwb3NMZWZ0ID0gLXdyYXBwZXIub2Zmc2V0TGVmdCxcclxuICAgICAgICAgIHBvc1RvcCA9IC0gKHBhcmVudENvb3Jkcy5ib3R0b20gLSB3cmFwcGVyQ29vcmRzLmJvdHRvbSkgLyAyLFxyXG4gICAgICAgICAgYmx1ckNTUyA9IGZvcm0uc3R5bGU7XHJcblxyXG4gICAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4ICcgKyBwb3NUb3AgKyAncHgnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkoKTtcclxuXHJcbiAgYmx1ci5zZXQoKTtcclxuXHJcbiAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgYmx1ci5zZXQoKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLy8g0KHQmtCg0KvQotCsL9Cf0J7QmtCQ0JfQkNCi0Kwg0JPQm9CQ0JLQndCe0JUg0JzQldCd0K5cclxuICB2YXIgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIGJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24nKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLWJ0bl9jbG9zZWQnKTtcclxuICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWFpbi1uYXZpZ2F0aW9uX2Rpc2FibGVkJyk7XHJcblxyXG4gIH0pO1xyXG5cclxuICAvLyDQodCa0KDQntCb0Jsg0KHQotCg0JDQndCY0KbQqyDQn9CeINCa0JvQmNCa0KMg0J3QkCDQodCh0KvQm9Ca0KMg0JIg0KjQkNCf0JrQlVxyXG4gIHZhciBzY3JvbGxEb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC1saW5rX2Rvd24nKTtcclxuXHJcbiAgc2Nyb2xsRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMucGFyZW50Tm9kZS5uZXh0U2libGluZy5uZXh0U2libGluZyxcclxuICAgICAgcG9zVG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XHJcblxyXG4gICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIC8vINCh0KDQntCb0Jsg0KHQotCg0JDQndCY0KbQqyDQktCS0JXQoNClXHJcbiAgdmFyIHNjcm9sbFVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjcm9sbC1saW5rX3VwJyk7XHJcblxyXG4gIHNjcm9sbFVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxuICB9KTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6ImFwcC5qcyJ9
