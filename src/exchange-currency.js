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
