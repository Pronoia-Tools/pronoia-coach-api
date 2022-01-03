export {};
const express = require("express");
const workbookController = require("../controllers/workbook.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth(), workbookController.getAll);
router.get("/public", workbookController.getPublicWorkbooks);
router.post("/", auth(), workbookController.post);
router.get("/:id", workbookController.get);
router.put("/:id", auth(), workbookController.put);
router.delete("/:id", auth(), workbookController.remove);

router.get("/:workbookId/unit", auth(), workbookController.getUnitAll);
router.post("/:workbookId/unit", auth(), workbookController.postUnit);
router.put("/:workbookId/unit/:unitId", auth(), workbookController.putUnit);

router.put("/:workbookId/tags", auth(), workbookController.putTags);
router.get("/:workbookId/tags", auth(), workbookController.getAllTags);

module.exports = router;
