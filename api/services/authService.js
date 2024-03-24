const instructor = require("../models/instructorModel");
const student = require("../models/studentModel");
const { decryptPassword, checkEmailExist } = require("../utils/common");

module.exports = {
  studentSignUpUser,
  studentSigninUser,
  instructorSignupUser,
};

async function studentSignUpUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);
      
      if (isSEmailExist || isIEmailExist) {
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
          role: 2,
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

async function instructorSignupUser(payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (isSEmailExist || isIEmailExist) {
        return reject({ message: "Email already exist!" });
      } else {
        const data = {
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email,
          password: payload?.password,
          gender: payload?.gender,
          YOE: payload?.YOE,
          industry: payload?.industry,
          AOE: payload?.AOE,
          role: 1,
        };
        const save = await instructor.create(data);
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
      const isSEmailExist = await checkEmailExist(student, payload?.email);
      const isIEmailExist = await checkEmailExist(instructor, payload?.email);

      if (!isSEmailExist && !isIEmailExist) {
        return reject({ message: "Email doesn't exist!" });
      } else {
        const decryptPayloadPassword = decryptPassword(payload.password);
        let existPassword;
        if (isSEmailExist) {
          existPassword = isSEmailExist.password;
        } else {
          existPassword = isIEmailExist.password;
        }
        if (existPassword === decryptPayloadPassword) {
          return resolve({ message: "Login success!" });
        } else {
          return reject({ message: "Incorrect password" });
        }
      }
    } catch (err) {}
  });
}
