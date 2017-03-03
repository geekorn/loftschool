// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var HeaderParallax = (function () {
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

window.HeaderParallax = HeaderParallax;
