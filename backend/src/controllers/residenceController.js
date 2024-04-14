const { Facility, Residence } = require("#models");

// Get all
exports.getAllResidences = async (req, res) => {
  try {
    const facilities = await Residence.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a residence by ID
exports.getResidenceById = async (req, res) => {
  try {
    const facility = await Residence.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Residence not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new residence
exports.createResidence = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Residence.create(req.body);
    res.send({ message: `Residence has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a
exports.updateResidence = async (req, res) => {
  try {
    const facility = await Residence.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Residence not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Residence #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteResidence = async (req, res) => {
  try {
    const facility = await Residence.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Residence not found" });
    }
    await facility.destroy();
    res.send({ message: `Residence #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
