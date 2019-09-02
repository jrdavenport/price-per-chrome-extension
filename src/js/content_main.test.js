import { highlightPrices } from './content_main';

describe('#highlightPrices', () => {
  it('highlights elements based on their relative price per unit', () => {
    const el1 = '<div style="" id="el1"></div>';
    const el2 = '<div style="" id="el2"></div>';
    const el3 = '<div style="" id="el3"></div>';
    document.body.innerHTML = `${el1}${el2}${el3}`;

    const mockGetPricedElements = () => [
      {
        element: document.getElementById('el1'), price: '1.00', quantityOfUnit: 100, unit: 'g',
      },
      {
        element: document.getElementById('el2'), price: '1.50', quantityOfUnit: 100, unit: 'g',
      },
      {
        element: document.getElementById('el3'), price: '2.00', quantityOfUnit: 100, unit: 'g',
      },
    ];

    highlightPrices(mockGetPricedElements);

    expect(document.getElementById('el1').style.backgroundColor).toEqual('hsl(120, 100%, 50%)');
    expect(document.getElementById('el2').style.backgroundColor).toEqual('hsl(60, 100%, 50%)');
    expect(document.getElementById('el3').style.backgroundColor).toEqual('hsl(0, 100%, 50%)');
  });
});
