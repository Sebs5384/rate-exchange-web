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

function initialize() {
  displayExchangeUI();
  updateCurrencyUI($currencyCode, $currencyDate, $currencyList);
}

initialize();
