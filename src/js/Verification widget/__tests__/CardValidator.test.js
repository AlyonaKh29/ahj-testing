import { CardValidator } from "../CardValidator.js";

describe("CardValidator class tests", () => {
  let validator;

  beforeEach(() => {
    validator = new CardValidator();
  });

  describe("getCardType() method tests", () => {
    const cardTypeVariants = [
      ["4111111111111111", "Visa"],
      ["4486441729154030", "Visa"],
      ["5467929858074128", "MasterCard"],
      ["5538300838605560", "MasterCard"],
      ["375700000000002", "American Express"],
      ["375117436823644", "American Express"],
      ["6505048452852359", "Discover"],
      ["6522237709349967", "Discover"],
      ["3530111333300000", "JCB"],
      ["3566002020360505", "JCB"],
      ["36998912320630", "Diners Club"],
      ["30000000000004", "Diners Club"],
      ["2201382000000104", "МИР"],
      ["2204000000000000", "МИР"],
    ];

    test.each(cardTypeVariants)("%s %s", (rawNumber, expectedType) => {
      const withSeparators = rawNumber.replace(/(\d{4})(?=\d)/g, "$1-");
      expect(validator.getCardType(withSeparators)).toBe(expectedType);
    });

    test("returns null for unknown or too-short numbers", () => {
      expect(validator.getCardType("1234")).toBeNull();
      expect(validator.getCardType("8888-8888-8888-8888")).toBeNull();
    });
  });

  describe("isValid() method tests", () => {
    const validLuhnNumbers = [
      ["Visa", "4539 1488 0343 6467"],
      ["МИР", "2201-3820-0000-0104"],
      ["AmEx", "3751 1843 5530560"],
    ];

    test.each(validLuhnNumbers)("%s should be valid", (_name, cardNumber) => {
      expect(validator.isValid(cardNumber)).toBe(true);
    });

    const invalidLuhnNumbers = [
      ["4539 1488 0343 6468"],
      ["6011-1111-1111-1116"],
      ["3782 822463 10006"],
    ];

    test.each(invalidLuhnNumbers)("%s should be invalid", (cardNumber) => {
      expect(validator.isValid(cardNumber)).toBe(false);
    });

    test("short numbers", () => {
      expect(validator.isValid("123456789012")).toBe(false);
    });

    test("non-digit chars ignored", () => {
      expect(validator.isValid("4539-1488-0343.6467")).toBe(true);
    });
  });
});
