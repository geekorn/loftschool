var Validation = (function () {
  var _init = function (form) {
    // console.log('validation init');

    var inputs = document.querySelectorAll('input');

    // console.log(inputs);
    return _validate(inputs) ? true : false;
  };

  function _validate (inputs) {
    var elems = Array.prototype.slice.call(inputs);
    var message;
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];

      if (elem.type === 'checkbox' || elem.type === 'radio') {
        // var checkbox = elem.type === 'checkbox',
        //   radio = elem.type === 'radio';

        if (elem.checked && elem.value === 'yes') {
          return true;
        }
        if (!elem.checked) {
          return _showErrorCaptcha('роботам тут не место');
        }
      }

      if (elem.value === '') {
         return _showError(elem)
      }
    }

  };

  function _showError (elem) {
    var text = elem.getAttribute('placeholder').toLowerCase();
    console.log('вы не ввели ' + text);
  }

  function _showErrorCaptcha (msg) {
    console.log(msg)
  }

  return {
    init: _init
  }
})();



// switch (elem.type) {
//   case 'checkbox':
//     if (!elem.checked) {
//       message = 'роботам тут не место';
//       // _showError(message, elem);
//       break;
//     }
//   case 'radio':
//     if (elem.checked && elem.value === 'yes') {
//       return true;
//       break;
//     }
//     else {
//       message = 'роботам тут не место';
//       // _showError(message, elem);
//       break;
//     }
//   case 'text':
//     if (elem.value == '') {
//       message = 'введите логин';
//       // _showError(message, elem);
//       break;
//     }
//   case 'password':
//     if (elem.value == '') {
//       message = 'введите пароль';
//       // _showError(message, elem);
//       break;
//     }

// if (message !== undefined) {
//   return _showError(message, elem);
// }