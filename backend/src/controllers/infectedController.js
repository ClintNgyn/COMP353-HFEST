const { Infected, Sequelize } = require("#models");
const sequelizeDB = require("#database");

// Get all facilities
exports.getAllInfected = async (req, res) => {
  try {
    const facilities = await Infected.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single facility by ID
exports.getInfectedById = async (req, res) => {
  try {
    const facility = await Infected.findOne({ where: { id: req.params.id } });
    if (!facility) {
      return res.status(404).send({ message: "Infected not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new facility
exports.createInfected = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Infected.create(req.body);
    res.send({ message: `Infected has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a facility
exports.updateInfected = async (req, res) => {
  try {
    const facility = await Infected.findOne({ where: { id: req.params.id } });
    if (!facility) {
      return res.status(404).send({ message: "Infected not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Infected #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteInfected = async (req, res) => {
  try {
    const facility = await Infected.findOne({ where: { id: req.params.id } });

    if (!facility) {
      return res.status(404).send({ message: "Infected not found" });
    }
    await facility.destroy();
    res.send({ message: `Infected #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
