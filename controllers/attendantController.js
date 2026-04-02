const Attendant = require("../models/Attendant");

// CREATE
exports.createAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json(attendant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.json(attendants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};