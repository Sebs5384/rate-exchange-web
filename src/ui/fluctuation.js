import { getFluctuationData } from "../api/exchange.js";
import { createTableRow, clearTable } from "./table.js";
import { getMonthlyDates, getMonths } from "../utils/general.js";

export function setUpFluctuationButton($from, $to) {
  const $fluctuationButton = document.querySelector("#fluctuation-button");

  $fluctuationButton.onclick = () => {
    const from = $from.value;
    const to = $to.value;
    const { startDate, endDate, monthlyDates } = getMonthlyDates();

    displayMonthlyFluctuations(monthlyDates, endDate, from, to);
    displayTotalFluctuation(startDate, endDate, from, to);
  };
}

function displayMonthlyFluctuations(monthlyDates, endDate, from, to) {
  clearTable(["#fluctuation-from-table-body", "#fluctuation-to-table-body"]);
  monthlyDates.forEach((firstDay, index) => {
    const currentMonthFirstDay = firstDay;
    let nextMonthFirstDay = monthlyDates[index + 1];

    if (nextMonthFirstDay === undefined) nextMonthFirstDay = endDate;

    getFluctuationData(currentMonthFirstDay, nextMonthFirstDay, from, to).then((fluctuation) => {
      const { rates } = fluctuation;
      const months = getMonths();

      displayFluctuationTables(rates, from, to, months[index]);
    });
  });
}

function displayTotalFluctuation(startDate, endDate, from, to) {
  clearTable(["#total-from-fluctuation", "#total-to-fluctuation"]);
  getFluctuationData(startDate, endDate, from, to).then((fluctuation) => {
    const { rates } = fluctuation;

    displayTotalFluctuationTable(rates, from, to);
  });
}

function displayFluctuationTables(rates, from, to, month) {
  const fromFluctuation = Object.values(rates[from]);
  const toFluctuation = Object.values(rates[to]);

  const $fluctuationFromTable = document.querySelector("#fluctuation-from-table-body");
  const $fluctuationToTable = document.querySelector("#fluctuation-to-table-body");

  createTableRow($fluctuationFromTable, [month, ...fromFluctuation]);
  createTableRow($fluctuationToTable, [month, ...toFluctuation]);
}

function displayTotalFluctuationTable(rates, from, to) {
  const fromTotalFluctuation = Object.values(rates[from]);
  const toTotalFluctuation = Object.values(rates[to]);

  const $totalFluctuationFromTable = document.querySelector("#total-from-fluctuation");
  const $totalFluctuationToTable = document.querySelector("#total-to-fluctuation");

  createTableRow($totalFluctuationFromTable, [from, ...fromTotalFluctuation]);
  createTableRow($totalFluctuationToTable, [to, ...toTotalFluctuation]);
}
