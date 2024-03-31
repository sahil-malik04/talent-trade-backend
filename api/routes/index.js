const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const instructorRoutes = require("./instructorRoutes");

router.use("/auth", authRoutes);
router.use("/instructor", instructorRoutes);

module.exports = router;
