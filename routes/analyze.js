const express = require("express");
const { getAndAnalyzeTweets} = require("../controllers/analyze_controller");
const { protectRoute } = require("../middlewares/protectAnalyseRoute");
const router = express.Router();

router.get("/tweets", protectRoute, getAndAnalyzeTweets);
// router.get("/ai-response", aiTest)

module.exports = router;
