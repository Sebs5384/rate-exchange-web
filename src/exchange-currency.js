const URL = "https://api.exchangerate.host/latest";

document.querySelector("#currency-list").onclick = (event) => {
  const $click = event.target;
  $clickedCurrency = handleClickList($click);

  event.preventDefault();
};

document.querySelector("#convert-button").onclick = (event) => {
  convertCurrency($clickedCurrency);
  event.preventDefault();
};

function handleClickList(click) {
  if (click) {
    const currency = click.innerText.substring(0, 3);
    const selectedCurrency = assignValue("#selected-currency", "value", `${currency}`);
    return selectedCurrency;
  }
}

function convertCurrency(currency) {
  let URL = `https://api.exchangerate.host/latest?base=${currency}`;

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const rates = Object.keys(data.rates);
      setElementVisibility("#currency-table-card", "card gy-4");
      createCurrencyElements(rates, data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function createCurrencyElements(rates, data) {
  const $currencyTable = document.querySelector("#currency-rates");
  rates.forEach((rate, index) => {
    const $tr = document.createElement("tr");
    const $currencyNumber = document.createElement("th");
    const $currency = document.createElement("th");
    const $currencyFullName = document.createElement("th");
    const $rate = document.createElement("th");

    $currencyNumber.innerText = `${index + 1}`;
    $currency.innerText = `${rate}`;
    $currencyFullName.innerText = `${currenciesName[index]}`;
    $rate.innerText = `${data.rates[rate]}`;
    $tr.appendChild($currencyNumber);
    $tr.appendChild($currency);
    $tr.appendChild($currencyFullName);
    $tr.appendChild($rate);
    $currencyTable.appendChild($tr);
  });
}

function assignValue(selector, property, value) {
  const $element = (document.querySelector(selector)[property] = value);

  return $element;
}

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const $currencyList = document.querySelector("#currency-list");
    console.log(data);
    console.log(data.date);
    console.log(data.rates);

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
