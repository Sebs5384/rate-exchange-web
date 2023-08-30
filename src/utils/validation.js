import { handleCurrencyInputError, handleAmountInputError } from "../ui/handlers.js";
import { getCurrenciesCode } from "./general.js";

function validateCurrency(currencies, codes) {
  const currenciesErrors = [];

  currencies.forEach((currency) => {
    if (/^$/.test(currency)) {
      currenciesErrors.push("This currency field can't be empty");
    } else if (!/^[^0-9]+$/.test(currency)) {
      currenciesErrors.push("This field doesn't accept numbers");
    } else if (!/^\S{3}$/.test(currency)) {
      currenciesErrors.push("Invalid currency code");
    } else if (!codes.includes(currency)) {
      currenciesErrors.push("This currency code does not exist");
    } else {
      currenciesErrors.push("");
    }
  });

  return currenciesErrors;
}

function validateAmount(amount) {
  if (/^$/.test(amount)) return "The amount field can't be empty";
  if (!/^\S{1,20}$/.test(amount)) return "The amount given has to be less than 20 characters";
  if (!/^[^A-Z-a-z]+$/.test(amount)) return "This field doesn't accept letters";

  return "";
}

export function validateCurrencyInputs(currency) {
  const codes = getCurrenciesCode();
  const validatedCurrencyInputs = validateCurrency(currency, codes);

  const currencyInputs = {
    "currency-field": validatedCurrencyInputs,
  };

  const isSuccessful = handleCurrencyInputError(currencyInputs) === 0;
  return isSuccessful;
}

export function validateAmountInput(amount) {
  const validatedInput = validateAmount(amount);

  const amountInput = {
    "amount-field": validatedInput,
  };

  const isSuccessful = handleAmountInputError(amountInput) === 0;
  return isSuccessful;
}
