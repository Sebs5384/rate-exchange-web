const BASE_URL = "https://api.exchangerate.host";

function getExchangeRates(currency = "EUR", date = "latest") {
  const base = `${BASE_URL}/${date}?base=${currency}`;

  return fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((exchange) => {
      return exchange.rates;
    })
    .catch((error) => {
      console.error("Error while getting exchange rates", error);
      throw error;
    });
}

function displayExchangeUI(currencyCode = null, date = null) {
  return getExchangeRates(currencyCode, date)
    .then((rates) => {
      clearCurrenciesField();
      createExchangeTable(rates);
      createCurrencyList(rates);
    })
    .catch((error) => {
      console.error("Error while attempting to display exchange rates", error);
      throw error;
    });
}

function updateCurrency() {
  const $selectedDate = document.querySelector("#currency-date").value;
  const $currencyList = document.querySelector("#currency-list");
  $currencyList.onclick = (event) => {
    const $clickedCurrency = event.target;
    const selectedCurrency = handleCurrencyListClick($clickedCurrency);
    displayExchangeUI(selectedCurrency, selectedDate || null);
  };

  const handleInputChange = () => {
    const selectedCurrency = document.querySelector("#currency-input").value;
    const selectedDate = document.querySelector("#currency-date").value;
    displayExchangeUI(selectedCurrency, selectedDate || null);
  };

  document.querySelector("#currency-input").addEventListener("input", handleInputChange);
  document.querySelector("#currency-date").addEventListener("input", handleInputChange);
}

function initialize() {
  displayExchangeUI();
  updateCurrency();
}

initialize();
