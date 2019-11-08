import SiteConfigTesco from './sites/tesco/index.js';
import { toKg, getPricePerKg } from './utils.js';

export const highlightPrices = (getPricedElements) => {
  const pricedElements = getPricedElements().map((item) => {
    const {
      element, price, quantityOfUnit, unit,
    } = item;

    const mass = toKg(unit, quantityOfUnit);

    return {
      element,
      pricePerKilo: getPricePerKg(price, mass),
    };
  });

  const pricesPer = pricedElements.map((i) => i.pricePerKilo);
  const minPricePer = Math.min(...pricesPer);
  const maxPricePer = Math.max(...pricesPer);

  const PriceRange = maxPricePer - minPricePer;

  if (pricedElements) {
    for (let i = 0; i < pricedElements.length; i += 1) {
      const {
        element,
        pricePerKilo,
      } = pricedElements[i];

      if (pricePerKilo) {
        const diffPricePer = pricePerKilo - minPricePer;
        const priceRank = diffPricePer / PriceRange;

        const highlightHue = ((1 - priceRank) * 120).toString(10);

        element.style.backgroundColor = ['hsl(', highlightHue, ',100%,50%)'].join('');
      }
    }
  }
};

const sitesConfig = [SiteConfigTesco];

export function main() {
  setInterval(() => {
    if (document.readyState === 'complete') {
      sitesConfig.forEach((siteConfig) => {
        if (siteConfig.hostUrl === window.location.host) {
          const {
            getPricedElements,
            getElementDetails,
          } = siteConfig;

          highlightPrices(getPricedElements, getElementDetails);
        }
      });
    }
  }, 1000);
}
