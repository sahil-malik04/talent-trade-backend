const express = require("express");
const router = express.Router();
const { getInstructors } = require("../controllers/instructorController");

router.get("/get-instructors", getInstructors);

module.exports = router;
