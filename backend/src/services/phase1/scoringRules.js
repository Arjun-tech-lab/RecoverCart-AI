function calculateScore(signals) {
  let score = 0;

  if (signals.idleTime >= 25) {
    score += 35;
  } else if (signals.idleTime >= 15) {
    score += 20;
  }

  if (signals.shippingClicks >= 2) score += 25;
  if (signals.itemRemoved) score += 30;
  if (signals.checkoutHovered) score += 30;
  if (signals.quantityChanges >= 3) score += 20;

  return score;
}

module.exports = calculateScore;