export function validateLuhn(cardNumber) {
  const sanitized = cardNumber.replace(/\D/g, "");
  if (sanitized.length === 0) return false;
  const digits = sanitized
    .split("")
    .reverse()
    .map((d) => +d);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
