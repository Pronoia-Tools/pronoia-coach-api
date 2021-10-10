export {};
const express = require("express");
const workbookController = require("../controllers/workbook.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req:any, file:any, cb:any) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new ApiError(httpStatus.NOT_FOUND,'Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).single('file');


router.get("/:id", auth(), workbookController.get);
router.get("/", auth(), workbookController.getAll);
router.post("/", auth(), workbookController.post);
router.post("/image", [auth(),upload], workbookController.postImage);
router.put("/:id", auth(), workbookController.put);
router.delete("/:id", auth(), workbookController.remove);
// router.post('/login', validate(authValidation.login), authController.login);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.get("/:workbookId/unit", auth(), workbookController.getUnitAll);
router.put("/:workbookId/unit/:unitId", auth(), workbookController.putUnit);

module.exports = router;
