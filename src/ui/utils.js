import { handleInputCurrency, handleInputDate, handleListChange } from "./handlers.js";
import { displayLoadingTable, clearExchangeTable, displayExchangeTable } from "./table.js";

export function setupListChanges(list, date) {
  list.onclick = (currency) => {
    const clickedCurrency = handleListChange(currency);
    const selectedDate = handleInputDate(date);

    clearExchangeTable();
    displayLoadingTable();
    displayExchangeTable(clickedCurrency, selectedDate);
  };
}

export function setupCurrencyChanges(currency, date) {
  currency.oninput = () => {
    const selectedCurrency = handleInputCurrency(currency);
    const selectedDate = handleInputDate(date);

    clearExchangeTable();
    displayLoadingTable();
    displayExchangeTable(selectedCurrency, selectedDate);
  };
}

export function setupDateChanges(date, currency) {
  date.oninput = () => {
    clearExchangeTable();
    displayLoadingTable();

    setTimeout(() => {
      const selectedCurrency = handleInputCurrency(currency);
      const selectedDate = handleInputDate(date);
      displayExchangeTable(selectedCurrency, selectedDate);
    }, 1000);
  };
}

export function getCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

export function setElementVisibility(selector, visibility) {
  if (visibility === "hidden") {
    document.querySelector(selector).classList.add("hidden");
  }
  if (visibility === "visible") {
    document.querySelector(selector).classList.remove("hidden");
  }
}
