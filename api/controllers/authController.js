const {
  studentSigninUser,
  instructorSignupUser,
  studentSignUpUser,
} = require("../services/authService");

module.exports = {
  studentSignUp,
  instructorSignup,
  studentSignin,
};

async function studentSignUp(req, res) {
  try {
    const payload = req.body;
    const result = await studentSignUpUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function instructorSignup(req, res) {
  try {
    const payload = req.body;
    const result = await instructorSignupUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function studentSignin(req, res) {
  try {
    const payload = req.body;
    const result = await studentSigninUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
