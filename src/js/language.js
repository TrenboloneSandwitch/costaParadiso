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
    this.placeFlag();
    this.translate(this.lang);
  }

  getLanguage() {
    return localStorage.getItem("lang") ? localStorage.getItem("lang") : "cz";
  }

  getFlag() {
    this.lang = this.getLanguage();
    const lang = this.lang === "gb" ? "cz" : "gb";
    return `
        <a href='#' class="flag-icon flag-icon-${lang}"></a>
        `;
  }

  changeFlag() {
    const flagContainer = document.querySelector(this.flagContainer);
    flagContainer.addEventListener("click", e => {
      e.preventDefault();
      const classes = e.target.classList;
      const lang = classes.contains("flag-icon-gb") ? "gb" : "cz";

      localStorage.setItem("lang", lang);
      this.placeFlag();
      this.translate(lang);
    });
  }

  placeFlag() {
    const flagParent = document.querySelector(".lang-flag");
    flagParent.innerHTML = this.getFlag();
    this.changeFlag();
  }

  async translate(lang) {
    if (!localStorage.getItem("lang")) return;
    const filePath = `../../assets/data/translation-${lang}.json`;
    const translatedElements = document.querySelectorAll("[data-lang");
    const translatedData = await getJson(filePath);
    translatedElements.forEach(singleEl => {
      const key = singleEl.getAttribute("data-lang");
      singleEl.innerText = translatedData[key];
    });

    const form =
      lang === "cz"
        ? {
            name: "Jméno a Příjmení",
            subject: "Předmět",
            email: "vas@e-mail.cz",
            year: "Aktuální Rok",
            msg: "Text Vaší zprávy...",
            submit: "Odeslat"
          }
        : {
            name: "Name & Surname",
            subject: "Subject",
            email: "your@email.com",
            year: "Current Year",
            msg: "Text of your message...",
            submit: "Send"
          };

    Object.keys(this.form).forEach(key => {
      this.form[key].placeholder = form[key];
    });
  }
}
