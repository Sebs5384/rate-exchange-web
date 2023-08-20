import { getConvertionResults, getExchangeData } from "../api/exchange.js";
import { handleListChange } from "./handlers.js";
import { createConverterCurrencyList } from "./list.js";

export function displayConvertionResults($from, $to, $amount) {
  handleConvertButton();
  getConvertionResults($from, $to, $amount).then((convertion) => {
    const { from, to, query, date, result } = convertion;
    console.log(convertion);
    updateResults(from, to, query, date, result);
  });
}

function updateResults(from, to, query, date, result) {
  document.querySelector("#from-exchange").innerText = query.amount;
  document.querySelector("#from-currency").innerText = ` ${from}`;
  document.querySelector("#to-exchange").innerText = ` = ${result}`;
  document.querySelector("#to-currency").innerText = ` ${to}`;
  document.querySelector("#result-date").innerText = `${date} as date of Exchange`;
}

function enableConvertionResults() {
  const $disabledResults = document.querySelectorAll(".disabled-text");
  const $disabledButton = document.querySelector("#convert-time-button");

  $disabledButton.classList.remove("disabled", "btn-secondary");
  $disabledButton.classList.add("btn-primary");

  $disabledResults.forEach((element) => {
    element.classList.remove("text-secondary");
    element.classList.add("text-primary");
  });
}

function handleConvertButton() {
  const $convertButton = document.querySelector("#convert-button");

  $convertButton.onclick = () => {
    const from = document.querySelector("#convert-from-input").value;
    const to = document.querySelector("#convert-to-input").value;
    const amount = document.querySelector("#convert-amount-input").value;
    enableConvertionResults();
    return displayConvertionResults(from, to, amount);
  };
}

export function setFromListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#convert-from-input");
  };
}

export function setToListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#convert-to-input");
  };
}

export function setConverterCurrencyList() {
  getExchangeData().then((exchange) => {
    const { rates } = exchange;
    createConverterCurrencyList(rates);
  });
}

setConverterCurrencyList();
