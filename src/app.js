import "./main.scss";

import {
    formValidation
} from "./js/formValidation.js";
import {
    ScrollMaster
} from "./js/scrollMaster.js";

import {
    Gallery
} from "./js/gallery";
import {
    Lazy
} from "./js/lazyLoader";


import {
    gsap
} from "gsap";

import '../assets/img/sprite.svg';

/* Navbar */

const showcase = document.querySelector('.showcase');

const form = document.querySelector(".form");

const bImg = document.querySelectorAll('.beaches__img')[2];
const bIco = document.querySelector('.beaches__icon');



const ul = document.querySelector('.at__list');
const row2 = document.querySelector('.attributes__row--2');
const row3 = document.querySelector('.attributes__row--3');

const navlinks = document.querySelectorAll('.navbar__link');

navlinks.forEach(nl => {
    nl.addEventListener('click', () => {
        navbar.toggleState();
        showcase.classList.toggle('active');
        tl.reversed() ? tl.play() : tl.reverse();
    });
});

window.addEventListener('resize', () => {
    placeApartmentList();
    resizeQuoteBoxes();

    bIco.style.height = bImg.offsetHeight + 'px';

});

const previewImgs = [],
    src = [];
const classes = {
    'vertical': [1, 6],
    'horizontal': [9, 20],
    'big': [2, 15]
};

window.addEventListener('load', () => {
    placeApartmentList();
    resizeQuoteBoxes();
    // resize icon in nearby section
    bIco.style.height = bImg.offsetHeight + 'px';
    bIco.style.width = bImg.offsetWidth + 'px';

    for (let index = 1; index < 22; index++) {
        previewImgs.push(`./assets/img/gallery/${index}.jpg`);
        src.push(`assets/img/gallery/${index}.jpg`);
    }

    new Gallery('.gallery-container', previewImgs, src, classes);
    new Lazy();
});



window.addEventListener('scroll', (e) => {
    const target = document.querySelector('.showcase__content');
    if (window.innerWidth >= 568) {

        const windowHeight = window.innerHeight;
        const targetHeight = target.offsetHeight;

        if (windowHeight / 3 - targetHeight > window.pageYOffset) {
            requestAnimationFrame(an);
        }
    }

    function an() {
        let scrolled = window.pageYOffset;
        const rate = scrolled * 2.3;
        target.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    new formValidation(form);
    const smoothScroll = new ScrollMaster(1000, '.smoothScroll');
    smoothScroll.init();
})

function resizeQuoteBoxes() {
    const quotes = document.querySelectorAll('.quote');
    quotes.forEach(q => {
        const text = q.querySelector('.quote__text');
        const box = q.querySelector('.quote__box');

        box.style.height = text.offsetHeight + 'px';
        box.style.width = text.offsetHeight + 'px';
    });
}


function placeApartmentList() {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w >= 1024 && row3.childElementCount === 0) {
        ul.remove();
        row3.innerHTML = `
        <div class="attributes__element at__list">
        <ul class="attributes__list">
        <li>kuchyňská linka je vybavena</li>
        <li>koupelna bez pračky</li>
        </ul>
        </div>
        <div class="attributes__element at__list">
        <ul class="attributes__list">
        <li>4 lůžka + 1 přistýlka </li>
        <li>přístup není bezbariérový</li>
        </ul>
        </div>
        `;
    };
    if (w < 1024 && row3.childElementCount !== 0) {
        row3.innerHTML = '';
        row2.appendChild(ul);
    }

    const cnt = document.querySelector('.showcase__content');
    if (w <= 568 && cnt.style.transform !== `translate3d(-50%, -50%, 0px)`) {
        cnt.style.transform = `translate3d(-50%, -50%, 0px)`;
    } else if (w > 568) {
        cnt.style.transform = `translate3d(0, 0, 0px)`;
    }
}

const navbar = {
    btn: document.querySelector('.navbar__icon'),
    content: document.querySelector('.navbar'),
    toggleState: function() {
        this.btn.classList.toggle('active');
        this.content.classList.toggle('active');
    }
}


const tl = gsap.timeline();
tl.to('.navbar', {
        height: '100%',
        width: '300px',
        duration: 0.6,
        borderRadius: "0 0 0 10em"
    })
    .to(".showcase__content", {
        opacity: 0,
        y: 120,
        duration: 1
    })
    .to('.navbar__link', {
        display: 'block',
        duration: 0.1
    }, "-=1")
    .to('.navbar__item', {
        opacity: 1,
        duration: 0.2,
        stagger: 0.2
    }, "-=0.6")

    .reverse();

navbar.btn.addEventListener('click', () => {
    navbar.toggleState();


    tl.reversed() ? tl.play() : tl.reverse();
    showcase.classList.toggle('active');
});
