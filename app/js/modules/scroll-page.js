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