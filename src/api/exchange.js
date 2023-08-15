const BASE_URL = "https://api.exchangerate.host";

function getExchanges(currency = "EUR", date = "latest") {
  const URL = `${BASE_URL}/${date}?base=${currency}&places=2`;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((exchange) => {
      return exchange;
    });
}

export function getConvertion(from = "USD", to = "ARS", amount = "1") {
  const URL = `${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}&places=3`;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((convertion) => {
      return convertion;
    });
}

export function getExchangeRates(currency, date) {
  return getExchanges(currency, date).then((exchange) => {
    return exchange.rates;
  });
}

export function getExchangeBase() {
  return getExchanges().then((exchange) => {
    return exchange.base;
  });
}

export function getExchangeDate() {
  return getExchanges().then((exchange) => {
    return exchange.date;
  });
}
