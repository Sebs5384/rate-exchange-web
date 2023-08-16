import { getExchangeRates, getExchangeBase, getExchangeDate, getConvertion } from "../api/exchange.js";
import { setupCurrencyChanges, setupDateChanges, setupListChanges, setElementVisibility } from "./utils.js";
import { createExchangeTable, clearExchangeTable, updateTableCurrencyTitle, updateTableExchangeDate } from "./table.js";
import { createCurrencyList } from "./list.js";

export function displayExchangeTable(currency, date) {
  getExchangeRates(currency, date).then((rates) => {
    if (rates === undefined) setElementVisibility("#error-message", "visible");

    clearExchangeTable();
    createExchangeTable(rates);
    createCurrencyList(rates);
  });

  getExchangeBase().then((base) => {
    updateTableCurrencyTitle(base, currency);
  });

  getExchangeDate().then((present) => {
    updateTableExchangeDate(present, date);
  });
}

export function updateExchangeUI() {
  const $list = document.querySelector("#table-currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  setupListChanges($list, $date);
  setupCurrencyChanges($currency, $date);
  setupDateChanges($date, $currency);
}
