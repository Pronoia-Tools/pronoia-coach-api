export {}
const express = require('express');
const unitController = require('../controllers/unit.controller');
const router = express.Router();
const auth = require('../middlewares/auth');


router.get('/', auth(), unitController.getAll);
router.post('/', auth(), unitController.post);
router.get('/:id', auth(), unitController.get);
router.put('/:id', auth(), unitController.put);
router.delete('/:id', auth(), unitController.remove);

module.exports = router;