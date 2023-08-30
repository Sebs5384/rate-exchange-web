import { currenciesName } from "./currency-name.js";

export function getCurrenciesFullName(currencies) {
  const currenciesFullName = [];

  for (const code in currencies) {
    for (const fullName in currenciesName) {
      if (currencies[code] === currenciesName[fullName][0]) {
        currenciesFullName.push(currenciesName[fullName][1]);
        break;
      }
    }
  }
  return currenciesFullName;
}

export function getCurrenciesCode(currencies) {
  const currenciesCode = [];

  if (currencies === undefined) {
    for (const code in currenciesName) {
      currenciesCode.push(currenciesName[code][0]);
    }
  }

  for (const code in currencies) {
    for (const code in currenciesName) {
      if (currencies[code] === currenciesName[code][0]) {
        currenciesCode.push(currenciesName[code][0]);
        break;
      }
    }
  }
  return currenciesCode;
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

export function convertToPercentage(number) {
  return `${(number * 100).toFixed(2)} %`;
}
