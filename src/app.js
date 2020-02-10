import "./main.scss";

import '../assets/img/sprite.svg';
import { log } from "util";

/* Navbar */

const showcase = document.querySelector('.showcase');

const ul = document.querySelector('.at__list');
const row2 = document.querySelector('.attributes__row--2');
const row3 = document.querySelector('.attributes__row--3');

const contact__about = document.querySelector('.contact__about');
const contact__content = document.querySelector('.contact__content');

window.addEventListener('resize', () => {
    placeApartmentList();
	resizeQuoteBoxes();
	placeContactHeading();
});

window.addEventListener('load', () => {
    placeApartmentList();
	resizeQuoteBoxes();
	placeContactHeading();
});

function resizeQuoteBoxes() {
	const quotes = document.querySelectorAll('.quote');
	quotes.forEach(q => {
		const text = q.querySelector('.quote__text');
		const box = q.querySelector('.quote__box');

		box.style.height = text.offsetHeight + 'px';

	});
}

function placeContactHeading() {

    const q = document.querySelector('.bg--red').parentNode;
   const n = document.querySelector('.h2name');
    n.style.height = q.offsetHeight + 'px';
   console.log(q.offsetHeight); 
   
    
    /* const w = window.innerWidth ||document.documentElement.clientWidth || document.body.clientWidth;

	if (document.querySelector('.contact__heading')) {
		document.querySelector('.contact__heading').remove();
	}



	const el = document.createElement('h2');
	el.innerHTML = 'Hana Alexanderová';
	el.classList.add("contact__heading");


	if (w >= 1024){
		console.log(2);
		contact__content.insertBefore(el, contact__content.childNodes[0]);
	} */
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
