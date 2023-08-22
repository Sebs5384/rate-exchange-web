import { getCurrencyCode } from "./utils.js";

export function handleInputCurrency(currency) {
  const selectedCurrency = currency.value;

  return selectedCurrency.toUpperCase();
}

export function handleListChange(list, input) {
  const $clickedCurrency = list.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency, input);

  return selectedCurrency;
}

export function handleInputDate(date) {
  const selectedDate = date.value;

  if (!selectedDate) return "latest";

  return selectedDate;
}

export function handleCurrencyInputErrors(errors) {
  const currencyKeys = Object.keys(errors);
  const $validationMessage = document.querySelectorAll(".form-validation-message");
  const $currencyInput = document.querySelectorAll(".currency-input");
  let errorCount = 0;

  currencyKeys.forEach((key) => {
    const keyValues = errors[key];

    for (key in keyValues) {
      if (keyValues[key] !== "") {
        errorCount++;
        $validationMessage[key].classList.add("invalid-feedback");
        $validationMessage[key].innerText = keyValues[key];
        $currencyInput[key].classList.add("is-invalid");
      } else {
        $validationMessage[key].classList.remove("invalid-feedback");
        $currencyInput[key].classList.remove("is-invalid");
        $validationMessage[key].innerText = "";
        $validationMessage[key].classList.add("valid-feedback");
        $currencyInput[key].classList.add("is-valid");
      }
    }
  });

  return errorCount;
}

function handleCurrencyListClick(clickedCurrency, input) {
  const $currencyInput = document.querySelector(input);
  const currencyCode = getCurrencyCode(clickedCurrency);
  const selectedCurrency = ($currencyInput.value = currencyCode);

  return selectedCurrency;
}
