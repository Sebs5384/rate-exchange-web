import { displayExchangeTable } from "./table.js";
import { setupCurrencyChanges, setupDateChanges, setupListChanges } from "./utils.js";

export function updateExchangeTable() {
  const $list = document.querySelector("#table-currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  displayExchangeTable();
  setupListChanges($list, $date);
  setupCurrencyChanges($currency, $date);
  setupDateChanges($date, $currency);
}
