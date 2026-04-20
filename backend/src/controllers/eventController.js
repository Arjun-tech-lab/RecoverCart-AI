const analyticsService = require("../services/analyticsService");

const trackEvent = (req, res) => {
  const result = analyticsService.handleEvent(req.body);

  res.json({
    success: true,
    data: result
  });
};

module.exports = { trackEvent };