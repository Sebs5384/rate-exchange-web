const BASE_URL = "https://api.exchangerate.host";

function convertCurrency(currency = "EUR", date = "latest") {
  const base = `${BASE_URL}/${date}?base=${currency}`;

  fetch(base)
    .then((response) => {
      return response.json();
    })
    .then((currencies) => {
      createCurrencyTable(currencies);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function createCurrencyTable(currencies) {
  const $currencyTable = document.querySelector("#currency-rates");
  clearCurrenciesField("#currency-rates");

  rates.forEach((rate, index) => {
    const $tr = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currency = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currency.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `${rates[rate]}`;
    $tr.appendChild($currencyNumber);
    $tr.appendChild($currency);
    $tr.appendChild($currencyFullName);
    $tr.appendChild($rate);
    $currencyTable.appendChild($tr);
  });
}

function createCurrencyList() {
  fetch(`${BASE_URL}/latest`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const $currencyList = document.querySelector("#currency-list");
      /*console.log(data);
    console.log(data.date);
    console.log(data.rates);*/

      let currencies = Object.keys(data.rates);
      console.log(currencies);
      currencies.forEach((currency, index) => {
        const $li = document.createElement("li");
        const $a = document.createElement("a");
        $a.className = "dropdown-item";
        $a.href = "#";
        $a.innerText = `${currency} ${currenciesName[index]}`;

        $li.appendChild($a);
        $currencyList.appendChild($li);
      });
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

convertCurrency();
createCurrencyList();
