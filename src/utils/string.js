export function convertPrice (price, currency, isSlice = false) {
  const number = isSlice ? price.toString().slice(0,7) : price.toString();
    return number
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .concat(currency);
};