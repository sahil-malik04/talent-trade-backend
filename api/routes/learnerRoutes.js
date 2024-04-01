const express = require("express");
const router = express.Router();
const { scheduleMeeting } = require("../controllers/learnerController");


router.post("/schedule-meeting", scheduleMeeting);

module.exports = router;
