export function getCurrencyCode(currency) {
  const currencyCode = currency.innerText.substring(0, 3);
  return currencyCode;
}

export function setElementVisibility(selector, visibility) {
  if (visibility === "hidden") {
    document.querySelector(selector).classList.add("hidden");
  }
  if (visibility === "visible") {
    document.querySelector(selector).classList.remove("hidden");
  }
}
