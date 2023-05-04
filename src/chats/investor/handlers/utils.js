import { format } from "date-fns";

const getN = (n) => (n ? n : "");

function formatDate(expYear, expMonth, expDate) {
  return format(
    new Date(`20${expYear} ${expMonth} ${expDate}`),
    "yyyyMMdd",
    new Date()
  );
}

function getOrderType(order) {
  const sell = ["SELL", "Sell", "sell"].includes(order) && "SELL";
  const buy = ["BUY", "BOT", "Buy"].includes(order) && "BUY";
  return sell || buy;
}

function getPrice(whole, decimal) {
  return +((whole || "0") + getN(decimal));
}

export {
  getN,
  formatDate,
  getOrderType,
  getPrice,
};
