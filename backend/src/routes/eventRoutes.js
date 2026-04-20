const express = require("express");
const router = express.Router();

const { trackEvent } = require("../controllers/eventController");

router.post("/", trackEvent);

module.exports = router;