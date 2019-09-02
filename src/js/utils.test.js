import {
  toKg,
  getPricePerKg,
} from './utils';

describe('toKg()', () => {
  const testArray = [
    { unit: 'kg', quantity: 0.24, expectedKg: 0.24 },
    { unit: 'g', quantity: 500, expectedKg: 0.5 },
    { unit: 'l', quantity: 3, expectedKg: 3 },
    { unit: 'cl', quantity: 70, expectedKg: 0.7 },
    { unit: 'ml', quantity: 200, expectedKg: 0.2 },
    { unit: 'each', expectedKg: null },
    { unit: undefined, expectedKg: null },
  ];

  testArray.forEach((testCase) => {
    const { unit, quantity, expectedKg } = testCase;

    test(`converts ${quantity}${unit} into ${expectedKg}kg`, () => expect(toKg(unit, quantity)).toEqual(expectedKg));
  });

  test('uses 1 as the default unit quantity if none is provided', () => {
    const unit = 'kg';
    const quantity = undefined;

    expect(toKg(unit, quantity)).toEqual(1);
  });

  test('returns null if the unit is \'each\'', () => {
    const unit = 'each';
    const quantity = 2;

    expect(toKg(unit, quantity)).toEqual(null);
  });

  test('returns null if the mass is undefined', () => {
    const unit = undefined;
    const quantity = 2;

    expect(toKg(unit, quantity)).toEqual(null);
  });
});

describe('getPricePerKg()', () => {
  const price = 4.25;

  test('returns the correct value given the item price and mass', () => {
    const mass = 0.5;

    expect(getPricePerKg(price, mass)).toEqual(8.5);
  });

  test('returns null if the mass is null', () => {
    const mass = null;

    expect(getPricePerKg(price, mass)).toEqual(null);
  });
});
