import { getCurrencyCode } from "./utils.js";

export function handleInputCurrency(currency) {
  const selectedCurrency = currency.value;

  return selectedCurrency.toUpperCase();
}

export function handleListChange(list, input) {
  const $clickedCurrency = list.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency, input);

  return selectedCurrency;
}

export function handleInputDate(date) {
  const selectedDate = date.value;

  if (!selectedDate) return "latest";

  return selectedDate;
}

function handleCurrencyListClick(clickedCurrency, input) {
  const $currencyInput = document.querySelector(input);
  const currencyCode = getCurrencyCode(clickedCurrency);
  const selectedCurrency = ($currencyInput.value = currencyCode);

  return selectedCurrency;
}
