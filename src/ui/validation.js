import { handleCurrencyInputErrors } from "./handlers.js";

function validateCurrencyField(currencies) {
  const currenciesErrors = {};

  currencies.forEach((currency, index) => {
    if (/^$/.test(currency)) {
      currenciesErrors[index] = "This currency field can't be empty";
    } else if (!/^[^0-9]+$/.test(currency)) {
      currenciesErrors[index] = "This field doesn't accept numbers";
    } else if (!/^\S{3}$/.test(currency)) {
      currenciesErrors[index] = "Invalid currency code";
    } else {
      currenciesErrors[index] = "";
    }
  });

  return currenciesErrors;
}

function validateAmountField(amount) {
  if (/^$/.test(amount)) return "The amount field can't be empty";
  if (!/^\S{1,20}$/.test(amount)) return "The amount given has to be less than 20 characters";
  if (!/^[^A-Z-a-z]+$/.test(amount)) return "This field doesn't accept letters";

  return "";
}

export function validateConverterFields(currency) {
  const validatedField = validateCurrencyField(currency);

  const currencyError = {
    "currency-field": validatedField,
  };

  const isSuccessful = handleCurrencyInputErrors(currencyError) === 0;
  return isSuccessful;
}
