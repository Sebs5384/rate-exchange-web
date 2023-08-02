import { displayCurrencyUI, updateCurrencyUI, $currencyCode, $currencyDate, $currencyList } from "./ui/ui.js";

function initialize() {
  displayCurrencyUI();
  updateCurrencyUI($currencyCode, $currencyDate, $currencyList);
}

initialize();
