const express = require("express");
const router = express.Router();

const { analyzeSession } = require("../controllers/analyzeController");

router.get("/:sessionId", analyzeSession);

module.exports = router;