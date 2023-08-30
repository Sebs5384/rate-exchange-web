import { getFluctuationData } from "../api/exchange.js";
import { getMonthlyDates, getMonths, getCurrenciesFullName } from "../utils/general.js";

export function setUpFluctuationButton($from, $to) {
  const $fluctuationButton = document.querySelector("#fluctuation-button");

  $fluctuationButton.onclick = () => {
    const from = $from.value;
    const to = $to.value;
    const { startDate, endDate, monthlyDates } = getMonthlyDates();

    displayFluctuationYear();
    displayFluctuationCurrencyText(from, to);
    displayMonthlyFluctuations(monthlyDates, endDate, from, to);
    displayTotalFluctuation(startDate, endDate, from, to);
  };
}

function displayMonthlyFluctuations(monthlyDates, endDate, from, to) {
  clearFluctuationTables(["#fluctuation-from-table-body", "#fluctuation-to-table-body"]);

  monthlyDates.forEach((FIRST_DAY, index) => {
    const CURRENT_MONTH_FIRST_DAY = FIRST_DAY;
    let NEXT_MONTH_FIRST_DAY = monthlyDates[index + 1];

    if (NEXT_MONTH_FIRST_DAY === undefined) NEXT_MONTH_FIRST_DAY = endDate;

    getFluctuationData(CURRENT_MONTH_FIRST_DAY, NEXT_MONTH_FIRST_DAY, from, to).then((fluctuation) => {
      const { rates } = fluctuation;
      const MONTHS = getMonths();

      createFluctuationTables(rates, from, to, MONTHS[index]);
    });
  });
}

function displayTotalFluctuation(startDate, endDate, from, to) {
  clearFluctuationTables(["#total-from-fluctuation", "#total-to-fluctuation"]);
  getFluctuationData(startDate, endDate, from, to).then((fluctuation) => {
    const { rates } = fluctuation;

    createTotalFluctuationTable(rates, from, to);
  });
}

function createFluctuationTables(rates, from, to, month) {
  const fromFluctuation = Object.values(rates[from]);
  const toFluctuation = Object.values(rates[to]);

  const $fluctuationFromTable = document.querySelector("#fluctuation-from-table-body");
  const $fluctuationToTable = document.querySelector("#fluctuation-to-table-body");

  createFluctuationRow($fluctuationFromTable, [month, ...fromFluctuation]);
  createFluctuationRow($fluctuationToTable, [month, ...toFluctuation]);
}

function createTotalFluctuationTable(rates, from, to) {
  const fromTotalFluctuation = Object.values(rates[from]);
  const toTotalFluctuation = Object.values(rates[to]);

  const $totalFluctuationFromTable = document.querySelector("#total-from-fluctuation");
  const $totalFluctuationToTable = document.querySelector("#total-to-fluctuation");

  createFluctuationRow($totalFluctuationFromTable, [from, ...fromTotalFluctuation]);
  createFluctuationRow($totalFluctuationToTable, [to, ...toTotalFluctuation]);
}

function displayFluctuationCurrencyText(from, to) {
  const currencies = [from, to];
  const currencyFullName = getCurrenciesFullName(currencies);
  const $currenciesText = document.querySelectorAll(".fluctuation-currency-text");

  $currenciesText.forEach((currencyText, index) => {
    currencyText.innerText = `${currencies[index]} - (${currencyFullName[index]})`;
  });
}

function displayFluctuationYear() {
  const currentYear = new Date().getFullYear();
  const $fluctuationDate = document.querySelector("#fluctuation-year");
  $fluctuationDate.innerText = currentYear;
}

function createFluctuationRow(tableBody, values) {
  const $row = document.createElement("tr");
  values.forEach((value, index) => {
    const $cell = document.createElement("td");
    $row.className = "border-primary";
    if (index === values.length - 1) {
      $cell.innerText = convertToPercentage(value);
    } else {
      $cell.innerText = value;
    }
    $row.appendChild($cell);
  });
  tableBody.appendChild($row);
}

function clearFluctuationTables(tables) {
  tables.forEach((table) => {
    table.innerHTML = "";
  });
}
