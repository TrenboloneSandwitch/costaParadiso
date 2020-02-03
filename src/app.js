import "./main.scss";
import { log } from "util";

/* Navbar */

const showcase = document.querySelector('.showcase');

const ul = document.querySelector('.at__list');
const row2 = document.querySelector('.attributes__row--2');
const row3 = document.querySelector('.attributes__row--3');

window.addEventListener('resize', () => {
    placeApartmentList();
});

document.addEventListener('DOMContentLoaded', () => {
    placeApartmentList();
});

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
        console.log(1);
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
