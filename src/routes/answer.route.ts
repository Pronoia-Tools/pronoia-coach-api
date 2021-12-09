export {}
const express = require("express");
const validate = require('../middlewares/validate');
const answerController = require("../controllers/answer.controller");
const answerValidation = require('../validations/answer.validation');
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth(), answerController.getAllAnswers);
router.get("/:idQuestion", auth(), answerController.getQuestionAnswer);
router.post("/:idQuestion", [validate(answerValidation.saveAnswer),auth()], answerController.saveAnswer);
router.put("/:idQuestion", [validate(answerValidation.editAnswer),auth()], answerController.editAnswer);
router.delete("/:idQuestion", auth(), answerController.removeAnswer);

module.exports = router;