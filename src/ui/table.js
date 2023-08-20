import { getExchangeData } from "../api/exchange.js";
import { createTableCurrencyList } from "./list.js";
import { setElementVisibility } from "./utils.js";
import { getExistingCurrencies } from "../utils/general.js";
import { handleListChange, handleInputDate, handleInputCurrency } from "./handlers.js";

export function displayExchangeTable(currency, date) {
  getExchangeData(currency, date).then((exchange) => {
    const { base, present, rates } = exchange;
    if (rates === undefined) setElementVisibility("#error-message", "visible");

    clearExchangeTable();
    createExchangeTable(rates);
    createTableCurrencyList(rates);
    setTableCurrencyTitle(base, currency);
    setTableExchangeDate(present, date);
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

    timeout = setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      clearExchangeTable();
      displayLoadingTable();
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
  const existingCurrencies = getExistingCurrencies(currencies);

  currencies.forEach((rate, index) => {
    const $row = document.createElement("tr");
    const $currencyNumber = document.createElement("td");
    const $currencyCode = document.createElement("td");
    const $currencyFullName = document.createElement("td");
    const $rate = document.createElement("td");

    $currencyNumber.innerText = index + 1;
    $currencyCode.innerText = rate;
    $currencyCode.className = "currency-code";
    $currencyFullName.innerText = existingCurrencies[index];
    $rate.innerText = `$${currency[rate]}`;

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

    const $loadingCurrencyNumber = document.createElement("td");
    const $loadingNumberPlaceholder = document.createElement("span");
    $loadingNumberPlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingCurrencyNumber.appendChild($loadingNumberPlaceholder);

    const $loadingCurrencyCode = document.createElement("td");
    const $loadingCodePlaceholder = document.createElement("span");
    $loadingCodePlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingCurrencyCode.appendChild($loadingCodePlaceholder);

    const $loadingFullName = document.createElement("td");
    const $loadingFullNamePlaceholder = document.createElement("span");
    $loadingFullNamePlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingFullName.appendChild($loadingFullNamePlaceholder);

    const $loadingRate = document.createElement("td");
    const $loadingRatePlaceholder = document.createElement("span");
    $loadingRatePlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingRate.appendChild($loadingRatePlaceholder);

    $row.appendChild($loadingCurrencyNumber);
    $row.appendChild($loadingCurrencyCode);
    $row.appendChild($loadingFullName);
    $row.appendChild($loadingRate);
    $table.appendChild($row);
  }
}

function setTableCurrencyTitle(base, currency) {
  const baseCurrency = base;
  const currentInputValue = currency;
  const currentTitle = document.querySelector("#current-currency");
  const $code = document.querySelectorAll(".currency-code");

  for (const code of $code) {
    if (currentInputValue === code.innerText) {
      return (currentTitle.innerText = `Currently displaying ${currentInputValue}`);
    }
  }

  return (currentTitle.innerText = `Currently displaying ${baseCurrency}`);
}

function setTableExchangeDate(present, date) {
  const presentDate = present;
  const currentInputDate = date;
  const currentDateTitle = document.querySelector("#current-date");

  if (currentInputDate && currentInputDate !== "latest") {
    return (currentDateTitle.innerText = `At ${currentInputDate} as date of exchange`);
  }

  return (currentDateTitle.innerText = `At ${presentDate} as date of exchange`);
}

function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}
