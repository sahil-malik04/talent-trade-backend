const express = require("express");
const router = express.Router();
const {
  studentSignUp,
  studentSignin,
} = require("../controllers/studentController");

router.post("/student-sign-up", studentSignUp);
router.post("/student/sign-in", studentSignin);

module.exports = router;
