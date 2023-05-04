const { getOrderType, formatDate, getPrice, getN } = require('./utils');

function handleCalendarOrder(type, matches) {
  console.log(type);

  if (type === 'CALENDAR') {
    // Extract the relevant information from the order string matches and return an object containing the information.
    const orderType = getOrderType(matches[1]);
    const quantity = Number(matches[2]);
    const symbol = matches[4];
    const expirationDateLong = matches[6];
    const expirationDateShort = matches[7];
    const strike = +(matches[8] + getN(matches[9]));
    const optionType = matches[10];
    const limitPrice = getPrice(matches[12], matches[13]);
    const orderCondition = matches[14];
    const orderType2 = getN(matches[15]);

    const [longExpDate, longExpMonth, longExpYear] = expirationDateLong.split(' ');
    const [shortExpDate, shortExpMonth, shortExpYear] = expirationDateShort.split(' ');

    const expirationDateSellShortRight = formatDate(shortExpYear, shortExpMonth, shortExpDate);
    const expirationDateBuyLongRight = formatDate(longExpYear, longExpMonth, longExpDate);

    const orderStr1 = `SELL|${optionType}|${expirationDateSellShortRight}|${strike}`;
    const orderStr2 = `BUY|${optionType}|${expirationDateBuyLongRight}|${strike}`;

    const strToSend = `${orderType}|${Number(quantity)}|${symbol}|${limitPrice}|${orderCondition}|${orderType2}&` + [orderStr1, orderStr2].join('&');

    console.log(strToSend);

    return strToSend;
  } else if (type === 'CALENDARMOD') {
    // Extract the relevant information from the order string matches and return an object containing the information.
    const orderType = getOrderType(matches[1]);
    const quantity = Number(matches[2]);
    const symbol = matches[4];
    const expirationDateLong = matches[6];
    const expirationDateShort = matches[7];
    const strikes = [+(matches[8] + getN(matches[9])), +(matches[10] + getN(matches[11]))];
    const optionType = matches[12];
    const limitPrice = getPrice(matches[14], matches[15]);
    const orderCondition = matches[16];
    const orderType2 = getN(matches[17]);

    const [longExpDate, longExpMonth, longExpYear] = expirationDateLong.split(' ');
    const [shortExpDate, shortExpMonth, shortExpYear] = expirationDateShort.split(' ');

    const expirationDateSellShortRight = formatDate(shortExpYear, shortExpMonth, shortExpDate);
    const expirationDateBuyLongRight = formatDate(longExpYear, longExpMonth, longExpDate);

    const orderStr1 = `SELL|${optionType}|${expirationDateSellShortRight}|${strikes[0]}`;
    const orderStr2 = `BUY|${optionType}|${expirationDateBuyLongRight}|${strikes[1]}`;

    const strToSend = `${orderType}|${Number(quantity)}|${symbol}|${limitPrice}|${orderCondition}|${orderType2}&` + [orderStr1, orderStr2].join('&');

    console.log(strToSend);

    return strToSend;
  } else {
    console.log(type, 'UNKNOWN TYPE')
  }
}

module.exports = handleCalendarOrder;
