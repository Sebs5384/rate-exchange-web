function obtainCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

function clearCurrenciesField(selector) {
  document.querySelector(selector).innerHTML = "";
}

function handleCurrencyList(click) {
  if (click) {
    const currencyName = obtainCurrencyCode(click);
    const selectedCurrency = (document.querySelector("#currency-input").value = currencyName);
    return selectedCurrency;
  }
}
