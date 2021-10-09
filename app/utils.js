const axios = require("axios");
const validateNumber = (input) => {
  const regex = /^\d*(.\d{2})?$/;
  return regex.test(input);
};

const validateCharacter = (input) => {
  const regex = /^[a-zA-Z]*$/;
  console.log("validate character");
  return regex.test(input);
};

const currencyConverter = async (amount, currency) => {
  const currencyFormat = "USD" + currency;
  const currencyURI =
    process.env.CURRENCY_CONVERTER + "&currencies=" + currency;
  const { data: response } = await axios.get(currencyURI);
  const currencyQuotes = response.quotes;
  const currencyValue = currencyQuotes[currencyFormat]
    ? currencyQuotes[currencyFormat]
    : currencyQuotes.currencyFormat;
  const convertCurrency = amount * currencyValue;
  return convertCurrency;
};

module.exports = {
  validateNumber,
  validateCharacter,
  currencyConverter,
};
