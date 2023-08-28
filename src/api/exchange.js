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

function getConversion(from = "USD", to = "ARS", amount = "1") {
  const URL = `${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}&places=3`;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((conversion) => {
      return conversion;
    });
}

function getCurrencyFluctuation(start, end, from, to) {
  const URL = `${BASE_URL}/fluctuation?start_date=${start}&end_date=${end}&symbols=${from},${to}&places=3`;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((fluctation) => {
      return fluctation;
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

export function getConversionResults(from, to, amount) {
  return getConversion(from, to, amount).then((conversion) => {
    return {
      from: conversion.query.from,
      to: conversion.query.to,
      query: conversion.query,
      date: conversion.date,
      result: conversion.result,
    };
  });
}

export function getFluctuationData(start, end, from, to) {
  return getCurrencyFluctuation(start, end, from, to).then((fluctation) => {
    return {
      rates: fluctation.rates,
      start: fluctation.start_date,
      end: fluctation.end_date,
    };
  });
}
