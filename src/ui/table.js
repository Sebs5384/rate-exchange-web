import { getExistingCurrencies } from "../utils/general.js";
import { setElementVisibility } from "./utils.js";

export function createExchangeTable(currency) {
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

export function displayLoadingTable() {
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

export function updateTableCurrencyTitle(base, currency) {
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

export function updateTableExchangeDate(present, date) {
  const presentDate = present;
  const currentInputDate = date;
  const currentDateTitle = document.querySelector("#current-date");

  if (currentInputDate && currentInputDate !== "latest") {
    return (currentDateTitle.innerText = `At ${currentInputDate} as date of exchange`);
  }

  return (currentDateTitle.innerText = `At ${presentDate} as date of exchange`);
}

export function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}
