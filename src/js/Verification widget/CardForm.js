import { CardValidator } from "./CardValidator.js";

export class CardForm {
  constructor() {
    this.validator = new CardValidator();
    this.bindToDOM();
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }

  static get cardInputSelector() {
    return ".cardInput";
  }

  static get formSelector() {
    return ".cardForm";
  }

  static get resultSelector() {
    return ".result";
  }

  static get logosSelector() {
    return ".logo";
  }

  static get logosContainerSelector() {
    return ".logos";
  }

  bindToDOM() {
    this.cardInput = document.querySelector(CardForm.cardInputSelector);
    this.form = document.querySelector(CardForm.formSelector);
    this.resultDiv = document.querySelector(CardForm.resultSelector);
    this.logos = Array.from(document.querySelectorAll(CardForm.logosSelector));
    this.logosContainer = document.querySelector(
      CardForm.logosContainerSelector,
    );
  }

  updateLogos(cardType) {
    this.logos.forEach((logo) => {
      if (cardType && logo.dataset.name === cardType) {
        logo.classList.add("active");
      } else {
        logo.classList.remove("active");
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const value = this.cardInput.value.trim();
    if (value.length === 0) return;

    const cardType = this.validator.getCardType(value);
    const isValid = this.validator.isValid(value);
    this.logosContainer.classList.add("checked");
    this.updateLogos(cardType);

    this.resultDiv.innerHTML = `
      Проверка пройдена: <strong class="${isValid ? "text-green" : "text-red"}">
      ${isValid ? "да" : "нет"}</strong><br />
      Платёжная система: <strong>${cardType ?? "не определена"}</strong>
    `;
  }
}
