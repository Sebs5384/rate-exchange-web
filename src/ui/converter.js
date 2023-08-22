import { getConversionResults, getExchangeData } from "../api/exchange.js";
import { validateCurrencyInputs, validateAmountInput } from "./validation.js";
import { handleListChange } from "./handlers.js";
import { createConverterCurrencyList } from "./list.js";

export function displayConversionResults($from, $to, $amount) {
  getConversionResults($from, $to, $amount).then((conversion) => {
    const { from, to, query, date, result } = conversion;

    updateConversionResults(from, to, query, date, result);
  });
}

export function setupConversionButton() {
  const $convertButton = document.querySelector("#convert-button");

  $convertButton.onclick = () => {
    const from = document.querySelector("#converter-from-input").value;
    const to = document.querySelector("#converter-to-input").value;
    const amount = document.querySelector("#converter-amount-input").value;

    const successfulCurrencyValidation = validateCurrencyInputs([from, to]);
    const successfulAmountValidation = validateAmountInput(amount);

    if (successfulCurrencyValidation && successfulAmountValidation) {
      enableConversionText();
      enableConversionCheckTimeButton();
      return displayConversionResults(from, to, amount);
    }
  };
}

function updateConversionResults(from, to, query, date, result) {
  document.querySelector("#from-exchange").innerText = query.amount;
  document.querySelector("#from-currency").innerText = ` ${from}`;
  document.querySelector("#to-exchange").innerText = ` = ${result}`;
  document.querySelector("#to-currency").innerText = ` ${to}`;
  document.querySelector("#result-date").innerText = `${date} as date of Exchange`;
}

function enableConversionText() {
  const $disabledText = document.querySelectorAll(".disabled-text");

  $disabledText.forEach((element) => {
    element.classList.remove("text-secondary");
    element.classList.add("text-primary");
  });
}

function enableConversionCheckTimeButton() {
  const $disabledCheckTimeButton = document.querySelector("#time-check-button");

  $disabledCheckTimeButton.classList.remove("disabled", "btn-secondary");
  $disabledCheckTimeButton.classList.add("btn-primary");
}

export function setupFromListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#convert-from-input");
  };
}

export function setupToListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#convert-to-input");
  };
}

export function setupConverterCurrencyList() {
  getExchangeData().then((exchange) => {
    const { rates } = exchange;
    createConverterCurrencyList(rates);
  });
}
