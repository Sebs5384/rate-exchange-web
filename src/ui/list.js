import { getExistingCurrencies } from "../utils/general.js";

export function createTableCurrencyList(currency) {
  const $currencyList = document.querySelector("#table-currency-list");
  const list = Object.keys(currency);
  const existingCurrencies = getExistingCurrencies(list);

  $currencyList.innerText = "";
  list.forEach((currency, index) => {
    const $list = document.createElement("li");
    const $item = document.createElement("a");
    $item.className = "dropdown-item text-start";
    $item.href = "#";
    $item.innerText = `${currency} - ${existingCurrencies[index]}`;

    $list.appendChild($item);
    $currencyList.appendChild($list);
  });
}

export function createConverterCurrencyList(currency) {
  const $currencyLists = document.querySelectorAll(".converter-currency-list");
  const list = Object.keys(currency);
  const existingCurrencies = getExistingCurrencies(list);

  $currencyLists.forEach((currencyList) => {
    list.forEach((currency, index) => {
      const $list = document.createElement("li");
      const $item = document.createElement("a");

      $item.className = "dropdown-item text-start";
      $item.href = "#";
      $item.innerText = `${currency} - ${existingCurrencies[index]}`;

      $list.appendChild($item);
      currencyList.appendChild($list);
    });
  });
}
