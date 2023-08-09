import { currenciesName } from "./currency-name.js";

export function getExistingCurrencies(currency) {
  const existingCurrencies = [];

  for (const i in currency) {
    for (const j in currenciesName) {
      if (currency[i] === currenciesName[j][0]) {
        existingCurrencies.push(currenciesName[j][1]);
        break;
      }
    }
  }
  return existingCurrencies;
}
