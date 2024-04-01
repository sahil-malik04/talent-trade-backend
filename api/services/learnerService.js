const meetings = require("../models/meetingsModel");
const learners = require("../models/learnerModel");
const { checkEmailExist } = require("../utils/common");
const instructors = require("../models/instructorModel");

module.exports = {
  scheduleMeetingUser,
};

async function scheduleMeetingUser(authData, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const data = {
          learnerId: payload.learnerId,
          instructorId: payload.instructorId,
        };
        const save = await meetings.create(data);
        if (save) {
          return resolve({
            message: "Your meeting has been scheduled successfully!",
          });
        }
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}
