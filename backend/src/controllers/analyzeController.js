const sessions = require("../services/sessionStore");
const rulesEngine = require("../services/rulesEngine");

const analyzeSession = (req, res) => {
  const { sessionId } = req.params;

  const session = sessions[sessionId];

  if (!session) {
    return res.status(404).json({
      error: "Session not found"
    });
  }

  const result = rulesEngine(session);

  res.json(result);
};

module.exports = { analyzeSession };