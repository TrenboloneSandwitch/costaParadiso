import "./main.scss";
import { log } from "util";

/* Navbar */

const showcase = document.querySelector('.showcase');

const wave = document.querySelector('.section__wave--top');
console.log(document.querySelector('.attributes__icon--acc'));


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
