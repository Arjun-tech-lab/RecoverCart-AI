function analyze(session) {
  let score = 0;
  let reason = "none";

  if (session.shippingClicks >= 2) {
    score += 40;
    reason = "delivery";
  }

  if (session.qtyChanges >= 3) {
    score += 30;
    reason = "price";
  }

  if (session.cartTime >= 20) {
    score += 40;
    reason = "hesitation";
  }

  return {
    score,
    reason,
    trigger: score >= 50
  };
}

module.exports = analyze;