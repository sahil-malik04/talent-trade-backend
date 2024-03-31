const { getInstructorsUser } = require("../services/instructorService");
const { verifyAuthToken } = require("../utils/common");

module.exports = {
  getInstructors,
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
