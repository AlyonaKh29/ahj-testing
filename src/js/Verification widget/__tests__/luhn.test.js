import { validateLuhn } from "../luhn";

describe("validateLuhn() function tests", () => {
  const cases = [
    { input: "4627 1001 0165 4724", expected: true },
    { input: "2201 3820 0000 0005", expected: true },
    { input: "4627100101654724", expected: true },
    { input: "2201382000000005", expected: true },
    { input: "2201-3820-0000.0005.", expected: true },
    { input: "4539 1488 0343 6468", expected: false },
    { input: "6011 1111 1111 1116", expected: false },
    { input: "", expected: false },
    { input: "abc-def-ghij", expected: false },
  ];
  cases.forEach(({ input, expected }) => {
    test(`проверка для "${input}": должно вернуть ${expected}`, () => {
      const result = validateLuhn(input);
      expect(result).toBe(expected);
    });
  });
});
