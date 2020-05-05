import "./main.scss";
import { formValidation } from "./js/formValidation.js";
import { ScrollMaster } from "./js/scrollMaster.js";
import { Gallery } from "./js/gallery";
import { Lazy } from "./js/lazyLoader";
import { Language } from "./js/language";
import { gsap } from "gsap";
import getJson from "./js/httpHandler";
import "../assets/img/sprite.svg";


// Vars Initializations
const previewImgs = [], src = [];
const classes = { vertical: [1, 6], horizontal: [9, 20], big: [2, 15] };
const tl = gsap.timeline();
// UI vars
const showcase = document.querySelector(".showcase");
const showcase__content = document.querySelector(".showcase__content");
const form = document.querySelector(".form");
const bImg = document.querySelectorAll(".beaches__img")[2];
const bIco = document.querySelector(".beaches__icon");
const ul = document.querySelector(".at__list");
const row2 = document.querySelector(".attributes__row--2");
const row3 = document.querySelector(".attributes__row--3");
const navlinks = document.querySelectorAll(".navbar__link");
const navbar = {
  btn: document.querySelector(".navbar__icon"),
  content: document.querySelector(".navbar"),
  toggleState: function() {
    this.btn.classList.toggle("active");
    this.content.classList.toggle("active");
  }
};

// Functions
function resizeQuoteBoxes() {
  const quotes = document.querySelectorAll(".quote");
  quotes.forEach(q => {
    const text = q.querySelector(".quote__text");
    const box = q.querySelector(".quote__box");

    box.style.height = text.offsetHeight + "px";
    box.style.width = text.offsetHeight + "px";
  });
}

function resizeShowcaseContent(width) {
        if (width < 568 && showcase__content.style.transform !== `translate3d(-50%, -50%, 0px)`) {
            showcase__content.style.transform = `translate3d(-50%, -50%, 0px)`;
        }
        else if (width >= 568) {
            showcase__content.style.transform = `translate3d(0, 0, 0px)`;
        }
}

function placeApartmentList(width) {
  if (width >= 1024 && row3.childElementCount === 0) {
    ul.remove();
    row3.innerHTML = `
        <div class="attributes__element at__list">
            <ul class="attributes__list">
                <li data-lang="26">kuchyňská linka je vybavena</li>
				<li data-lang="27">koupelna bez pračky</li>
            </ul>
        </div>
        <div class="attributes__element at__list">
            <ul class="attributes__list">
                <li data-lang="28">4 lůžka + 1 přistýlka </li>
				<li data-lang="29">přístup není bezbariérový</li>
            </ul>
        </div>
        `;
  }
    
  if (width < 1024 && row3.childElementCount !== 0) {
    row3.innerHTML = "";
    row2.appendChild(ul);
  }

//   if (!localStorage.getItem("lang")) return;
//   const lang = localStorage.getItem("lang");
//   const filePath = `../../assets/data/translation-${lang}.json`;
//   getJson(filePath).then(data => {
//     document.querySelectorAll("[data-lang]").forEach(singleEl => {
//       const key = singleEl.getAttribute("data-lang");
//       singleEl.innerText = data[key];
//     });
//   });
}

function checkLanguage(params) {
    if (!localStorage.getItem("lang")) return;
    const lang = localStorage.getItem("lang");
    const filePath = `../../assets/data/translation-${lang}.json`;
    setLanguage(filePath);
    
}

function setLanguage(filePath) {
    getJson(filePath).then(data => {
        document.querySelectorAll("[data-lang]").forEach(singleEl => {
        const key = singleEl.getAttribute("data-lang");
        singleEl.innerText = data[key];
        });
    });
}

function resizedBasedTasks() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    placeApartmentList(width);
    resizeShowcaseContent(width);
    resizeQuoteBoxes();
    checkLanguage();

    // resize icon in nearby section
    bIco.style.height = bImg.offsetHeight + "px";
    bIco.style.width = bImg.offsetWidth + "px";
}
function timelineInit() {
    tl.to(".navbar", {
    height: "100%",
    width: '350px',
    duration: 0.6,
    borderRadius: "0 0 0 10em"
  })
    .to(".showcase__content", {
      opacity: 0,
      duration: 1
    })
    .to(
      ".navbar__link",
      {
        display: "block",
        duration: 0.1
      },
      "-=1"
    )
    .to(
      ".navbar__item",
      {
        opacity: 1,
        duration: 0.2,
        stagger: 0.2
      },
      "-=0.6"
    )

    .reverse();
}

function navbarToggle() {
    navbar.toggleState();
    showcase.classList.toggle("active");
    tl.reversed() ? tl.play() : tl.reverse();
}

// Event Listeners
    // Resize
window.addEventListener("resize", () => {
    resizedBasedTasks();
});
// Scroll   
window.addEventListener("scroll", () => {
  if (window.innerWidth >= 568) {
    const windowHeight = window.innerHeight;
    const targetHeight = showcase__content.offsetHeight;

    if (windowHeight / 3 - targetHeight > window.pageYOffset) {
      requestAnimationFrame(animate);
    }
  }

    function animate() {
        let scrolled = window.pageYOffset;
        const rate = scrolled * 2.3;
        showcase__content.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  new formValidation(form);
  const smoothScroll = new ScrollMaster(1000, ".smoothScroll");
  smoothScroll.init();
  new Language(".flag-icon");
});

// Window Load
window.addEventListener("load", () => {
    resizedBasedTasks();
    timelineInit();
    // Gallery images init
    for (let index = 1; index < 22; index++) {
        previewImgs.push(`./assets/img/gallery/${index}.jpg`);
        src.push(`assets/img/gallery/${index}.jpg`);
    }
    new Gallery(".gallery-container", previewImgs, src, classes);
    new Lazy();
});

// Navbar button click
navbar.btn.addEventListener("click", () => {
    navbarToggle();
});

// Navlinks click
navlinks.forEach(nl => {
  nl.addEventListener("click", () => {
      navbarToggle();
  });
});