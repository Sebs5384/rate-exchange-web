import { getCurrencyCode } from "./utils.js";

export function handleInputCurrency(currency) {
  const selectedCurrency = currency.value;
  return selectedCurrency;
}

export function handleListChange(list) {
  const $clickedCurrency = list.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency);
  return selectedCurrency;
}

export function handleInputDate(date) {
  const selectedDate = date.value;
  return selectedDate;
}

function handleCurrencyListClick(click) {
  if (click) {
    const $currencyInput = document.querySelector("#currency-input");
    const currencyCode = getCurrencyCode(click);
    const selectedCurrency = ($currencyInput.value = currencyCode);
    return selectedCurrency;
  }
}
