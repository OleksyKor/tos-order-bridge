import { getOrderType, formatDate, getPrice, getN } from './utils';

function handleSingleOrder(type, matches) {
    console.log(type);

    // Extract the relevant information from the order string matches and return an object containing the information.
    const orderType = getOrderType(matches[1]);
    const quantity = Number(matches[2]);
    const symbol = matches[3];
    // const shares = +matches[4];
    const expirationDate = matches[5];
    const strike = +(matches[6] + getN(matches[7]));
    const optionType = matches[8];
    const limitPrice = getPrice(matches[10], matches[11]);
    const orderCondition = matches[12];
    const orderType2 = getN(matches[13]);

    // console.log(orderType, quantity, strategy, symbol, shares, expirationDateLong, expirationDateShort, strikes, optionType[], limitPrice, orderCondition, orderType2);
    const [longExpDate, longExpMonth, longExpYear] = expirationDate.split(' ');

    const expirationDateRight = formatDate(longExpYear, longExpMonth, longExpDate);


    const orderStr1 = `${orderType}|${optionType}|${expirationDateRight}|${strike}`;

    // console.log({ orderType, quantity, strategy, symbol, shares, expirationDateLong, expirationDateShort, strikes, optionType[], limitPrice, orderCondition, orderType2 });

    const strToSend = `${orderType}|${Number(quantity)}|${symbol}|${limitPrice}|${orderCondition}|${orderType2}&` + orderStr1;

    console.log(strToSend);

    return strToSend;
}

export default handleSingleOrder;
