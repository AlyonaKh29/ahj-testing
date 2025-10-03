import { validateLuhn } from "./luhn.js";

export class CardValidator {
  constructor() {
    this.patterns = [
      { name: "Visa", regex: /^4\d{12}(\d{3})?(\d{3})?$/ },
      {
        name: "MasterCard",
        regex:
          /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/,
      },
      { name: "American Express", regex: /^3[47]\d{13}$/ },
      {
        name: "Discover",
        regex:
          /^(6011\d{12}|65\d{14}|64[4-9]\d{13}|622(12[6-9]\d{10}|1[3-9]\d{11}|[2-8]\d{12}|9[01]\d{11}|92[0-5]\d{10}))$/,
      },
      { name: "JCB", regex: /^(352[8-9]\d{12}|35[3-8]\d{13})$/ },
      { name: "Diners Club", regex: /^3(0[0-5]|[68]\d)\d{11}$/ },
      { name: "МИР", regex: /^220[0-4]\d{12}$/ },
    ];
  }

  getCardType(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");
    for (const { name, regex } of this.patterns) {
      if (regex.test(cleaned)) return name;
    }
    return null;
  }

  isValid(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");
    if (cleaned.length < 13) return false;
    return validateLuhn(cleaned);
  }
}
