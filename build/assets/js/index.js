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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLy8gaW5kZXggZmxpcFxudmFyIGZsaXAgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGgtYnV0dG9uJyksXG4gICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBhdXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xuICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSxcbiAgICBtYWluOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDBkZWcpJztcbiAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gIH1cblxufSkoKTtcblxudmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxuICByZXR1cm5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xuXG5idG4ub25jbGljayA9IGZsaXAuYXV0aDtcbnJldHVybkJ0bi5vbmNsaWNrID0gZmxpcC5tYWluO1xuXG4vL2luZGV4IHBhcmFsYXhcbnZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcmFsYXgnKSxcbiAgbGF5ZXJzID0gcGFyYWxheENvbnRhaW5lci5jaGlsZHJlbjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG5cbiAgdmFyIHBhZ2VYID0gZS5wYWdlWCxcbiAgICBwYWdlWSA9IGUucGFnZVksXG4gICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVk7XG5cbiAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG4gICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcbiAgICAgIGRpdmlkZXIgPSBpIC8gMTAwLFxuICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxuICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxuICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxuICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xuXG4gICAgbGF5ZXJTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgbGF5ZXJTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgbGF5ZXJTdHlsZS5ib3R0b20gPSAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCc7XG4gICAgbGF5ZXJTdHlsZS5sZWZ0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcbiAgICBsYXllclN0eWxlLnJpZ2h0ID0gJy0nICsgaG9yaXpvbnRhbFBvc2l0aW9uICsgJ3B4JztcbiAgfSlcblxufSk7XG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
