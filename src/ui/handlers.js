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
  if (!selectedDate) return "latest";

  return selectedDate;
}

function handleCurrencyListClick(clickedCurrency) {
  if (clickedCurrency) {
    const $currencyInput = document.querySelector("#currency-input");
    const currencyCode = getCurrencyCode(clickedCurrency);
    const selectedCurrency = ($currencyInput.value = currencyCode);
    return selectedCurrency;
  }
}
