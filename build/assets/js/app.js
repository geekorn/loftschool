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







//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgcG9ydGZvbGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcG9ydGZvbGlvJyksXHJcbiAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xyXG5cclxuICByZXR1cm4ge1xyXG5cclxuICAgIG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKScsXHJcbiAgICAgICAgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcbiAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgdGhpcy5tb3ZlKHBvcnRmb2xpbywgd1Njcm9sbCwgMjApO1xyXG4gICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG53aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gIHBhcmFsbGF4LmluaXQod1Njcm9sbCk7XHJcbn07XHJcblxyXG4vLyBibHVyIGVmZmVjdFxyXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybScpLFxyXG4gICAgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGltZ1dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHdyYXBwZXJDb29yZHMgPSB3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHBhcmVudENvb3JkcyA9IHdyYXBwZXIucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBwb3NMZWZ0ID0gLXdyYXBwZXIub2Zmc2V0TGVmdCxcclxuICAgICAgICBwb3NUb3AgPSAtIChwYXJlbnRDb29yZHMuYm90dG9tIC0gd3JhcHBlckNvb3Jkcy5ib3R0b20pIC8gMixcclxuICAgICAgICBibHVyQ1NTID0gZm9ybS5zdHlsZTtcclxuXHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyAnYXV0byc7XHJcbiAgICAgIGJsdXJDU1MuYmFja2dyb3VuZFBvc2l0aW9uID0gcG9zTGVmdCArICdweCAnICsgcG9zVG9wICsgJ3B4JztcclxuICAgICAgY29uc29sZS5sb2cocG9zVG9wKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7XHJcblxyXG5ibHVyLnNldCgpO1xyXG5cclxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gIGJsdXIuc2V0KCk7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJmaWxlIjoiYXBwLmpzIn0=
