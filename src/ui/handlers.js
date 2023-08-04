import { getCurrencyCode } from "./utils.js";

export function handleInputCurrency(currency) {
  const selectedCurrency = currency.value;
  return selectedCurrency;
}

export function handleListChange(list) {
  const $clickedCurrency = list.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency);
  console.log(selectedCurrency);
  return selectedCurrency;
}

export function handleInputDate(date) {
  const selectedDate = date.value;
  if (!selectedDate) return "latest";

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
