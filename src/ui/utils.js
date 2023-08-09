import { handleInputCurrency, handleInputDate, handleListChange } from "./handlers.js";
import { displayLoadingTable, clearExchangeTable } from "./table.js";
import { displayExchangeUI } from "./exchange.js";

export function setupListChanges(list, date) {
  list.onclick = (currency) => {
    const clickedCurrency = handleListChange(currency);
    const selectedDate = handleInputDate(date);

    clearExchangeTable();
    displayLoadingTable();
    displayExchangeUI(clickedCurrency, selectedDate);
  };
}

export function setupCurrencyChanges(currency) {
  currency.oninput = () => {
    const selectedCurrency = handleInputCurrency(currency);

    clearExchangeTable();
    displayLoadingTable();
    displayExchangeUI(selectedCurrency);
  };
}

export function setupDateChanges(date, currency) {
  date.oninput = () => {
    clearExchangeTable();
    displayLoadingTable();

    setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      displayExchangeUI(selectedCurrency, selectedDate);
    }, 1000);
  };
}

export function setCurrencyTitle(base, currency) {
  const baseCurrency = base;
  const currentInputValue = currency;
  const currentTitle = document.querySelector("#current-currency");
  const $code = document.querySelectorAll(".currency-code");

  for (const code of $code) {
    if (currentInputValue === code.innerText) {
      return (currentTitle.innerText = `Currently displaying ${currentInputValue}`);
    }
  }
  return (currentTitle.innerText = `Currently displaying ${baseCurrency}`);
}

export function setDateTitle(present, date) {
  const presentDate = present;
  const currentInputDate = date;
  const currentDateTitle = document.querySelector("#current-date");

  if (currentInputDate && currentInputDate !== "latest") {
    return (currentDateTitle.innerText = `At ${currentInputDate} as date of exchange`);
  }

  return (currentDateTitle.innerText = `At ${presentDate} as date of exchange`);
}

export function getCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}
