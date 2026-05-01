function trackSignals(data) {
  return {
    timeSpent: data.timeSpent || 0,
    idleTime: data.idleTime || 0,
    quantityChanges: data.quantityChanges || 0,
    shippingClicks: data.shippingClicks || 0,
    itemRemoved: data.itemRemoved || false,
    checkoutClicked: data.checkoutClicked || false,
    checkoutHovered: data.checkoutHovered || false,
    cartValue: data.cartValue || 0,
    itemCount: data.itemCount || 0
  };
}

module.exports = trackSignals;