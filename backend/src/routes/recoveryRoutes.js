const express = require("express");
const router = express.Router();

const { getPlan } = require("../controllers/recoveryController");

router.post("/plan", getPlan);

module.exports = router;