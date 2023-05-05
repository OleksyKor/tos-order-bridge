import { format } from "date-fns";

const getN = (n) => n ?? "";

function formatDate(expYear, expMonth, expDate) {
  return format(
    new Date(`20${expYear} ${expMonth} ${expDate}`),
    "yyyyMMdd",
    new Date()
  );
}

function getOrderType(order) {
  if (/^sell$/i.test(order)) {
    return "SELL";
  } else if (/^(buy|bot)$/i.test(order)) {
    return "BUY";
  } else {
    return undefined;
  }
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
