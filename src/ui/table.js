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

export function clearExchangeTable() {
  document.querySelector("#exchange-table-body").innerHTML = "";
}
