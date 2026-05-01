const trackSignals = require("./signalTracker");
const calculateScore = require("./scoringRules");
const analyzeReason = require("./reasonsAnalyzer");
const decideTrigger = require("./triggerDecider");

function hesitationEngine(data) {
  const signals = trackSignals(data);

  // Directly pass signals, remove expectedCartValue completely
  const score = calculateScore(signals);

  const popup = decideTrigger(score);

  const reason = analyzeReason(signals);

  return {
    score,
    popup,
    reason,
    signals
  };
}

module.exports = hesitationEngine;