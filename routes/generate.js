const express = require("express");
const { generateImage } = require("../controllers/generate_controller");
const router = express.Router();

router.post("image", generateImage);

module.exports = router;
