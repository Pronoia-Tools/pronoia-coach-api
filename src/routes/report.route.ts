const express = require("express");
const reportController = require("../controllers/report.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/", auth(), reportController.post);

module.exports = router;