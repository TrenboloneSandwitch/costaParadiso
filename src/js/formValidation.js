import { log } from "util";
import { PopUpMsg  } from './message';

const Joi = require("joi");
export class formValidation {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll(".form__input");
    this.textArea = form.querySelector(".form__text-area");
    this.errorMsgContainer = document.querySelector(".form__messages");

    this.form.addEventListener("submit", e => this.submitForm(e));
  }

  submitForm(e) {
    const errors = [];

    const formObject = {
      name: this.inputs[0].value,
      subject: this.inputs[1].value,
      email: this.inputs[2].value,
      msg: this.textArea.value
    };
    const date = new Date().getFullYear();

    if (parseInt(this.inputs[3].value.trim()) !== date) {
      errors.push("vyplněný rok se neshoduje s aktuálním / you entered an invalid year");
    }

    const { error } = this.validateForm(formObject);
    if (error)
      error.details.forEach(det => {
        det.message = det.message.replace('"name"', "jméno");
        det.message = det.message.replace('"email"', "email");
        det.message = det.message.replace('"subject"', "předmět");
        det.message = det.message.replace('"msg"', "Text");

        errors.push(det.message);
      });
    if (errors.length > 0) {
      this.createErrorMessages(errors);
      e.preventDefault();
    }
    
  }

  createErrorMessages(errors) {
    
    errors.forEach(err => {

      const pop = new PopUpMsg('error', err).createPopUp();
      this.errorMsgContainer.appendChild(pop);

      setTimeout(() => {
        pop.remove();
      }, 10000);
    });   
  }

  validateForm(formObject) {
    const schema = {
      name: Joi.string()
        .min(5)
        .max(30)
        .required(),
      subject: Joi.string()
        .min(3)
        .max(35)
        .required(),
      email: Joi.string().email({ minDomainAtoms: 2 }),
      msg: Joi.string()
        .min(8)
        .required()
    };
    return Joi.validate(formObject, schema, { abortEarly: false });
  }
}