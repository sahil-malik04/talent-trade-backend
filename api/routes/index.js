const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const instructorRoutes = require("./instructorRoutes");
const learnerRoutes = require("./learnerRoutes");
const meetingRoutes = require("./meetingRoutes");

router.use("/auth", authRoutes);
router.use("/instructor", instructorRoutes);
// router.use("/learner", learnerRoutes);
router.use("/meeting", meetingRoutes);

module.exports = router;
