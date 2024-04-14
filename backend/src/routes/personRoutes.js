const express = require("express");
const router = express.Router();

const personController = require("#controllers/personsController.js");

router.get("/", personController.getAllPersons);
router.post("/", personController.createPerson);

router.get("/:id", personController.getPersonById);
router.post("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

module.exports = router;
