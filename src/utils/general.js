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

export function getDates() {
  const MONTHS_FIRST_DAY = [];

  const TODAY = new Date();
  const CURRENT_YEAR = TODAY.getFullYear();
  const FIRST_DAY_YEAR = new Date(CURRENT_YEAR, 0, 1);
  let CURRENT_MONTH_FIRST_DAY = new Date(FIRST_DAY_YEAR);

  while (CURRENT_MONTH_FIRST_DAY <= TODAY) {
    MONTHS_FIRST_DAY.push(CURRENT_MONTH_FIRST_DAY.toISOString().split("T")[0]);
    CURRENT_MONTH_FIRST_DAY.setMonth(CURRENT_MONTH_FIRST_DAY.getMonth() + 1);
  }

  return { FIRST_DAY_YEAR: FIRST_DAY_YEAR.toISOString().split("T")[0], TODAY: TODAY.toISOString().split("T")[0], MONTHS_FIRST_DAY };
}

export function getMonths(startMonthIndex) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months.slice(startMonthIndex);
}

export function convertToPercentage(number) {
  return `${(number * 100).toFixed(2)} %`;
}
