import { currenciesName } from "../utils/currency-name.js";
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
