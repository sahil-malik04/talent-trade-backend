const student = require("../models/studentModel");

module.exports = {
  studentSignUpUser,
  studentSigninUser,
};

async function studentSignUpUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isEmailExist = await student.findOne({
        where: {
          email: payload?.email,
        },
      });
      if (isEmailExist) {
        return reject({ message: "Email already exist!" });
      } else {
        const data = {
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email.toLowerCase(),
          password: payload?.password,
          industry: payload?.industry,
          branch: payload?.branch,
          preferredLearning: payload?.preferredLearning,
          preferredTimeFrom: payload?.preferredTimeFrom,
          preferredTimeTo: payload?.preferredTimeTo,
        };
        const save = await student.create(data);

        if (save) {
          return resolve({
            message: "Account registered successfully",
          });
        }
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function studentSigninUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isEmailExist = await student.findOne({
        where: {
          email: payload?.email,
        },
      });

      if (!isEmailExist) {
        return reject({ message: "Email doesn't exist!" });
      } else {
        if(isEmailExist?.password === payload.password){
          return resolve({message: "Login success!"})
        }else{
          return reject({message: "Incorrect password"})
        }
      }
    } catch (err) {}
  });
}
