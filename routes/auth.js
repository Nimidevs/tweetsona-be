const express = require("express");
const { getAuth, getCallback } = require("../controllers/auth_controller");
const router = express.Router();

router.get("/twitter", getAuth);
router.get("/twitter/callback", getCallback);

module.exports = router;
