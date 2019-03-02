import { getExpireDate, isExpired } from '@/helper/date.helper';

describe('Testing date helper', () => {
  test('Check if is expire', () => {
    const now = new Date();
    let expire = now.getTime() - 1000 * 60 * 60 * 24;
    expire = new Date(expire).toISOString();
    expect(isExpired(expire)).toBe(true);
  });
  test('Check if is not expire', () => {
    const now = new Date();
    let expire = now.getTime() + 1000 * 60 * 60 * 24;
    expire = new Date(expire).toISOString();
    expect(isExpired(expire)).toBe(false);
  });
  test('Check if return correct expire date', () => {
    const now = new Date();
    let date = now.getTime() + 3600 * 1000;
    date = new Date(date).toISOString();
    expect(getExpireDate(3600)).toBe(date);
  });
});
