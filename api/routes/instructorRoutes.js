const express = require("express");
const router = express.Router();
const { getInstructors } = require("../controllers/instructorController");

router.use("/get-instructors", getInstructors);

module.exports = router;
