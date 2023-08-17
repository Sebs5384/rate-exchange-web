import { displayExchangeTable, setTableListChanges, setTableCurrencyChanges, setTableDateChanges } from "./table.js";

export function updateExchangeTable() {
  const $list = document.querySelector("#table-currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  displayExchangeTable();
  setTableListChanges($list, $date);
  setTableCurrencyChanges($currency, $date);
  setTableDateChanges($date, $currency);
}

export function updateExchangeConverter() {}
