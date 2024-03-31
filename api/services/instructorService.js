const instructor = require("../models/instructorModel");
const student = require("../models/studentModel");
const { checkEmailExist } = require("../utils/common");

module.exports = {
  getInstructorsUser,
};

async function getInstructorsUser(authData) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructor, authData?.email);
      } else {
        isValidUser = await checkEmailExist(student, authData?.email);
      }
      if (isValidUser) {
        const getInstructors = await instructor.findAll();
        return resolve({ message: "Success!", data: getInstructors });
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}
