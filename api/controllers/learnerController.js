
const { scheduleMeetingUser } = require("../services/learnerService");
const { verifyAuthToken } = require("../utils/common");

module.exports = {
  scheduleMeeting,
};

async function scheduleMeeting(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const payload = req.body;
    const result = await scheduleMeetingUser(authData, payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
