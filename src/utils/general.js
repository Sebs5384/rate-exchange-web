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

export function getMonthlyDates() {
  const monthlyDates = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayYear = new Date(currentYear, 0, 1);
  let current = new Date(firstDayYear);

  while (current <= currentDate) {
    monthlyDates.push(current.toISOString().split("T")[0]);
    current.setMonth(current.getMonth() + 1);
  }

  return { startDate: firstDayYear.toISOString().split("T")[0], endDate: currentDate.toISOString().split("T")[0], monthlyDates };
}

export function getMonths(startMonthIndex) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months.slice(startMonthIndex);
}
