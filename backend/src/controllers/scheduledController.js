const { Scheduled, Sequelize } = require("#models");
const sequelizeDB = require("#database");

// Get all facilities
exports.getAllSchedules = async (req, res) => {
  try {
    const facilities = await Scheduled.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.query12 = async (req, res) => {
  try {
    const facilities = await sequelizeDB.query(
      `
        SELECT * FROM Schedules          
        `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single facility by ID
exports.getScheduleById = async (req, res) => {
  try {
    const facility = await Scheduled.findOne({ where: { id: req.params.id } });
    if (!facility) {
      return res.status(404).send({ message: "Schedule not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new facility
exports.createSchedule = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Scheduled.create(req.body);
    res.send({ message: `Schedule has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a facility
exports.updateSchedule = async (req, res) => {
  try {
    const facility = await Scheduled.findOne({ where: { id: req.params.id } });
    console.log(facility);
    if (!facility) {
      return res.status(404).send({ message: "Schedule not found" });
    }
    await facility.update(req.body);
    res.send({ message: `Schedule #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteSchedule = async (req, res) => {
  try {
    const facility = await Scheduled.findOne({ where: { id: req.params.id } });

    if (!facility) {
      return res.status(404).send({ message: "Schedule not found" });
    }
    await facility.destroy();
    res.send({ message: `Schedule #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
