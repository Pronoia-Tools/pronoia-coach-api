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

// router.get("/:unitId/question", auth(), unitController.getUnitAll);
router.post("/:unitId/question", auth(), unitController.postQuestion);
router.get("/:unitId/question/:questionId", auth(), unitController.getQuestion);
router.put("/:unitId/question/:questionId", auth(), unitController.putQuestion);
router.delete("/:unitId/question/:questionId", auth(), unitController.removeQuestion);

module.exports = router;