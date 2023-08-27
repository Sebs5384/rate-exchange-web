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

export function getMonthlyDates(startDate, endDate) {
  let current = new Date(startDate);

  const monthlyDates = [];
  while (current <= endDate) {
    monthlyDates.push(current.toISOString().split("T")[0]);
    current.setMonth(current.getMonth() + 1);
  }

  return { startDate: startDate.toISOString().split("T")[0], endDate: endDate.toISOString().split("T")[0], monthlyDates };
}
