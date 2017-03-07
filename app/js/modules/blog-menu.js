var BlogMenu = (function () {
  var sidebar = document.querySelector('.blog-container');
  // sideMenu = document.querySelector('.sidebar:after'),

  function _fixMenu() {
    var nav = document.querySelector('.sidebar'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (navCoords <= -50) {
      nav.style.position = 'fixed';
      nav.style.top = '20px';
    } else {
      nav.style.position = 'static';
    }

  }

  function _initActive () {
    var posts = document.querySelectorAll('.post__title'),
      postLinks = document.querySelectorAll('.blog-menu__link'),
      activeLink = document.getElementsByClassName('blog-menu__link_active');


    for (var i = 0; i < posts.length; i++) {
      var post = posts[i],
        postTop = post.getBoundingClientRect().top;

      if (postTop <= 150) {
        activeLink[0].classList.remove('blog-menu__link_active');
        postLinks[i].classList.add('blog-menu__link_active');
      }
    }
  }

  var _openMenu = function () {
    sidebar.classList.add('blog-container_shift_right');
  };
  var _closeMenu = function () {
    sidebar.classList.remove('blog-container_shift_right');
  };

  return {
    init: _fixMenu,
    initActive: _initActive,
    toggle: function () {
      if (!sidebar.classList.contains('blog-container_shift_right')) {
        _openMenu();
      }
      else {
        _closeMenu();
      }
    }
  }
})();


/*
  при уменьшении размера прячем меню и показываем кнопку
  при клике на кнопку показываем меню

 */

// function initSidebarHighlight() {
//   function e() {
//     var e = document.getElementsByClassName("sidebar__navigation-link_active");
//     e[0] && e[0].classList.remove("sidebar__navigation-link_active");
//     for (var t = document.getElementsByTagName("h2"), n = 0; n < t.length; n++) {
//       var a = t[n];
//       if (a.getBoundingClientRect().top > 1) break;
//     }
//     if (n--, n >= 0) {
//       var i = t[n].firstElementChild && t[n].firstElementChild.getAttribute("href"), r = document.querySelector('.sidebar__navigation-link a[href="' + i + '"]');
//       i && r && r.classList.add("sidebar__navigation-link_active");
//     }
//   }
//   document.addEventListener("DOMContentLoaded", function() {
//     e(), window.addEventListener("scroll", e);
//   });
// }