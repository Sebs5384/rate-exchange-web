function validateCurrencyFields(currency) {
  if (/^$/.test(currency)) return "This currency field can't be empty";
  if (!/^[^0-9]+$/.test(currency)) return "This field doesn't accept numbers";
  if (!/^\S{3}$/.test(currency)) return "Invalid currency code";

  return "";
}

function validateAmountField(amount) {
  if (/^$/.test(amount)) return "The amount field can't be empty";
  if (!/^\S{1,20}$/.test(amount)) return "The amount given has to be less than 20 characters";
  if (!/^[^A-Z-a-z]+$/.test(amount)) return "This field doesn't accept letters";

  return "";
}
