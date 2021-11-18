export {};
const express = require("express");
const router = express.Router();
const strypeController = require("../controllers/strype.controller")

router.post('/webhook',express.raw({type: 'application/json'}), strypeController.createPayment);

module.exports = router;