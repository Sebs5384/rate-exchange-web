import { getExchangeRates, getExchangeBase, getExchangeDate } from "../api/exchange.js";
import { clearExchangeTable, createExchangeTable, createCurrencyList, setCurrencyTitle, setDateTitle } from "./utils.js";
import { handleListChange, handleInputCurrency, handleInputDate } from "./handlers.js";

export function displayExchangeUI(currency, date) {
  getExchangeRates(currency, date).then((rates) => {
    clearExchangeTable();
    createExchangeTable(rates);
    createCurrencyList(rates);
  });

  getExchangeBase().then((base) => {
    setCurrencyTitle(base, currency);
  });

  getExchangeDate().then((present) => {
    setDateTitle(present, date);
  });
}

export function updateExchangeUI() {
  const $list = document.querySelector("#currency-list");
  const $currency = document.querySelector("#currency-input");
  const $date = document.querySelector("#currency-date");

  setupListChanges($list, $date);
  setupCurrencyChanges($currency);
  setupDateChanges($date, $currency);
}

function setupListChanges(list, date) {
  list.onclick = (currency) => {
    const clickedCurrency = handleListChange(currency);
    const selectedDate = handleInputDate(date);
    displayExchangeUI(clickedCurrency, selectedDate);
  };
}

function setupCurrencyChanges(currency) {
  currency.oninput = () => {
    const selectedCurrency = handleInputCurrency(currency);
    displayExchangeUI(selectedCurrency);
  };
}

function setupDateChanges(date, currency) {
  date.oninput = () => {
    setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      displayExchangeUI(selectedCurrency, selectedDate);
    }, 1000);
  };
}
