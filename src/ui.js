const $currencyList = document.querySelector("#currency-list");
const $convertButton = document.querySelector("#convert-button");

$currencyList.onclick = (event) => {
  const $click = event.target;
  $clickedCurrency = handleClicks($click);

  event.preventDefault();
};

$convertButton.onclick = (event) => {
  convertCurrency($clickedCurrency);
  event.preventDefault();
};

function handleClicks(click) {
  if (click) {
    const currencyName = obtainCurrencyCode();
    const selectedCurrency = (document.querySelector("#selected-currency").value = currencyName);
    return selectedCurrency;
  }
}
