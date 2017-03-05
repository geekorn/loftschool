var Preloader = (function () {
  var loader = document.querySelector('.preloader'),
    wrapper = document.querySelector('.index-wrapper'),
    images = document.querySelectorAll('img'),
    flipCard = document.querySelector('.flipper');

  function _loadImage(img) {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reject(img);
      }
    });
  }

  function _showLoader (imgList) {
    var promiseImg = imgList.map(_loadImage);

    return promiseImg.reduce(function (prevPromise, currentPromise) {
      return prevPromise
        .then(function () {
          return currentPromise;
        })
        .then(function (img) {
          console.log(img.src);
          return Promise.resolve();
        })
        .catch(function () {
          console.log('что то пошло не так');
          return Promise.resolve();
        })

    })
  }

  function _closeLoader () {
    var imgArr = Array.prototype.slice.call(images);

    _showLoader(imgArr)
      .then(function()
      {
        wrapper.style.display = 'block';

        setTimeout(function () {
          loader.style.opacity = '0';
          loader.parentNode.removeChild(loader);
        },1500)
      })
      .then(function () {
        setTimeout(function () {
          flipCard.style.transform = 'rotate3d(1,0,0, 0deg)';
        },1500)
      })
      .catch(function(err)
      {
        console.log(err);
      });


  };


  return {
    init: _closeLoader
  }

})();

Preloader.init();

/*
  1 - загрузить сам прелоадер
  2 - взять все картинки на странице
  3 - по мере загрузки картинок менять проценты
  4 - после загрузки всех картинок убрать прелоадер
 */