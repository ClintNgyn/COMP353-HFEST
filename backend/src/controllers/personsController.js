const { Person } = require("#models");

// Get all
exports.getAllPersons = async (req, res) => {
  try {
    const facilities = await Person.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a Person by ID
exports.getPersonById = async (req, res) => {
  try {
    const facility = await Person.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Person not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new Person
exports.createPerson = async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    const facility = await Person.create(req.body);
    res.send({ message: `Person has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a
exports.updatePerson = async (req, res) => {
  try {
    const facility = await Person.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Person not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Person #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deletePerson = async (req, res) => {
  try {
    const facility = await Person.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Person not found" });
    }
    await facility.destroy();
    res.send({ message: `Person #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
