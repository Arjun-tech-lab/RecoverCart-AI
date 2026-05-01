function offerSelector(reason) {
  switch (reason) {
    case 'price_hesitation':
      return {
        type: "complex",
        discount_percent: 5,
        free_shipping: false,
        label: "AI Price Optimization"
      };
    case 'shipping_confusion':
      return {
        type: "complex",
        discount_percent: 0,
        free_shipping: false,
        label: "Delivery Guidance"
      };
    case 'trust_payment':
      return {
        type: "complex",
        discount_percent: 0,
        free_shipping: false,
        label: "Checkout Protection"
      };
    case 'uncertainty':
      return {
        type: "complex",
        discount_percent: 10,
        free_shipping: true,
        label: "Value Optimization"
      };
    case 'deciding':
      return {
        type: "complex",
        discount_percent: 10,
        free_shipping: false,
        label: "Special Reserved Offer"
      };
    default:
      return {
        type: "complex",
        discount_percent: 5,
        free_shipping: false,
        label: "AI Recovery Intervention"
      };
  }
}

module.exports = offerSelector;