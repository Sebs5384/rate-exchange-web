import { getExchangeRates } from "../api/exchange.js";
import { createTableCurrencyList } from "./list.js";
import { setElementVisibility } from "./general.js";
import { getCurrenciesFullName } from "../utils/general.js";
import { handleListChange, handleInputDate, handleInputCurrency } from "./handlers.js";

export function displayExchangeTable(currency, date) {
  getExchangeRates(currency, date).then((exchange) => {
    const { base, date, rates } = exchange;
    if (rates === undefined) setElementVisibility("#error-message", "visible");

    clearExchangeTable();
    createExchangeTable(rates);
    createTableCurrencyList(rates);
    setTableCurrencyTitle(base);
    setTableExchangeDate(date);
  });
}

export function setupTableListChanges(list, date) {
  list.onclick = (currency) => {
    const clickedCurrency = handleListChange(currency, "#table-currency-input");
    const selectedDate = handleInputDate(date);

    clearExchangeTable();
    displayLoadingTable();
    displayExchangeTable(clickedCurrency, selectedDate);
  };
}

export function setupTableCurrencyChanges(currency, date) {
  let timeout;

  currency.oninput = () => {
    clearTimeout(timeout);
    clearExchangeTable();
    displayLoadingTable();

    timeout = setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      displayExchangeTable(selectedCurrency, selectedDate);
    }, 500);
  };
}

export function setupTableDateChanges(date, currency) {
  let timeout;

  date.oninput = () => {
    clearTimeout(timeout);
    clearExchangeTable();
    displayLoadingTable();

    timeout = setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      displayExchangeTable(selectedCurrency, selectedDate);
    }, 1000);
  };
}

function createExchangeTable(currency) {
  const $exchangeTable = document.querySelector("#exchange-table-body");
  const currencies = Object.keys(currency);
  const existingCurrencies = getCurrenciesFullName(currencies);

  currencies.forEach((rate, index) => {
    const $row = document.createElement("tr");
    const $currencyNumber = document.createElement("td");
    const $currencyCode = document.createElement("td");
    const $currencyFullName = document.createElement("td");
    const $rate = document.createElement("td");

    $row.className = "lightblue-border";
    $currencyNumber.innerText = index + 1;

    $currencyCode.innerText = rate;
    $currencyCode.className = "table-currency-code";
    $currencyCode.dataset.code = `${rate}`;

    $currencyFullName.innerText = existingCurrencies[index];
    $rate.innerText = `$${currency[rate]}`;
    $rate.dataset.cy = `${rate}-exchange`;

    $row.appendChild($currencyNumber);
    $row.appendChild($currencyCode);
    $row.appendChild($currencyFullName);
    $row.appendChild($rate);
    $exchangeTable.appendChild($row);
  });
}

function displayLoadingTable() {
  setElementVisibility("#error-message", "hidden");

  const $table = document.querySelector("#exchange-table-body");

  for (let i = 0; i < 10; i++) {
    const $row = document.createElement("tr");
    $row.className = "placeholder-glow";
    $row.setAttribute("data-cy", "loading-table");

    for (let i = 0; i < 4; i++) {
      const $cell = document.createElement("td");
      const $placeHolder = document.createElement("span");
      $placeHolder.className = "loading placeholder col-12 bg-primary";
      $cell.appendChild($placeHolder);
      $row.appendChild($cell);
    }

    $table.appendChild($row);
  }
}

function setTableCurrencyTitle(base) {
  const currentTitle = document.querySelector("#current-currency");
  currentTitle.innerText = `Currently displaying ${base}`;
}

function setTableExchangeDate(date) {
  const currentDateTitle = document.querySelector("#current-date");
  currentDateTitle.innerText = `At ${date} as date of exchange`;
}

export function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}
