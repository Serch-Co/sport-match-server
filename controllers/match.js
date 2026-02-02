const Match = require("../models/match");

const createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const readAllMatches = async (req, res) => {
  try {
    const matches = await Match.find({});
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const readMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      res.status(500).json({ message: "Match was not found" });
    }
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(id, req.body);
    // Check if match exists
    if (!match) {
      res.status(500).json({ message: "Match was not found" });
    }
    const newMatch = await Match.findById(id);
    res.status(200).json(newMatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndDelete(id);
    // Check if match exists
    if (!match) {
      res
        .status(500)
        .json({ message: "Match was not deleted since it was not found" });
    }
    const newMatch = await Match.findById(id);
    if (!newMatch) {
      res.status(200).json({ message: "Match deleted successfully" });
    }
    res.status(500).json({ message: "Match was not  deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMatch,
  readAllMatches,
  readMatch,
  updateMatch,
  deleteMatch,
};
