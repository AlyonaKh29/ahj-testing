import { CardForm } from "../CardForm";

const HTML = `
<main>
    <div class="logos" aria-label="Логотипы платежных систем">
        <div class="logo" data-name="МИР" title="МИР"><img src="" alt="МИР" /></div>
        <div class="logo" data-name="Visa" title="Visa"><img src="" alt="Visa" /></div>
        <div class="logo" data-name="MasterCard" title="MasterCard"><img src="" alt="MasterCard" /></div>
        <div class="logo" data-name="American Express" title="American Express"><img src="" alt="American Express" /></div>
        <div class="logo" data-name="Discover" title="Discover"><img src="" alt="Discover" /></div>
        <div class="logo" data-name="JCB" title="JCB"><img src="" alt="JCB" /></div>
        <div class="logo" data-name="Diners Club" title="Diners Club"><img src="" alt="Diners Club" /></div>
    </div>

    <form class="cardForm" novalidate>
        <input type="text" class="cardInput" placeholder="Введите номер карты" autocomplete="off" inputmode="numeric" maxlength="19" />
        <button type="submit" class="button">Проверить</button>
    </form>

    <div class="result" aria-live="polite" aria-atomic="true" ></div>
</main>
`;

describe("CardForm jsdom tests", () => {
  let cardForm;

  beforeEach(() => {
    document.body.innerHTML = HTML;
    cardForm = new CardForm();
  });

  afterEach(() => {
    cardForm = null;
    document.body.innerHTML = "";
  });

  describe("Valid card numbers with expected types", () => {
    const validCards = [
      ["2201382000000039", "МИР"],
      ["4486441729154030", "Visa"],
      ["5538300838605560", "MasterCard"],
      ["340000000000009", "American Express"],
    ];

    test.each(validCards)(
      'card number "%s" activates logo "%s" and shows valid result',
      (cardNumber, expectedType) => {
        cardForm.cardInput.value = cardNumber;
        const submitEvent = new Event("submit");
        cardForm.form.dispatchEvent(submitEvent);

        const activeLogos = cardForm.logos
          .filter((logo) => logo.classList.contains("active"))
          .map((logo) => logo.dataset.name);
        expect(activeLogos).toEqual([expectedType]);

        const resultHTML = cardForm.resultDiv.innerHTML.trim();
        expect(resultHTML).toContain("да");
        expect(resultHTML).toContain(expectedType);
      },
    );
  });

  describe("Invalid card numbers", () => {
    const invalidCards = [["1234567890123456", null]];

    test.each(invalidCards)(
      'card number "%s" activates no logos and shows invalid result',
      (cardNumber) => {
        cardForm.cardInput.value = cardNumber;
        const submitEvent = new Event("submit");
        cardForm.form.dispatchEvent(submitEvent);

        const activeLogos = cardForm.logos
          .filter((logo) => logo.classList.contains("active"))
          .map((logo) => logo.dataset.name);
        expect(activeLogos).toEqual([]);

        const resultHTML = cardForm.resultDiv.innerHTML.trim();
        expect(resultHTML).toContain("нет");
        expect(resultHTML).toContain("не определена");
      },
    );
  });

  describe("Empty input", () => {
    test("empty card number shows empty result and no active logos", () => {
      const cardNumber = "";
      cardForm.cardInput.value = cardNumber;
      const submitEvent = new Event("submit");
      cardForm.form.dispatchEvent(submitEvent);
      const activeLogos = cardForm.logos
        .filter((logo) => logo.classList.contains("active"))
        .map((logo) => logo.dataset.name);
      expect(activeLogos).toEqual([]);

      const resultHTML = cardForm.resultDiv.innerHTML.trim();
      expect(resultHTML).toBe("");
    });
  });
});
