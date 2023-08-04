const BASE_URL = "https://api.exchangerate.host";

export function getExchangeRates(currency = "EUR", date = "latest") {
  const URL = `${BASE_URL}/${date}?base=${currency}&places=2`;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((exchange) => {
      return exchange.rates;
    });
}
