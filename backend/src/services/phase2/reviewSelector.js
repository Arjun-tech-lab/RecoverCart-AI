const products = require("./mockData");

function reviewSelector(productId, reason) {
  const item = products[productId];

  if (!item) return "⭐ Popular choice among customers.";

  return item.reviews[reason] || "⭐ Loved by customers.";
}

module.exports = reviewSelector;