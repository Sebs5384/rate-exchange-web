const URL = "https://api.exchangerate.host/latest";

document.querySelector("#currency-list").onclick = (event) => {
  const $click = event.target;
  handleClickList($click);
};

function handleClickList(click) {
  if (click) {
    const currency = click.innerText.substring(0, 3);
    const selectedCurrency = assignValue("#");
    console.log(currency);
  }
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
