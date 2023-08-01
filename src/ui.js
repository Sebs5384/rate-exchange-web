const $currencyList = document.querySelector("#currency-list");
const $convertButton = document.querySelector("#convert-button");
const $currency = document.querySelector("#currency-input").value;
let $clickedCurrency;

function createExchangeTable(rates) {
  const $currencyTable = document.querySelector("#currency-rates");
  const $rates = Object.keys(rates);
  clearCurrenciesField("#currency-rates");

  $rates.forEach((rate, index) => {
    const $tr = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currency = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currency.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `${rates[rate]}`;
    $tr.appendChild($currencyNumber);
    $tr.appendChild($currency);
    $tr.appendChild($currencyFullName);
    $tr.appendChild($rate);
    $currencyTable.appendChild($tr);
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
