const express = require("express");
const {
  studentSignUp,
  signIn,
  instructorSignup,
  forgotPassword,
  setNewPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/student-sign-up", studentSignUp);
router.post("/instructor-sign-up", instructorSignup);
router.post("/sign-in", signIn);
router.post("/forgot-password", forgotPassword);
router.patch("/set-new-password", setNewPassword);

module.exports = router;
