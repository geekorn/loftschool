'use strict';

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

window.onscroll = function () {
  var wScroll = window.pageYOffset;

  parallax.init(wScroll);
};

// blur effect
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
      console.log(posTop);
    }
  }
})();

blur.set();

window.onresize = function () {
  blur.set();
};






