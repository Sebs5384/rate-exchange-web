export function handleInputCurrency(currency) {
  const selectedCurrency = currency.value;
  return selectedCurrency ? selectedCurrency.toUpperCase() : "EUR";
}

export function handleInputDate(date) {
  const selectedDate = date.value;
  return selectedDate ? selectedDate : "latest";
}

export function handleListChange(list, input) {
  const $clickedCurrency = list.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency, input);

  return selectedCurrency;
}

function handleCurrencyListClick(clickedCurrency, input) {
  const $currencyInput = document.querySelector(input);
  const currencyCode = clickedCurrency.innerText.substring(0, 3);
  const selectedCurrency = ($currencyInput.value = currencyCode);

  return selectedCurrency;
}

export function handleCurrencyInputError(currency) {
  const currencyKey = Object.keys(currency);
  const $validationMessage = document.querySelectorAll(".form-validation-message");
  const $currencyInput = document.querySelectorAll(".currency-input");
  let errorCount = 0;

  currencyKey.forEach((value) => {
    const currencyError = currency[value];

    for (value in currencyError) {
      if (currencyError[value] !== "") {
        errorCount++;
        $validationMessage[value].classList.add("invalid-feedback");
        $validationMessage[value].innerText = currencyError[value];
        $currencyInput[value].classList.add("is-invalid");
      } else {
        $validationMessage[value].classList.remove("invalid-feedback");
        $currencyInput[value].classList.remove("is-invalid");
        $validationMessage[value].innerText = "";
        $validationMessage[value].classList.add("valid-feedback");
        $currencyInput[value].classList.add("is-valid");
      }
    }
  });

  return errorCount;
}

export function handleAmountInputError(amount) {
  const amountKey = Object.keys(amount);
  const $validationAmountMessage = document.querySelector("#amount-validation-message");
  const $amountInput = document.querySelector("#converter-amount-input");
  let errorCount = 0;

  amountKey.forEach((value) => {
    if (amount[value] !== "") {
      errorCount++;
      $validationAmountMessage.classList.add("invalid-feedback");
      $validationAmountMessage.innerText = amount[value];
      $amountInput.classList.add("is-invalid");
    } else {
      $validationAmountMessage.classList.remove("invalid-feedback");
      $amountInput.classList.remove("is-invalid");
      $validationAmountMessage.innerText = "";
      $validationAmountMessage.classList.add("valid-feedback");
      $amountInput.classList.add("is-valid");
    }
  });

  return errorCount;
}
