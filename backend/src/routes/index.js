const express = require("express");
const router = express.Router();

const facilityRoutes = require("./facilityRoutes.js");
const residenceRoutes = require("./residenceRoutes.js");
const personRoutes = require("./personRoutes.js");
const employeeRoutes = require("./employeeRoutes.js");
const scheduledRoutes = require("./scheduledRoutes.js");
const vRoutes = require("./vaccinatedRoutes.js");
const iRoutes = require("./infectedRoutes.js");

router.use("/facilities", facilityRoutes);
router.use("/residences", residenceRoutes);
router.use("/persons", personRoutes);
router.use("/employees", employeeRoutes);
router.use("/scheduled", scheduledRoutes);
router.use("/vaccinated", vRoutes);
router.use("/infected", iRoutes);

module.exports = router;
