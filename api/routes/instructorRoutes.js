const express = require("express");
const router = express.Router();
const {
  getInstructors,
  getInstructorById,
} = require("../controllers/instructorController");

router.get("/get-instructors", getInstructors);
router.get("/get-instructor-by-id", getInstructorById);

module.exports = router;
