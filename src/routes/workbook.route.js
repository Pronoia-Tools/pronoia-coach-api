const express = require('express');
const workbookController = require('../controllers/workbook.controller');
const router = express.Router();

router.get('/get', workbookController.get);
router.post('/post', workbookController.post);

module.exports = router;