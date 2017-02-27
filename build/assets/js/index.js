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
      divider = i / 100,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIGluZGV4IGZsaXBcclxudmFyIGZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYXV0aDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH0sXHJcbiAgICBtYWluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMGRlZyknO1xyXG4gICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbnZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICByZXR1cm5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xyXG5cclxuYnRuLm9uY2xpY2sgPSBmbGlwLmF1dGg7XHJcbnJldHVybkJ0bi5vbmNsaWNrID0gZmxpcC5tYWluO1xyXG5cclxuLy9pbmRleCBwYXJhbGF4XHJcbnZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFsYXgnKSxcclxuICBsYXllcnMgPSBwYXJhbGF4Q29udGFpbmVyLmNoaWxkcmVuO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICBwYWdlWSA9IGUucGFnZVksXHJcbiAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuICBbXS5zbGljZS5jYWxsKGxheWVycykuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIsIGkpIHtcclxuICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgIGRpdmlkZXIgPSBpIC8gMTAwLFxyXG4gICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgIGhvcml6b250YWxQb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpICogZGl2aWRlcixcclxuICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgnICsgcG9zaXRpb25YICsgJ3B4LCcgKyBwb3NpdGlvblkgKyAncHgsIDApJztcclxuXHJcbiAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XHJcbiAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgfSlcclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
