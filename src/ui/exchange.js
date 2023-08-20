import { displayExchangeTable, setTableListChanges, setTableCurrencyChanges, setTableDateChanges } from "./table.js";
import { displayConvertionResults, setFromListChanges, setToListChanges } from "./converter.js";

export function updateExchangeTable() {
  const $list = document.querySelector("#table-currency-list");
  const $currency = document.querySelector("#table-currency-input");
  const $date = document.querySelector("#currency-date");

  setTableListChanges($list, $date);
  setTableCurrencyChanges($currency, $date);
  setTableDateChanges($date, $currency);
  displayExchangeTable();
}

export function updateExchangeConverter() {
  const $fromList = document.querySelector("#convert-from-list");
  const $toList = document.querySelector("#convert-to-list");

  setFromListChanges($fromList);
  setToListChanges($toList);
  displayConvertionResults();
}
