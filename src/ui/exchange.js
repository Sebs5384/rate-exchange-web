import { getExchangeRates, getExchangeBase, getExchangeDate } from "../api/exchange.js";
import { setupCurrencyChanges, setupDateChanges, setupListChanges, setCurrencyTitle, setDateTitle } from "./utils.js";
import { createExchangeTable, clearExchangeTable } from "./table.js";
import { createCurrencyList } from "./list.js";
import { setElementVisibility } from "./utils.js";

export function displayExchangeUI(currency, date) {
  getExchangeRates(currency, date).then((rates) => {
    if (rates === undefined) setElementVisibility("#error-message", "visible");

    clearExchangeTable();
    createExchangeTable(rates);
    createCurrencyList(rates);
  });

  getExchangeBase().then((base) => {
    setCurrencyTitle(base, currency);
  });

  getExchangeDate().then((present) => {
    setDateTitle(present, date);
  });
}

export function updateExchangeUI() {
  const $list = document.querySelector("#currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  setupListChanges($list, $date);
  setupCurrencyChanges($currency, $date);
  setupDateChanges($date, $currency);
}
