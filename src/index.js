import { updateExchangeTable, updateExchangeConverter, updateCurrencyFluctuation } from "./ui/exchange.js";

function initialize() {
  updateExchangeTable();
  updateExchangeConverter();
  updateCurrencyFluctuation();
}

initialize();
