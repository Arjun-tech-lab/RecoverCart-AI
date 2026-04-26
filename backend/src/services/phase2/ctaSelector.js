function ctaSelector(reason) {
  if (reason === "price") return "Apply Discount";
  if (reason === "shipping") return "View Delivery Options";
  if (reason === "trust") return "Checkout Securely";

  return "Continue";
}

module.exports = ctaSelector;