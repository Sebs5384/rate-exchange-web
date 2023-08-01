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
    .then((exchange) => {
      createExchangeTable(exchange);
      createCurrencyList(exchange);
    })
    .catch((error) => {
      console.error("Error", error);
      throw error;
    });
}

function updateCurrency() {
  $currencyList.onclick = (event) => {
    const $clickedCurrency = event.target;
    const selectedCurrency = handleCurrencyList($clickedCurrency);
    displayExchangeUI(selectedCurrency);
  };
}

function initialize() {
  displayExchangeUI();
  updateCurrency();
}

initialize();
