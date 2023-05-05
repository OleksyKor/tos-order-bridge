import { getN, formatDate, getOrderType, getPrice } from './utils';

describe('getN', () => {
  test('returns the input value if it is defined', () => {
    expect(getN(42)).toBe(42);
    expect(getN('hello')).toBe('hello');
  });

  test('returns an empty string if the input value is null or undefined', () => {
    expect(getN(null)).toBe('');
    expect(getN(undefined)).toBe('');
  });
});

describe('formatDate', () => {
  test('formats the input date correctly', () => {
    expect(formatDate('22', '07', '01')).toBe('20220701');
    expect(formatDate('99', '12', '31')).toBe('20991231');
  });
});

describe('getOrderType', () => {
  test('returns the correct order type', () => {
    expect(getOrderType('sell')).toBe('SELL');
    expect(getOrderType('Sell')).toBe('SELL');
    expect(getOrderType('BUY')).toBe('BUY');
    expect(getOrderType('bot')).toBe('BUY');
    expect(getOrderType('Bot')).toBe('BUY');
  });

  test('returns undefined for unrecognized order types', () => {
    expect(getOrderType('invalid')).toBeUndefined();
    expect(getOrderType('test')).toBeUndefined();
  });
});

describe('getPrice', () => {
  test('returns the correct price', () => {
    expect(getPrice(15, '.44')).toBe(15.44);
    expect(getPrice(42)).toBe(42.0);
    expect(getPrice(null, '.99')).toBe(0.99);
  });
});
