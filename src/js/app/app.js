import { CardForm } from "../Verification widget/CardForm";

export function StartValidation() {
  new CardForm();
}

document.addEventListener("DOMContentLoaded", StartValidation);
