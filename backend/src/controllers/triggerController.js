const hesitationEngine = require("../services/phase1/hesitationEngine");

function checkTrigger(req, res) {
  try {
    const result = hesitationEngine(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing trigger engine",
    });
  }
}

module.exports = { checkTrigger };