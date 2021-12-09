export {}
const express = require("express");
const answerController = require("../controllers/answer.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth(), answerController.getAllAnswers);
router.get("/:idQuestion", auth(), answerController.getQuestionAnswer);
router.post("/:idQuestion", auth(), answerController.saveAnswer);
router.put("/:idQuestion", auth(), answerController.editAnswer);
router.delete("/:idQuestion", auth(), answerController.removeAnswer);

module.exports = router;