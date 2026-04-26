const offerSelector = require("./offerSelector");

function recoveryEngine(data) {
  const offer = offerSelector(data.reason, data.cartValue);

  return {
    title: "Best Value Today",
    question: "Is price holding you back?",
    offer,
    cta: "Apply Now"
  };
}

module.exports = recoveryEngine;