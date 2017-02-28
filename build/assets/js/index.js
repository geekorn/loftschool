"use strict";

// index flip
var flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  return {
    auth: function () {
      flipper.style.transform = 'rotateY(180deg)';
      btn.style.display = 'none';
    },
    main: function () {
      flipper.style.transform = 'rotateY(0deg)';
      btn.style.display = 'block';
    }
  }

})();

var btn = document.querySelector('.auth-button'),
  returnBtn = document.querySelector('.btn-return');

btn.onclick = flip.auth;
returnBtn.onclick = flip.main;

// document.body.addEventListener('click', function (e) {
//   var target = e.target,
//     auth = document.querySelector('.auth');
//
//   while (target != this) {
//
//     if (target !== 'auth') {
//       flip.main();
//       return;
//     }
//
//     target = target.parentNode;
//   }
// });

//index paralax
var paralaxContainer = document.querySelector('.paralax'),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIGluZGV4IGZsaXBcclxudmFyIGZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH0sXHJcbiAgICBtYWluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMGRlZyknO1xyXG4gICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICByZXR1cm5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xyXG5cclxuYnRuLm9uY2xpY2sgPSBmbGlwLmF1dGg7XHJcbnJldHVybkJ0bi5vbmNsaWNrID0gZmxpcC5tYWluO1xyXG5cclxuLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0LFxyXG4vLyAgICAgYXV0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoJyk7XHJcbi8vXHJcbi8vICAgd2hpbGUgKHRhcmdldCAhPSB0aGlzKSB7XHJcbi8vXHJcbi8vICAgICBpZiAodGFyZ2V0ICE9PSAnYXV0aCcpIHtcclxuLy8gICAgICAgZmxpcC5tYWluKCk7XHJcbi8vICAgICAgIHJldHVybjtcclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcblxyXG4vL2luZGV4IHBhcmFsYXhcclxudmFyIHBhcmFsYXhDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFyYWxheCcpLFxyXG4gIGxheWVycyA9IHBhcmFsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcclxuICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XHJcblxyXG4gIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgZGl2aWRlciA9IGkgLyA0MCxcclxuICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogZGl2aWRlcixcclxuICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XHJcblxyXG4gICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgbGF5ZXJTdHlsZS5sZWZ0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcclxuICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gIH0pXHJcblxyXG59KTtcclxuIl0sImZpbGUiOiJpbmRleC5qcyJ9
