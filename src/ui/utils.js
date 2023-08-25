export function getCurrencyCode(currencies) {
  const currenciesCode = [];

  if (currencies instanceof NodeList) {
    currencies.forEach((currency) => {
      const currencyCode = currency.innerText.substring(0, 3);
      currenciesCode.push(currencyCode);
    });
  } else {
    const currencyCode = currencies.innerText.substring(0, 3);
    currenciesCode.push(currencyCode);
  }

  return currenciesCode;
}

export function setElementVisibility(selector, visibility) {
  if (visibility === "hidden") {
    document.querySelector(selector).classList.add("hidden");
  }
  if (visibility === "visible") {
    document.querySelector(selector).classList.remove("hidden");
  }
}
