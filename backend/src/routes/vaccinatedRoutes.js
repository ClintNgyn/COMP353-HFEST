const express = require("express");
const router = express.Router();

const vController = require("#controllers/vaccinatedController.js");

router.get("/", vController.getAllVaccination);
router.post("/", vController.createVaccination);

router.get("/:id", vController.getVaccinationById);
router.post("/:id", vController.updateVaccination);
router.delete("/:id", vController.deleteVaccination);

module.exports = router;
