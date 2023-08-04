import { currenciesName } from "../utils/currency-name.js";
export function createExchangeTable(rates) {
  const $exchangeTable = document.querySelector("#exchange-table-body");
  const $rates = Object.keys(rates);

  $rates.forEach((rate, index) => {
    const $row = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currencyCode = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currencyCode.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `$${rates[rate]}`;
    $row.appendChild($currencyNumber);
    $row.appendChild($currencyCode);
    $row.appendChild($currencyFullName);
    $row.appendChild($rate);
    $exchangeTable.appendChild($row);
  });
}

export function createCurrencyList(rates) {
  const $currencyList = document.querySelector("#currency-list");
  const currencies = Object.keys(rates);

  currencies.forEach((currency, index) => {
    const $list = document.createElement("li");
    const $item = document.createElement("a");
    $item.className = "dropdown-item text-start";
    $item.href = "#";
    $item.innerText = `${currency} - ${currenciesName[index]}`;

    $list.appendChild($item);
    $currencyList.appendChild($list);
  });
}

export function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}

export function getCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}
