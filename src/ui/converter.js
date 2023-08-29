import { getConversionResults, getExchangeData, getFluctuationData } from "../api/exchange.js";
import { validateCurrencyInputs, validateAmountInput } from "./validation.js";
import { displayFluctuationTables, displayTotalFluctuationTable, clearTable } from "./table.js";
import { handleListChange } from "./handlers.js";
import { createConverterCurrencyList } from "./list.js";
import { getMonthlyDates, getMonths } from "../utils/general.js";

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
      enableFluctuationButton();
      return displayConversionResults(from, to, amount);
    }
  };
}

export function setupConversionResetButton() {
  const $resetButton = document.querySelector("#convert-reset");

  $resetButton.onclick = () => {
    cleanConverterInputs();
  };
}

export function setUpFluctuationButton($from, $to) {
  const $fluctuationButton = document.querySelector("#fluctuation-button");

  $fluctuationButton.onclick = () => {
    const from = $from.value;
    const to = $to.value;
    const { startDate, endDate, monthlyDates } = getMonthlyDates();

    clearTable(["#fluctuation-from-table-body", "#fluctuation-to-table-body", "#total-from-fluctuation", "#total-to-fluctuation"]);
    displayMonthlyFluctuations(monthlyDates, endDate, from, to);
    displayTotalFluctuation(startDate, endDate, from, to);
  };
}

function displayMonthlyFluctuations(monthlyDates, endDate, from, to) {
  monthlyDates.forEach((firstDay, index) => {
    const currentMonthFirstDay = firstDay;
    let nextMonthFirstDay = monthlyDates[index + 1];

    if (nextMonthFirstDay === undefined) nextMonthFirstDay = endDate;

    getFluctuationData(currentMonthFirstDay, nextMonthFirstDay, from, to).then((fluctuation) => {
      const { rates } = fluctuation;
      const months = getMonths();

      displayFluctuationTables(rates, from, to, months[index]);
    });
  });
}

function displayTotalFluctuation(startDate, endDate, from, to) {
  getFluctuationData(startDate, endDate, from, to).then((fluctuation) => {
    const { rates } = fluctuation;

    displayTotalFluctuationTable(rates, from, to);
  });
}

function updateConversionResults(from, to, query, date, result) {
  document.querySelector("#from-exchange").innerText = query.amount;
  document.querySelector("#from-currency").innerText = ` ${from}`;
  document.querySelector("#to-exchange").innerText = ` = ${result}`;
  document.querySelector("#to-currency").innerText = ` ${to}`;
  document.querySelector("#result-date").innerText = `${date} as date of Exchange`;
  resizeConversionResults();
}

function enableConversionText() {
  const $disabledText = document.querySelectorAll(".disabled-text");

  $disabledText.forEach((element) => {
    element.classList.remove("text-secondary");
    element.classList.add("text-primary");
  });
}

function enableFluctuationButton() {
  const $disabledFluctuationButton = document.querySelector("#fluctuation-button");

  $disabledFluctuationButton.classList.remove("disabled", "btn-secondary");
  $disabledFluctuationButton.classList.add("btn-primary");
}

function cleanConverterInputs() {
  const inputs = ["#converter-from-input", "#converter-to-input", "#converter-amount-input"];
  const $validationMessages = document.querySelectorAll(".form-validation-message");

  inputs.forEach((input) => {
    const $input = document.querySelector(input);
    $input.classList.remove("is-valid", "is-invalid");
    $input.value = "";
  });

  $validationMessages.forEach((message) => {
    message.classList.remove("valid-feedback", "invalid-feedback");
    message.innerText = "";
  });
}

function resizeConversionResults() {
  const $conversionResult = document.querySelector("#conversion-result");

  if ($conversionResult.innerText.length >= 34) {
    $conversionResult.style = "font-size: 0.5rem";
  } else if ($conversionResult.innerText.length >= 22) {
    $conversionResult.style = "font-size: 0.7rem";
  } else if ($conversionResult.innerText.length < 22) {
    $conversionResult.style = "font-size: 1rem";
  }
}

export function setupFromListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#converter-from-input");
  };
}

export function setupToListChanges(list) {
  list.onclick = (currency) => {
    handleListChange(currency, "#converter-to-input");
  };
}

export function setupConverterCurrencyList() {
  getExchangeData().then((exchange) => {
    const { rates } = exchange;
    createConverterCurrencyList(rates);
  });
}
