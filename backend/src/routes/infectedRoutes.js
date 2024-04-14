const express = require("express");
const router = express.Router();

const sController = require("#controllers/infectedController.js");

router.get("/", sController.getAllInfected);
router.post("/", sController.createInfected);

router.get("/:id", sController.getInfectedById);
router.post("/:id", sController.updateInfected);
router.delete("/:id", sController.deleteInfected);

module.exports = router;
