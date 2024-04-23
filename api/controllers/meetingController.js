const { getScheduleMeetingsUser, scheduleMeetingUser, getMeetingRequestsUser } = require("../services/meetingService");
const { verifyAuthToken } = require("../utils/common");

module.exports = {
  getMeetingRequests,
  getScheduleMeetings,
  scheduleMeeting
};

async function getMeetingRequests(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getMeetingRequestsUser(authData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getScheduleMeetings(req, res) {
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getScheduleMeetingsUser(authData);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

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
