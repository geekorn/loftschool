window.onload = function () {

  console.log('app is ready');

  //MAIN PARALAX
  var paralax = document.querySelector('.paralax');

  if (paralax !== null) {
    mainParalax.init();
  }
  //
  // console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      Flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      Flip.welcome();
    });
  }

  //BURGERMENU
  var burgerMenu = document.querySelector('.hamburger-btn');

  if (burgerMenu !== null) {
    burgerMenu.addEventListener('click', function () {
      menu.toggle();
    });
  }


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    blur.set();
    window.onresize = function () {
      blur.set();
    };


  }
  // blur.set();


  //HEADER PARALAX & SKILLS

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {
    var wScroll = window.pageYOffset;

    console.log(wScroll);
    HeaderParallax.init(wScroll);

    // Skills.grow(wScroll);
  };


};