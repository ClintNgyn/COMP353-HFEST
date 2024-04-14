const express = require("express");
const router = express.Router();

const sController = require("#controllers/scheduledController.js");

router.get("/", sController.getAllSchedules);
router.post("/", sController.createSchedule);

router.get("/:id", sController.getScheduleById);
router.post("/:id", sController.updateSchedule);
router.delete("/:id", sController.deleteSchedule);

module.exports = router;
