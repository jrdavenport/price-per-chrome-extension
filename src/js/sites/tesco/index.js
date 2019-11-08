const hostUrl = 'www.tesco.com';

const priceElementClassName = 'price-per-quantity-weight';

const getElementDetails = (element) => {
  const price = element.getElementsByClassName('value')[0].innerHTML;
  const quantityUnit = element.getElementsByClassName('weight')[0].innerHTML.substr(1);

  const regex = /([\d|.]*)(.*)/;
  const regexMatch = quantityUnit.match(regex);

  const quantityOfUnit = Number(regexMatch[1]) || 1;
  const unit = regexMatch[2];

  return {
    element, price, unit, quantityOfUnit,
  };
};

const getPricedElements = () => {
  const elementsArray = [...document.getElementsByClassName(priceElementClassName)];

  return elementsArray.map((element) => getElementDetails(element));
};

export default {
  hostUrl,
  priceElementClassName,
  getPricedElements,
  getElementDetails,
};
