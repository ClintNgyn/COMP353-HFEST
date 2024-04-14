const express = require("express");
const router = express.Router();

const residenceController = require("#controllers/residenceController.js");

router.get("/", residenceController.getAllResidences);
router.post("/", residenceController.createResidence);

router.get("/:id", residenceController.getResidenceById);
router.post("/:id", residenceController.updateResidence);
router.delete("/:id", residenceController.deleteResidence);

module.exports = router;
