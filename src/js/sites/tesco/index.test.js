import siteConfigTesco from '.';

const {
  hostUrl,
  priceElementClassName,
  getPricedElements,
  getElementDetails,
} = siteConfigTesco;

describe('tescoSiteConfig', () => {
  test('host is correctly configured', () => {
    expect(hostUrl).toEqual('www.tesco.com');
  });

  test('price element classname identifier is correctly configured', () => {
    expect(priceElementClassName).toEqual('price-per-quantity-weight');
  });

  const matchingElement1 = `
    <div class="price-per-quantity-weight">
      <span>
        <span class="currency">£</span>
        <span data-auto="price-value" class="value">0.63</span>
      </span>
      <span class="weight">/100g</span>
    </div>
  `;
  const matchingElement2 = `
    <div class="price-per-quantity-weight">
      <span>
        <span class="currency">£</span>
        <span data-auto="price-value" class="value">0.99</span>
      </span>
      <span class="weight">/kg</span>
    </div>
  `;
  const notMatchingElement = '<div class="some-other-class"></div>';

  test('getPricedElements returns an array of formatted matching elements', () => {
    document.body.innerHTML = `${matchingElement1}${notMatchingElement}${matchingElement2}`;

    const expectedResult = [
      {
        element: document.body.firstElementChild,
        price: '0.63',
        unit: 'g',
        quantityOfUnit: 100,
      },
      {
        element: document.body.lastElementChild,
        price: '0.99',
        unit: 'kg',
        quantityOfUnit: 1,
      },
    ];
    expect(getPricedElements()).toEqual(expectedResult);
  });

  test('getElementDetails returns a well formed details object unit quantity is present', () => {
    document.body.innerHTML = matchingElement1;
    const element = document.body.firstElementChild;

    const expectedResult = {
      element,
      price: '0.63',
      unit: 'g',
      quantityOfUnit: 100,
    };
    expect(getElementDetails(element)).toEqual(expectedResult);
  });

  test('getElementDetails returns a well formed details object if no unit quantity is present', () => {
    document.body.innerHTML = matchingElement2;
    const element = document.body.firstElementChild;

    const expectedResult = {
      element,
      price: '0.99',
      unit: 'kg',
      quantityOfUnit: 1,
    };
    expect(getElementDetails(element)).toEqual(expectedResult);
  });
});
