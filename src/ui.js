const $currencyList = document.querySelector("#currency-list");
const $convertButton = document.querySelector("#convert-button");
const $currency = document.querySelector("#currency-input").value;
let $clickedCurrency;

$currencyList.onclick = (event) => {
  const $click = event.target;
  $clickedCurrency = handleClicks($click);

  event.preventDefault();
};

$convertButton.onclick = () => {
  convertCurrency($currency);
};

function handleClicks(click) {
  if (click) {
    const currencyName = obtainCurrencyCode(click);
    const selectedCurrency = (document.querySelector("#currency-input").value = currencyName);
    return selectedCurrency;
  }
}
