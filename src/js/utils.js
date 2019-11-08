export const toKg = (unit, quantity = 1) => {
  switch (unit) {
    // Assumes that 'kg' and 'l' are comparable
    case ('kg'):
    case ('l'):
    case ('litre'):
      return quantity;

    case ('cl'):
      return quantity / 100;

    // Assumes that 'g' and 'ml' are comparable
    case ('g'):
    case ('ml'):
      return quantity / 1000;

    // We can't compare items of no clear mass/volume
    case ('each'):
    default:
      return null;
  }
};

export const getPricePerKg = (price, mass) => {
  if (mass) {
    return (price / mass);
  }

  return null;
};
