const products = require("./mockData");

function benchmarkService(productId) {
  const item = products[productId];

  if (!item) return null;

  const savings = item.marketAvg - item.ourPrice;

  if (savings > 0) {
    return `₹${savings} lower than average market price`;
  }

  return "Competitive market pricing";
}

module.exports = benchmarkService;