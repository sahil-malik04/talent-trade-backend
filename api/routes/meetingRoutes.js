const express = require("express");
const router = express.Router();
const { getScheduleMeetings, scheduleMeeting } = require("../controllers/meetingController");

router.get("/get-scheduled-meetings", getScheduleMeetings);
router.post("/schedule-meeting", scheduleMeeting);

module.exports = router;
