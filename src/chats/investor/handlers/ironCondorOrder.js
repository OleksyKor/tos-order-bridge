const { getOrderType, formatDate, getPrice, getN } = require('./utils');

function handleIronCondorOrder(type, matches) {
  console.log(type, matches);
  // Extract the relevant information from the order string matches and return an object containing the information.
  const orderType = getOrderType(matches[1]);
  const quantity = Number(matches[2]);
  const symbol = matches[4];
  const expirationDate = matches[6];
  const strikes = [+(matches[7] + getN(matches[8])), +(matches[9] + getN(matches[10])), +(matches[11] + getN(matches[12])), +(matches[13] + getN(matches[14]))];
  const optionTypes = [matches[15], matches[16]];
  const limitPrice = getPrice(matches[18], matches[19]);
  const orderCondition = matches[20];
  const orderType2 = getN(matches[21]);

  const [longExpDate, longExpMonth, longExpYear] = expirationDate.split(' ');

  const expirationDateRight = formatDate(longExpYear, longExpMonth, longExpDate);

  const orderStr1 = `SELL|${optionTypes[0]}|${expirationDateRight}|${strikes[0]}`;
  const orderStr2 = `BUY|${optionTypes[0]}|${expirationDateRight}|${strikes[1]}`;
  const orderStr3 = `SELL|${optionTypes[1]}|${expirationDateRight}|${strikes[2]}`;
  const orderStr4 = `BUY|${optionTypes[1]}|${expirationDateRight}|${strikes[3]}`;

  const strToSend = `${orderType}|${Number(quantity)}|${symbol}|${limitPrice}|${orderCondition}|${orderType2}&` + [orderStr1, orderStr2, orderStr3, orderStr4].join('&');

  console.log(strToSend);

  return strToSend;
}

module.exports = handleIronCondorOrder;
