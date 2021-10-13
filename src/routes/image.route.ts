export {};
const express = require("express");
const imageController = require("../controllers/image.controller");
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
});


// router.post("/image", [auth(), upload.single('file')], workbookController.postImage);
router.get("/", auth(), imageController.getAll)
router.post("/", [auth(), upload.array('images',12)], imageController.post);

module.exports = router;
