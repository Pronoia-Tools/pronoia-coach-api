export {};
const express = require("express");
const workbookController = require("../controllers/workbook.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/:id", workbookController.get);
router.post("/", auth(), workbookController.post);
// router.post('/login', validate(authValidation.login), authController.login);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);

module.exports = router;
