import { getExchangeRates, getExchangeBase, getExchangeDate } from "../api/exchange.js";
import { setupCurrencyChanges, setupDateChanges, setupListChanges, setCurrencyTitle, setDateTitle } from "./utils.js";
import { createCurrencyList } from "./list.js";
import { createExchangeTable, clearExchangeTable } from "./table.js";

export function displayExchangeUI(currency, date) {
  getExchangeRates(currency, date).then((rates) => {
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
  setupCurrencyChanges($currency);
  setupDateChanges($date, $currency);
}
