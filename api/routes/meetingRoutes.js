const express = require("express");
const router = express.Router();
const {
  getScheduleMeetings,
  scheduleMeeting,
  getMeetingRequests,
} = require("../controllers/meetingController");

router.get("/get-meeting-requests", getMeetingRequests);
router.get("/get-scheduled-meetings", getScheduleMeetings);
router.post("/schedule-meeting", scheduleMeeting);

module.exports = router;
