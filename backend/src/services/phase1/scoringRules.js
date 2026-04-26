function calculateScore(signals, expectedCartValue) {
  let score = 0;

  if (signals.timeSpent >= 20) score += 30;

  if (signals.quantityChanges >= 2) score += 20;

  if (signals.shippingClicks === 0) score += 15;

  if (signals.timeSpent >= 15 && !signals.checkoutClicked) score += 20;

  if (signals.itemRemoved) score += 15;

  // Dynamic Price Shock Rule
  if (
    signals.cartValue > expectedCartValue * 1.3 &&
    signals.timeSpent >= 10 &&
    !signals.checkoutClicked
  ) {
    score += 25;
  }

  return score;
}

module.exports = calculateScore;