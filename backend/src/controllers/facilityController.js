const { Facility, Employee, Person, WorksAt, Sequelize } = require("#models");
const sequelizeDB = require("#database");

// Get all facilities
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll(); // SELECT * FROM Facilities
    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Query#8
exports.query8 = async (req, res) => {
  try {
    const facilities = await sequelizeDB.query(
      `
    SELECT 
        f.id,
          f.facilityName,
          f.address,
          f.city,
          f.province,
          f.postalCode,
          f.telephone,
          f.website,
          f.facilityType,
          f.capacity,
          CONCAT(p.firstName, ' ', p.lastName) AS 'generalManagerName',
          (SELECT COUNT(*) FROM WorksAt WHERE facilityId = f.id) AS 'numberOfEmployees',
          (SELECT COUNT(*) FROM WorksAt wa INNER JOIN Employees e ON wa.employeeId = e.id WHERE wa.facilityId = f.id AND wa.workRole = 'Doctor') AS 'numberOfDoctors',
          (SELECT COUNT(*) FROM WorksAt wa INNER JOIN Employees e ON wa.employeeId = e.id WHERE wa.facilityId = f.id AND wa.workRole = 'Nurse') AS 'numberOfNurses'
      FROM 
          Facilities f
          LEFT JOIN Employees e ON f.generalManager = e.id
          LEFT JOIN Persons p ON e.personId = p.id
      ORDER BY 
          f.province ASC, 
          f.city ASC, 
          f.facilityType ASC, 
          (SELECT COUNT(*) FROM WorksAt wa INNER JOIN Employees e ON wa.employeeId = e.id WHERE wa.facilityId = f.id AND wa.workRole = 'Doctor') ASC;
      
        `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Query#18
exports.query18 = async (req, res) => {
  try {
    const facilities = await sequelizeDB.query(
      `
  SELECT 
      f.province,
      COUNT(DISTINCT f.id) AS 'totalNumberOfFacilities',
      COUNT(DISTINCT wa.employeeId) AS 'totalNumberOfEmployees',
      SUM(CASE WHEN i.infectionDate IS NOT NULL THEN 1 ELSE 0 END) AS 'totalNumberOfCurrentlyInfectedEmployees',
      MAX(f.capacity) AS 'maxCapacity',
      SUM(TIMESTAMPDIFF(HOUR, s.startAt, s.endAt)) AS 'totalHoursScheduled'
  FROM 
      Facilities f
  LEFT JOIN 
      WorksAt wa ON f.id = wa.facilityId
  LEFT JOIN 
      Employees e ON e.id = wa.employeeId
  LEFT JOIN 
      Infected i ON e.personId = i.personId AND i.infectionType = 'COVID-19'
  LEFT JOIN 
      Scheduled s ON f.id = s.facilityId
  GROUP BY 
      f.province
  ORDER BY 
      f.province ASC;
      
        `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    res.send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single facility by ID
exports.getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Facility not found" });
    }
    res.send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Create a new facility
exports.createFacility = async (req, res) => {
  try {
    console.log(req.body);
    const facility = await Facility.create(req.body);
    res.send({ message: `Facility has been created` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Update a facility
exports.updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Facility not found" });
    }
    await facility.update(req.body);

    res.send({ message: `Facility #${req.params.id} has been updated` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Delete a facility
exports.deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: "Facility not found" });
    }
    await facility.destroy();
    res.send({ message: `Facility #${req.params.id} has been deleted` });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
