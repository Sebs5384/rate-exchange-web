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

export function getExchangeData(currency, date) {
  return getExchanges(currency, date).then((exchange) => {
    return {
      base: exchange.base,
      present: exchange.date,
      rates: exchange.rates,
    };
  });
}

export function getConvertionResults(from, to, amount) {
  return getConvertion(from, to, amount).then((convertion) => {
    return {
      from: convertion.query.from,
      to: convertion.query.to,
      query: convertion.query,
      date: convertion.date,
      result: convertion.result,
    };
  });
}
