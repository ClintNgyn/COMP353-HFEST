const express = require("express");
const router = express.Router();

const employeeController = require("#controllers/employeeController.js");

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);

router.get("/query12", employeeController.query12);
router.get("/query15", employeeController.query15);

router.get("/:id", employeeController.getEmployeeById);
router.post("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
