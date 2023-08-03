import { currenciesName } from "../utils/currency-name.js";
function createExchangeTable(rates) {
  const $exchangeTable = document.querySelector("#exchange-rates");
  const $rates = Object.keys(rates);

  $rates.forEach((rate, index) => {
    const $tr = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currencyCode = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currencyCode.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `$${rates[rate].toFixed(3)}`;
    $tr.appendChild($currencyNumber);
    $tr.appendChild($currencyCode);
    $tr.appendChild($currencyFullName);
    $tr.appendChild($rate);
    $exchangeTable.appendChild($tr);
  });
}

function createCurrencyList(rates) {
  const $currencyList = document.querySelector("#currency-list");
  const currencies = Object.keys(rates);

  currencies.forEach((currency, index) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");
    $a.className = "dropdown-item";
    $a.href = "#";
    $a.innerText = `${currency} ${currenciesName[index]}`;

    $li.appendChild($a);
    $currencyList.appendChild($li);
  });
}

function clearExchangeTable() {
  document.querySelector("#exchange-rates").innerHTML = "";
}

function getCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

export { createExchangeTable, createCurrencyList, clearExchangeTable, getCurrencyCode };
