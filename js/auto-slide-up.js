'use strict';

!function () {
    var specialTags = document.querySelectorAll('[data-x]');
    for (var i = 1; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }

    findClosestAndRemoveOffset();

    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset();
    });

    function findClosestAndRemoveOffset() {
        var specialTags = document.querySelectorAll('[data-x]');
        var minIndex = 0;

        for (var _i = 1; _i < specialTags.length; _i++) {
            if (Math.abs(specialTags[_i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = _i;
            }
        }

        specialTags[minIndex].classList.remove('offset');

        /*for (let i = 0; i < specialTags.length; i++) {
            specialTags[i].classList.remove('active')
        }
        specialTags[minIndex].classList.add('active')*/

        var id = specialTags[minIndex].id;
        var a = document.querySelector('a[href="#' + id + '"]');
        var li = a.parentNode;
        var brotherAndMe = li.parentNode.children;
        for (var _i2 = 0; _i2 < brotherAndMe.length; _i2++) {
            brotherAndMe[_i2].classList.remove('highlight');
        }
        li.classList.add('highlight');
    }

    /*let liTags = document.querySelectorAll('nav.menu > ul > li')
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    x.currentTarget.classList.add('active')
                    let li = x.currentTarget
                    let brother = li.getElementsByTagName('ul')[0]
                    while(brother.nodeType === 3){ while(brother.tagName !== 'UL'){
                        brother = brother.nextSibling
                    }
                    brother.classList.add('active')
                }
                liTags[i].onmouseleave = function (x) {
                    let li = x.currentTarget
                    let brother = li.getElementsByTagName('ul')[0]
                    brother.classList.remove('active')
                    x.currentTarget.classList.remove('active')
                }
            }*/
}.call();