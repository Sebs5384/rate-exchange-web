const BASE_URL = "https://api.exchangerate.host";

export function getExchangeRates(currency = "EUR", date = "latest") {
  const URL = `${BASE_URL}/${date}?base=${currency}`;

  return fetch(URL)
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
