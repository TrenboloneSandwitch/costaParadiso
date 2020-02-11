import "./main.scss";

import { formValidation } from "./js/formValidation.js";
import { ScrollMaster } from "./js/scrollMaster.js";


import '../assets/img/sprite.svg';
import { log } from "util";

/* Navbar */

const showcase = document.querySelector('.showcase');

const form = document.querySelector(".form");

const ul = document.querySelector('.at__list');
const row2 = document.querySelector('.attributes__row--2');
const row3 = document.querySelector('.attributes__row--3');

const navlinks = document.querySelectorAll('.navbar__link');

navlinks.forEach(nl => {
	nl.addEventListener('click', () => {
		navbar.toggleState();
		showcase.classList.toggle('active');
	});
});


window.addEventListener('resize', () => {
    placeApartmentList();
	resizeQuoteBoxes();
});

window.addEventListener('load', () => {
    placeApartmentList();
    resizeQuoteBoxes();
});

window.addEventListener('scroll', (e) => {
	const target = document.querySelector('.showcase__content');

	const scrolled = window.pageYOffset;
	const rate = scrolled * 0.5;
	console.log(scrolled);

	target.style.transform = `translate3d(0px, ${rate}px, 0px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    new formValidation(form);
    const smoothScroll = new ScrollMaster(1000, '.navbar__link');
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
    const w = window.innerWidth ||document.documentElement.clientWidth || document.body.clientWidth;
    if (w >= 1024 && row3.childElementCount === 0){
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
    if (w < 1024 && row3.childElementCount !== 0){
        row3.innerHTML='';
        row2.appendChild(ul);
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

navbar.btn.addEventListener('click', () => {
    navbar.toggleState();
    showcase.classList.toggle('active');

});
