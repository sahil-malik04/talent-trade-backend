const instructors = require("../models/instructorModel");
const learners = require("../models/learnerModel");
const { checkEmailExist } = require("../utils/common");

module.exports = {
  getInstructorsUser,
};

async function getInstructorsUser(authData) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const getInstructors = await instructors.findAll();
        return resolve({ message: "Success!", data: getInstructors });
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}
