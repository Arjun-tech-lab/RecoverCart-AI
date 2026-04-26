const recoveryEngine = require("../services/phase2/recoveryEngine");

function getPlan(req, res) {
  const result = recoveryEngine(req.body);

  res.json({
    success: true,
    data: result
  });
}

module.exports = { getPlan };