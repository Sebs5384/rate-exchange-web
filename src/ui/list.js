import { getCurrenciesFullName } from "../utils/general.js";

export function createTableCurrencyList(currencyCode) {
  const $currencyList = document.querySelector("#table-currency-list");
  const currenciesCode = Object.keys(currencyCode);
  const existingCurrenciesFullName = getCurrenciesFullName(currenciesCode);

  $currencyList.innerText = "";
  currenciesCode.forEach((currencyCode, index) => {
    const $list = document.createElement("li");
    const $item = document.createElement("a");
    $item.className = "dropdown-item text-start";
    $item.href = "#";
    $item.innerText = `${currencyCode} - ${existingCurrenciesFullName[index]}`;

    $list.appendChild($item);
    $currencyList.appendChild($list);
  });
}

export function createConverterCurrencyList(currencies) {
  const $currencyLists = document.querySelectorAll(".converter-currency-list");
  const currenciesFullName = getCurrenciesFullName(currencies);

  $currencyLists.forEach((currencyList, index) => {
    currencies.forEach((currency, index) => {
      const $list = document.createElement("li");
      const $item = document.createElement("a");

      $item.className = "dropdown-item text-start";
      $item.href = "#";
      $item.innerText = `${currency} - ${currenciesFullName[index]}`;

      $list.appendChild($item);
      currencyList.appendChild($list);
    });
  });
}
