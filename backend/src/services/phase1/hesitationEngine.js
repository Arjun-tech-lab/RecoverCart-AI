const trackSignals = require("./signalTracker");
const calculateScore = require("./scoringRules");
const analyzeReason = require("./reasonsAnalyzer");
const decideTrigger = require("./triggerDecider");
const products = require("./catalogData");

function getAveragePrice(products) {
  const total = products.reduce((sum, item) => sum + item.price, 0);
  return total / products.length;
}

function hesitationEngine(data) {
  const signals = trackSignals(data);

  const avgPrice = getAveragePrice(products);

  const expectedCartValue = avgPrice * signals.itemCount;

  const score = calculateScore(signals, expectedCartValue);

  const popup = decideTrigger(score);

  const reason = analyzeReason(signals, expectedCartValue);

  return {
    score,
    popup,
    reason,
    expectedCartValue,
    signals
  };
}

module.exports = hesitationEngine;