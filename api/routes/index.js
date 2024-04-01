const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const instructorRoutes = require("./instructorRoutes");
const learnerRoutes = require("./learnerRoutes");

router.use("/auth", authRoutes);
router.use("/instructor", instructorRoutes);
router.use("/learner", learnerRoutes);

module.exports = router;
