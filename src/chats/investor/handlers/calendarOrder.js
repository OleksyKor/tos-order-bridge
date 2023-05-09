import { getOrderType, formatDate, getPrice, getN } from "./utils";

function getExpirationDates(expirationDateLong, expirationDateShort) {
  const [longExpDate, longExpMonth, longExpYear] =
    expirationDateLong.split(" ");
  const [shortExpDate, shortExpMonth, shortExpYear] =
    expirationDateShort.split(" ");

  const expirationDateSellShortRight = formatDate(
    shortExpYear,
    shortExpMonth,
    shortExpDate
  );
  const expirationDateBuyLongRight = formatDate(
    longExpYear,
    longExpMonth,
    longExpDate
  );

  return { expirationDateSellShortRight, expirationDateBuyLongRight };
}

function createOrderStrings(
  optionType,
  expirationDateSellShortRight,
  expirationDateBuyLongRight,
  strikeOrStrikes
) {
  const strikes = Array.isArray(strikeOrStrikes)
    ? strikeOrStrikes
    : [strikeOrStrikes, strikeOrStrikes];
  const orderStr1 = `SELL|${optionType}|${expirationDateSellShortRight}|${strikes[0]}`;
  const orderStr2 = `BUY|${optionType}|${expirationDateBuyLongRight}|${strikes[1]}`;

  return [orderStr1, orderStr2];
}

function extractMatchVariables(type, matches) {
  const common = {
    orderType: getOrderType(matches[1]),
    quantity: Number(matches[2]),
    symbol: matches[4],
    expirationDateLong: matches[6],
    expirationDateShort: matches[7],
  };

  const specific =
    type === "CALENDAR"
      ? {
          strike: +(matches[8] + getN(matches[9])),
          optionType: matches[10],
          limitPrice: getPrice(matches[12], matches[13]),
          orderCondition: matches[14],
          orderType2: getN(matches[15]),
        }
      : {
          strikes: [
            +(matches[8] + getN(matches[9])),
            +(matches[10] + getN(matches[11])),
          ],
          optionType: matches[12],
          limitPrice: getPrice(matches[14], matches[15]),
          orderCondition: matches[16],
          orderType2: getN(matches[17]),
        };

  return { ...common, ...specific };
}

function generateOrderString(data, orderStrings) {
  const {
    orderType,
    quantity,
    symbol,
    limitPrice,
    orderCondition,
    orderType2,
  } = data;
  
  return (`${orderType}|${Number(quantity)}|${symbol}|${limitPrice}|${orderCondition}|${orderType2}&` + orderStrings.join("&"));
}

function handleCalendarOrder(type, matches) {
  console.log(type);

  if (type === "CALENDAR" || type === "CALENDARMOD") {
    const data = extractMatchVariables(type, matches);
    const { expirationDateSellShortRight, expirationDateBuyLongRight } =
      getExpirationDates(data.expirationDateLong, data.expirationDateShort);
    const orderStrings = createOrderStrings(
      data.optionType,
      expirationDateSellShortRight,
      expirationDateBuyLongRight,
      data.strike || data.strikes
    );
    const strToSend = generateOrderString(data, orderStrings);

    console.log(strToSend);

    return strToSend;
  } else {
    console.log(type, "UNKNOWN TYPE");
  }
}
export default handleCalendarOrder;
