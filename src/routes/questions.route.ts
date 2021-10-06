export {};
const express = require("express");
const questionsController = require("../controllers/question.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/:id", questionsController.get);
router.post("/", auth(), questionsController.post);
//router.put("/:id", questionsController.put);
//router.delete("/", auth(), questionsController.delete);

module.exports = router;
