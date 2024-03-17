const {
  studentSignUpUser,
  studentSigninUser,
} = require("../services/studentService");

module.exports = {
  studentSignUp,
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

async function studentSignin(req, res) {
  try {
    const payload = req.body;
    const result = await studentSigninUser(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
}
