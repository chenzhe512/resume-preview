'use strict';

!function () {
    var view = document.querySelector('#mySlides');
    var controller = {
        view: null,
        swiper: null,
        init: function init(view) {
            this.view = view;
            this.initSwiper();
        },
        initSwiper: function initSwiper() {
            this.swiper = new Swiper(this.view.querySelector('.swiper-container'), {
                // Optional parameters
                loop: true,

                // If we need pagination
                pagination: {
                    el: '.swiper-pagination'
                },

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }

                // And if we need scrollbar
            });
        }
    };

    controller.init(view);
}.call();