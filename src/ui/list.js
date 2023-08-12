import { getExistingCurrencies } from "../utils/general.js";

export function createCurrencyList(currency) {
  const $currencyList = document.querySelector("#currency-list");
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
