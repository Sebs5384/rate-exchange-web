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
