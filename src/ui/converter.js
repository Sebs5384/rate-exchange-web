import { getConversionResults, getExchangeRates } from "../api/exchange.js";
import { validateCurrencyInputs, validateAmountInput } from "../utils/validation.js";
import { handleListChange } from "./handlers.js";
import { createConverterCurrencyList } from "./list.js";

export function displayConversionResults($from, $to, $amount) {
  getConversionResults($from, $to, $amount).then((conversion) => {
    const { from, to, query, date, result } = conversion;
    updateConversionResults(from, to, query, date, result);
  });
}

export function setupConversionButton($from, $to, $amount) {
  const $convertButton = document.querySelector("#convert-button");

  $convertButton.onclick = () => {
    const from = $from.value;
    const to = $to.value;
    const amount = $amount.value;
    const currencies = [from, to];

    const successfulCurrencyValidation = validateCurrencyInputs(currencies);
    const successfulAmountValidation = validateAmountInput(amount);

    if (successfulCurrencyValidation && successfulAmountValidation) {
      updateConversionText("enabled");
      updateFluctuationButton("enabled");
      displayConversionResults(from, to, amount);
    }
  };
}

export function setupConversionResetButton($from, $to, $amount) {
  const $resetButton = document.querySelector("#convert-reset");

  $resetButton.onclick = () => {
    updateConversionText("disabled");
    updateFluctuationButton("disabled");
    cleanConverterInputs($from, $to, $amount);
  };
}

function updateConversionResults(from, to, query, date, result) {
  setConversionResults(from, to, query, date, result);
  resizeConversionResults();
}

function updateConversionText(status) {
  const $disabledText = document.querySelectorAll(".disabled-text");

  if (status === "disabled") {
    $disabledText.forEach((element) => {
      element.classList.remove("text-primary");
      element.classList.add("text-secondary");
    });
  }

  if (status === "enabled") {
    $disabledText.forEach((element) => {
      element.classList.remove("text-secondary");
      element.classList.add("text-primary");
    });
  }
}

function updateFluctuationButton(status) {
  const $disabledFluctuationButton = document.querySelector("#fluctuation-button");

  if (status === "disabled") {
    $disabledFluctuationButton.classList.remove("btn-primary");
    $disabledFluctuationButton.classList.add("disabled", "btn-secondary");
  }

  if (status === "enabled") {
    $disabledFluctuationButton.classList.remove("disabled", "btn-secondary");
    $disabledFluctuationButton.classList.add("btn-primary");
  }
}

function cleanConverterInputs($from, $to, $amount) {
  const inputs = [$from, $to, $amount];
  const $validationMessages = document.querySelectorAll(".form-validation-message");

  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
    input.value = "";
  });

  $validationMessages.forEach((message) => {
    message.classList.remove("valid-feedback", "invalid-feedback");
    message.innerText = "";
  });
}

function setConversionResults(from, to, query, date, result) {
  document.querySelector("#from-exchange").innerText = query.amount;
  document.querySelector("#from-currency").innerText = ` ${from}`;
  document.querySelector("#to-exchange").innerText = ` = ${result}`;
  document.querySelector("#to-currency").innerText = ` ${to}`;
  document.querySelector("#result-date").innerText = `Results based on ${date} as date of Exchange`;
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
  getExchangeRates().then((exchange) => {
    const { rates } = exchange;
    createConverterCurrencyList(rates);
  });
}
