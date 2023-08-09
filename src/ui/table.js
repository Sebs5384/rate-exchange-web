import { getExistingCurrencies } from "../utils/general.js";

export function createExchangeTable(currency) {
  const $exchangeTable = document.querySelector("#exchange-table-body");
  const currencies = Object.keys(currency);
  const existingCurrencies = getExistingCurrencies(currencies);

  currencies.forEach((rate, index) => {
    const $row = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currencyCode = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

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
  const $table = document.querySelector("#exchange-table-body");

  for (let i = 0; i < 8; i++) {
    const $row = document.createElement("tr");
    $row.className = "placeholder-glow";

    const $loadingCurrencyNumber = document.createElement("th");
    const $loadingNumberPlaceholder = document.createElement("span");
    $loadingNumberPlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingCurrencyNumber.appendChild($loadingNumberPlaceholder);

    const $loadingCurrencyCode = document.createElement("th");
    const $loadingCodePlaceholder = document.createElement("span");
    $loadingCodePlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingCurrencyCode.appendChild($loadingCodePlaceholder);

    const $loadingFullName = document.createElement("th");
    const $loadingFullNamePlaceholder = document.createElement("span");
    $loadingFullNamePlaceholder.className = "loading placeholder col-12 bg-primary";
    $loadingFullName.appendChild($loadingFullNamePlaceholder);

    const $loadingRate = document.createElement("th");
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

export function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}
