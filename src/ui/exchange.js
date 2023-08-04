import { getExchangeRates } from "../api/exchange.js";
import { clearExchangeTable, createExchangeTable, createCurrencyList } from "./utils.js";
import { handleListChange, handleInputCurrency, handleInputDate } from "./handlers.js";

export function displayExchangeUI(currencyCode = null, date = null) {
  return getExchangeRates(currencyCode, date).then((rates) => {
    clearExchangeTable();
    createExchangeTable(rates);
    createCurrencyList(rates);
  });
}

export function updateExchangeUI() {
  const $list = document.querySelector("#currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  $list.onclick = (list) => {
    displayExchangeUI(handleListChange(list), handleInputDate($date));
  };
  $currency.oninput = () => {
    displayExchangeUI(handleInputCurrency($currency));
  };

  $date.oninput = () => {
    setTimeout(() => {
      displayExchangeUI(handleInputCurrency($currency), handleInputDate($date));
    }, 1000);
  };
}
