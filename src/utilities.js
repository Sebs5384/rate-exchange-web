let $clickedCurrency;

function obtainCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

function clearCurrenciesField(selector) {
  document.querySelector(selector).innerHTML = "";
}

function setElementVisibility(selector, value) {
  document.querySelector(selector).className = value;
}
