const { Employee, Sequelize } = require("#models");
const sequelizeDB = require("#database");

// Get all facilities
exports.getAllEmployees = async (req, res) => {
  try {
    const facilities = await Employee.findAll();
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.query12 = async (req, res) => {
  try {
    const facilities = await sequelizeDB.query(
      `
        SELECT * FROM Employees          
        `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.query15 = async (req, res) => {
  try {
    const facilities = await sequelizeDB.query(
      `
      Select 
	p.firstName,
    MIN(wa.startAt) AS firstDayOfWork,
    p.lastName,
    p.dob,
    p.email,
    COUNT(DISTINCT i.infectionDate) AS totalTimesInfectedByCOVID19,
    COUNT(DISTINCT v.doseNumber) AS totalVaccines,
    SUM(TIMESTAMPDIFF(HOUR, s.startAt, COALESCE(s.endAt, NOW()))) AS totalScheduledHours,
    COUNT(DISTINCT sr.residenceId) AS totalSecondaryResidences
FROM
WorkRoles wr
Join WorksAt wa ON wr.workRole = wa.workRole AND wr.workRole = 'Nurse'
Join Employees e ON e.id = wa.employeeId
Join Persons p ON p.id = e.personId
Join Infected i ON i.personId = p.id AND i.infectionType = 'COVID-19' AND i.infectionDate BETWEEN DATE_SUB(NOW(), INTERVAL 2 WEEK) AND NOW()
LEFT JOIN 
    Vaccinated v ON v.personId = p.id
LEFT JOIN 
    Scheduled s ON s.employeeId = e.id
LEFT JOIN 
    SecondaryResidences sr ON sr.personId = p.id
GROUP BY 
    p.id
HAVING
	COUNT(DISTINCT wa.facilityId) >= 2 AND totalTimesInfectedByCOVID19 > 0
ORDER BY 
    firstDayOfWork ASC, 
    p.firstName ASC, 
    p.lastName ASC;

      
        `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single facility by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const facility = await Employee.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Employee not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new facility
exports.createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Employee.create(req.body);
    res.send({ message: `Employee has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a facility
exports.updateEmployee = async (req, res) => {
  try {
    const facility = await Employee.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Employee not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Employee #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteEmployee = async (req, res) => {
  try {
    const facility = await Employee.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Employee not found" });
    }
    await facility.destroy();
    res.send({ message: `Employee #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
