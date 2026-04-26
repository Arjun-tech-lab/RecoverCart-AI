function messageBuilder(reason) {
  if (reason === "price") {
    return {
      title: "Best Value Today",
      question: "Is price holding you back?"
    };
  }

  if (reason === "shipping") {
    return {
      title: "Delivery Made Easy",
      question: "Need faster or cheaper delivery?"
    };
  }

  if (reason === "trust") {
    return {
      title: "Shop With Confidence",
      question: "Need more confidence before payment?"
    };
  }

  return {
    title: "Still Deciding?",
    question: "Would you like to save your cart?"
  };
}

module.exports = messageBuilder;