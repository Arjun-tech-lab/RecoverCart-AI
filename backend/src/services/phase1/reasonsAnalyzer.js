function analyzeReason(signals) {
  if (signals.itemRemoved) {
    return "price_hesitation";
  }
  
  if (signals.checkoutHovered) {
    return "trust_payment";
  }
  
  if (signals.quantityChanges >= 3) {
    return "uncertainty";
  }

  if (signals.shippingClicks >= 2) {
    return "shipping_confusion";
  }
  
  if (signals.idleTime >= 15) {
    return "deciding";
  }

  return "deciding"; 
}

module.exports = analyzeReason;