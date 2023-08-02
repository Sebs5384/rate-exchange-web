const $currencyCode = document.querySelector("#currency-input");
const $currencyDate = document.querySelector("#currency-date");
const $currencyList = document.querySelector("#currency-list");

function createExchangeTable(rates) {
  const $currencyTable = document.querySelector("#currency-rates");
  const $rates = Object.keys(rates);
  $rates.forEach((rate, index) => {
    const $tr = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currency = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currency.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `$${rates[rate].toFixed(3)}`;
    $tr.appendChild($currencyNumber);
    $tr.appendChild($currency);
    $tr.appendChild($currencyFullName);
    $tr.appendChild($rate);
    $currencyTable.appendChild($tr);
  });
}

function createCurrencyList(rates) {
  const $currencyList = document.querySelector("#currency-list");
  const currencies = Object.keys(rates);

  currencies.forEach((currency, index) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");
    $a.className = "dropdown-item";
    $a.href = "#";
    $a.innerText = `${currency} ${currenciesName[index]}`;

    $li.appendChild($a);
    $currencyList.appendChild($li);
  });
}

function displayExchangeUI(currencyCode = null, date = null) {
  return getExchangeRates(currencyCode, date)
    .then((rates) => {
      clearCurrenciesField();
      createExchangeTable(rates);
      createCurrencyList(rates);
    })
    .catch((error) => {
      console.error("Error while attempting to display exchange rates", error);
      throw error;
    });
}

function updateCurrencyUI(currency, date, list) {
  list.onclick = (event) => handleListChange(event, date);
  currency.oninput = () => handleInputChange(currency, date);
  date.oninput = handleInputDate(currency, date);
}
