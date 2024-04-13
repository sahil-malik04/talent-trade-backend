const {
  getInstructorsUser,
  getInstructorByIdUser,
} = require("../services/instructorService");
const { verifyAuthToken } = require("../utils/common");

module.exports = {
  getInstructors,
  getInstructorById,
};

async function getInstructors(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getInstructorsUser(authData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getInstructorById(req, res) {
  const params = req.query;
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getInstructorByIdUser(authData, params);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
