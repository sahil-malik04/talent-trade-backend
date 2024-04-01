const express = require("express");
const {
  learnerSignUp,
  signIn,
  instructorSignup,
  forgotPassword,
  setNewPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/learner-sign-up", learnerSignUp);
router.post("/instructor-sign-up", instructorSignup);
router.post("/sign-in", signIn);
router.post("/forgot-password", forgotPassword);
router.patch("/set-new-password", setNewPassword);

module.exports = router;
