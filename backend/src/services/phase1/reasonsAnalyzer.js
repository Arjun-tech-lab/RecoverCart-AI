function analyzeReason(signals, expectedCartValue) {
  if (
    signals.cartValue > expectedCartValue * 1.3 &&
    signals.timeSpent >= 10 &&
    !signals.checkoutClicked
  ) {
    return "price";
  }

  if (signals.shippingClicks === 0 && signals.timeSpent >= 20) {
    return "shipping";
  }

  if (!signals.checkoutClicked && signals.timeSpent >= 25) {
    return "trust";
  }

  return "deciding";
}

module.exports = analyzeReason;