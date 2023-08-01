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
      console.error("Error", error);
    });
}

function fetchExchangeRates(currencyCode = null, date = null) {
  const exchanges = getExchangeRates(currencyCode, date);
  exchanges.then((exchange) => {
    createExchangeTable(exchange);
    createCurrencyList(exchange);
  });
}

function handleCurrency() {
  $currencyList.onclick = (event) => {
    const $clickedCurrency = event.target;
    const selectedCurrency = handleCurrencyList($clickedCurrency);
    fetchExchangeRates(selectedCurrency);
  };
}

function initialize() {
  fetchExchangeRates();
  handleCurrency();
}

initialize();
