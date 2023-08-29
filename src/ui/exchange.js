import { displayExchangeTable, setupTableListChanges, setupTableCurrencyChanges, setupTableDateChanges } from "./table.js";
import { displayConversionResults, setupFromListChanges, setupToListChanges, setupConversionButton, setupConverterCurrencyList, setupConversionResetButton, setUpFluctuationButton } from "./converter.js";

export function updateExchangeTable() {
  const $list = document.querySelector("#table-currency-list");
  const $currency = document.querySelector("#table-currency-input");
  const $date = document.querySelector("#currency-date");

  setupTableListChanges($list, $date);
  setupTableCurrencyChanges($currency, $date);
  setupTableDateChanges($date, $currency);
  displayExchangeTable();
}

export function updateExchangeConverter() {
  const $fromList = document.querySelector("#convert-from-list");
  const $toList = document.querySelector("#convert-to-list");
  const $from = document.querySelector("#converter-from-input");
  const $to = document.querySelector("#converter-to-input");
  const $amount = document.querySelector("#converter-amount-input");

  setupFromListChanges($fromList);
  setupToListChanges($toList);
  setupConversionButton($from, $to, $amount);
  setUpFluctuationButton($from, $to);
  setupConversionResetButton();
  setupConverterCurrencyList();
  displayConversionResults();
}
