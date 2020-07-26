import getJson from "./httpHandler";
export class Language {
  constructor(flagContainer) {
    this.flagContainer = flagContainer;
    this.form = {
      name: document.getElementById("name"),
      subject: document.getElementById("subject"),
      email: document.getElementById("email"),
      year: document.getElementById("year"),
      msg: document.getElementById("msg"),
      submit: document.getElementById("submit")
    };
    this.lang = this.getLanguage();
    this.init();
  }

  init() {
    this.placeFlags();
    this.translate(this.lang);
  }

  getLanguage() {
    return localStorage.getItem("lang") ? localStorage.getItem("lang") : "cz";
  }

  getFlags() {
    this.lang = this.getLanguage();
    
    let lang = [];
    if (this.lang === "gb") lang = ['cz', 'it'];
    if (this.lang === "cz") lang = ['gb', 'it'];
    if (this.lang === "it") lang = ['cz', 'gb'];
    const flags = lang.map(l => (`<a href='#' class="flag-icon flag-icon-${l}"></a>`));
    return flags;
  }

  changeFlag() {
    const flagContainers = document.querySelectorAll('.flag-icon');

    flagContainers.forEach(f => {
      f.addEventListener("click", e => {
        e.preventDefault();
        const classes = e.target.classList;
        let lang;
        if (classes.contains("flag-icon-gb")) lang = 'gb';
        if (classes.contains("flag-icon-cz")) lang = 'cz';
        if (classes.contains("flag-icon-it")) lang = 'it';
        
        localStorage.setItem("lang", lang);
        this.placeFlags();
        this.translate(lang);
      });
      
    })
  }


  placeFlags() {
    const flagParent = document.querySelector(".lang-flag");
    flagParent.innerHTML = this.getFlags();
    this.changeFlag();
  }

  getFormTranslation(lang) {
    let form = {};
    if (lang === 'cz') form = {
            name: "Jméno a Příjmení",
            subject: "Předmět",
            email: "vas@e-mail.cz",
            year: "Aktuální Rok",
            msg: "Text Vaší zprávy...",
            submit: "Odeslat"
    }
    if (lang === 'gb') form = {
            name: "First name & Surname",
            subject: "Subject",
            email: "your@email-address.com",
            year: "Current Year",
            msg: "Your message...",
            submit: "Send"
    }
     if (lang === 'it') form = {
            name: "Nome e Cognome",
            subject: "Oggetto",
            email: "vostro@mail.eu",
            year: "Anno attuale",
            msg: "Testo di messaggio...",
            submit: "Inviare"
     }
    
    return form;
  }

  async translate(lang) {
    if (!localStorage.getItem("lang")) return;
    const filePath = `../../assets/data/texts-${lang}.json`;
    const translatedElements = document.querySelectorAll("[data-lang");
    const translatedData = await getJson(filePath);
    translatedElements.forEach(singleEl => {
      const key = singleEl.getAttribute("data-lang");
      singleEl.innerText = translatedData[key];
    });

    const form = this.getFormTranslation(lang);

  
    Object.keys(this.form).forEach(key => {
      
      if (this.form[key].type === 'submit') {
        this.form[key].value = form[key];
        return;
      }
      this.form[key].placeholder = form[key];
      
    });
  }
}
