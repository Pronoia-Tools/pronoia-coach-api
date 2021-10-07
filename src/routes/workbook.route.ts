export {};
const express = require("express");
const workbookController = require("../controllers/workbook.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/:id", workbookController.get);
router.get("/", auth(), workbookController.getAll);
router.post("/", auth(), workbookController.post);
router.put("/:id", auth(), workbookController.put);
router.delete("/:id", auth(), workbookController.remove);
// router.post('/login', validate(authValidation.login), authController.login);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);

module.exports = router;
