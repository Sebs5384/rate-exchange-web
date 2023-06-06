const URL = "https://api.exchangerate.host/latest";

document.querySelector("#currency-list").onclick = (event) => {
  const $click = event.target;
  $clickedCurrency = handleClickList($click);

  event.preventDefault();
};

document.querySelector("#convert-button").onclick = (event) => {
  console.log($clickedCurrency);
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
  console.log(URL);

  fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.rates);
      const $currencyTable = document.querySelector("#currency-rates");

      const rates = Object.keys(data.rates);
      rates.forEach((rate, index) => {
        const $tr = document.createElement("tr");
        const $number = document.createElement("th");
        const $currency = document.createElement("th");
        const $currencyName = document.createElement("th");
        const $rate = document.createElement("th");

        $number.innerText = `${index + 1}`;
        $currency.innerText = `${rate}`;
        $currencyName.innerText = `${currenciesName[index]}`;
        $rate.innerText = `${data.rates[rate]}`;
        $tr.appendChild($number);
        $tr.appendChild($currency);
        $tr.appendChild($currencyName);
        $tr.appendChild($rate);
        $currencyTable.appendChild($tr);
      });
    })
    .catch((error) => {
      console.log("Error", error);
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
