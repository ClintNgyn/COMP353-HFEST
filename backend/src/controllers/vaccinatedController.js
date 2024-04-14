const { Vaccinated, Sequelize } = require("#models");
const sequelizeDB = require("#database");

// Get all facilities
exports.getAllVaccination = async (req, res) => {
  try {
    const facilities = await Vaccinated.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single facility by ID
exports.getVaccinationById = async (req, res) => {
  try {
    const facility = await Vaccinated.findOne({ where: { id: req.params.id } });
    if (!facility) {
      return res.status(404).send({ message: "Vaccinated not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new facility
exports.createVaccination = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Vaccinated.create(req.body);
    res.send({ message: `Vaccinated has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a facility
exports.updateVaccination = async (req, res) => {
  try {
    const facility = await Vaccinated.findOne({ where: { id: req.params.id } });
    console.log(`vaccination update: ${facility}`);
    if (!facility) {
      return res.status(404).send({ message: "Vaccinated not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Vaccination #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteVaccination = async (req, res) => {
  try {
    const facility = await Vaccinated.findOne({ where: { id: req.params.id } });

    if (!facility) {
      return res.status(404).send({ message: "Vaccinated not found" });
    }
    await facility.destroy();
    res.send({ message: `Vaccinated #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
