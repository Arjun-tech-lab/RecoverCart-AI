const express = require("express");
const router = express.Router();

const { checkTrigger } = require("../controllers/triggerController");

router.post("/check", checkTrigger);

module.exports = router;