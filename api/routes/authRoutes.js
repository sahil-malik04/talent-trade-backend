const express = require("express");
const {
  studentSignUp,
  studentSignin,
  instructorSignup,
} = require("../controllers/authController");
const router = express.Router();

router.post("/student-sign-up", studentSignUp);
router.post("/instructor-sign-up", instructorSignup);

router.post("/student/sign-in", studentSignin);

module.exports = router;
