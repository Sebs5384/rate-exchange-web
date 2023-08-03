import { getExchangeRates } from "../api/exchange.js";
import { clearExchangeTable, createExchangeTable, createCurrencyList } from "./utils.js";
import { handleListChange, handleInputChange, handleInputDate } from "./handlers.js";

export function displayExchangeUI(currencyCode = null, date = null) {
  return getExchangeRates(currencyCode, date)
    .then((rates) => {
      clearExchangeTable();
      createExchangeTable(rates);
      createCurrencyList(rates);
    })
    .catch((error) => {
      console.error("Error while attempting to display exchange rates", error);
      throw error;
    });
}

export function updateExchangeUI() {
  const $list = document.querySelector("#currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  $list.onclick = (event) => handleListChange(event, $date);
  $currency.oninput = () => handleInputChange($currency, $date);
  $date.oninput = handleInputDate($currency, $date);
}
