const express = require("express");
const router = express.Router();

const facilityController = require("#controllers/facilityController.js");

router.get("/", facilityController.getAllFacilities);
router.post("/", facilityController.createFacility);

router.get("/:id", facilityController.getFacilityById);
router.post("/:id", facilityController.updateFacility);
router.delete("/:id", facilityController.deleteFacility);

module.exports = router;
