function obtainCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

function clearCurrenciesField() {
  document.querySelector("#currency-rates").innerHTML = "";
}

function handleCurrencyListClick(click) {
  if (click) {
    const currencyName = obtainCurrencyCode(click);
    const selectedCurrency = (document.querySelector("#currency-input").value = currencyName);
    return selectedCurrency;
  }
}

function handleInputChange(currency, date) {
  const selectedCurrency = currency.value;
  const selectedDate = date.value;
  displayExchangeUI(selectedCurrency, selectedDate || null);
}

function handleInputDate($selectedCurrency, $selectedDate) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleInputChange($selectedCurrency, $selectedDate);
    }, 500);
  };
}

function handleListChange(event, $selectedDate) {
  const $clickedCurrency = event.target;
  const selectedCurrency = handleCurrencyListClick($clickedCurrency);
  displayExchangeUI(selectedCurrency, $selectedDate || null);
}
