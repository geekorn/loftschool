// var Slider = new function () {
//     var items,
//         index,
//         initialIndex = 1,
//         ndx,
//         duration = 500,
//         toggle = document.querySelector('.work-slider');
//
//     function init(data) {
//         var activeSlide = {
//             index: initialIndex,
//             title: document.querySelector('.work__title'),
//             technology: document.querySelector('.work__technology'),
//             img: document.querySelector('.work__pic'),
//             next: document.querySelector('.work-slider__list_next'),
//             prev: document.querySelector('.work-slider__list_prev')
//
//         };
//
//         items = data;
//
//         // отрисовка основного слайда
//         changeSlide(activeSlide);
//
//         // подготовка слайдов-переключателей
//         activeSlide.next.appendChild(createSlides(items, activeSlide.index + 1));
//         activeSlide.prev.appendChild(createSlides(items, activeSlide.index - 1));
//
//         // слушаем событие по нажатию на слайды
//         toggle.addEventListener('click', function(e) {
//             e.preventDefault();
//             slideShow(e.target);
//         })
//     }
//
//     function createSlides(items, active) {
//         var list = document.createDocumentFragment();
//
//         items.forEach(function (item, i) {
//             var span = document.createElement('LI');
//             var img = new Image();
//
//             (i === active) && span.classList.add('work-slider__item_current');
//             span.classList.add('work-slider__item');
//             span.dataset.title = item.name;
//             span.dataset.technology = item.technology;
//             span.dataset.link = item.link;
//             img.src = item.img;
//             img.classList.add('work-slider__img');
//
//             span.appendChild(img);
//             list.appendChild(span);
//         });
//
//         return list;
//     }
//
//     function slideShow (target) {
//         if (target.contains(next)) {
//             index++;
//         } else if (target.contains(prev)) {
//             index--;
//         }
//
//         if (index > items.length - 1) {
//             index = 0;
//         } else if (index < 0) {
//             index = items.length - 1;
//         }
//       // moveSlide(next);
//       // moveSlide(prev);
//         console.log(index)
//       changeSlide(index);
//     }
//
//     function moveSlide() {
//
//     }
//
//     function changeSlide(activeItem) {
//         console.log(activeItem)
//         activeItem.title.innerHTML = items[activeItem.index].name;
//         activeItem.technology.innerHTML = items[activeItem.index].technology.join(', ');
//         activeItem.img.src = items[activeItem.index].img;
//     }
//
//
//     this.init = init;
// };