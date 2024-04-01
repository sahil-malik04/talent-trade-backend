const {
  instructorSignupUser,
  learnerSignUpUser,
  forgotPasswordUser,
  setNewPasswordUser,
  signInUser,
} = require("../services/authService");

module.exports = {
  learnerSignUp,
  instructorSignup,
  signIn,
  forgotPassword,
  setNewPassword,
};

async function learnerSignUp(req, res) {
  try {
    const payload = req.body;
    const result = await learnerSignUpUser(payload);
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

async function signIn(req, res) {
  try {
    const payload = req.body;
    const result = await signInUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function forgotPassword(req, res) {
  try {
    const payload = req.query;
    const result = await forgotPasswordUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function setNewPassword(req, res) {
  try {
    const payload = req.body;
    const result = await setNewPasswordUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
