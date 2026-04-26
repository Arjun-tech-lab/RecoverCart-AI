function offerSelector(reason, cartValue) {
  if (reason === "price") {
    if (cartValue >= 10000) {
      return {
        type: "discount",
        percent: 10,
        label: "SAVE10 - 10% OFF"
      };
    }

    return {
      type: "discount",
      percent: 5,
      label: "SAVE5 - 5% OFF"
    };
  }

  if (reason === "shipping") {
    return {
      type: "free_shipping",
      value: true,
      label: "Free Shipping Today"
    };
  }

  if (reason === "trust") {
    return {
      type: "trust",
      label: "100% Secure Checkout"
    };
  }

  return {
    type: "save_cart",
    label: "Save Cart"
  };
}

module.exports = offerSelector;