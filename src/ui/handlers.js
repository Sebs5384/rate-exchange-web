import { getCurrencyCode } from "./utils.js";
import { displayExchangeUI } from "./exchange.js";

export function handleInputChange(currency, date) {
  const selectedCurrency = currency.value;
  const selectedDate = date.value;
  displayExchangeUI(selectedCurrency, selectedDate || null);
}

export function handleListChange(event, date) {
  const $clickedCurrency = event.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency);
  displayExchangeUI(selectedCurrency, date || null);
}

export function handleInputDate(currency, date) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleInputChange(currency, date);
    }, 500);
  };
}

function handleCurrencyListClick(click) {
  if (click) {
    const $currencyInput = document.querySelector("#currency-input");
    const currencyCode = getCurrencyCode(click);
    const selectedCurrency = ($currencyInput.value = currencyCode);
    return selectedCurrency;
  }
}
