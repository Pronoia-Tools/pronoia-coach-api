export {};
const express = require("express");
const questionsController = require("../controllers/question.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

//router.get("/", questionsController.get);
router.post("/", questionsController.post);
//router.put("/:id", questionsController.put);
//router.delete("/:id", questionsController.delete);

module.exports = router;
