const instructors = require("../models/instructorModel");
const learners = require("../models/learnerModel");
const meetings = require("../models/meetingsModel");
const { checkEmailExist } = require("../utils/common");

module.exports = {
  getMeetingRequestsUser,
  getScheduleMeetingsUser,
  scheduleMeetingUser,
};

async function getMeetingRequestsUser(authData) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const getMeetings = await meetings.findAll({
          where: {
            instructorId: isValidUser?.id,
            isAccepted: 0,
            isMeetingCompleted: 0,
          },
          include: [
            {
              model: learners,
              as: "learner",
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        });
        if (getMeetings) {
          const sortedMeetings = getMeetings.sort(
            (x, y) => y.createdAt - x.createdAt
          );
          return resolve({ message: "Success!", data: sortedMeetings });
        }
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function getScheduleMeetingsUser(authData) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const getMeetings = await meetings.findAll({
          where: {
            isMeetingCompleted: 1,
          },
          include: [
            {
              model: learners,
              as: "learner",
              attributes: ["id", "firstName", "lastName"],
            },
            {
              model: instructors,
              as: "instructor",
              attributes: ["id", "firstName", "lastName", "email", "AOE"],
            },
          ],
        });
        if (getMeetings) {
          const sortedMeetings = getMeetings.sort(
            (x, y) => y.createdAt - x.createdAt
          );
          return resolve({ message: "Success!", data: sortedMeetings });
        }
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

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
            message: "Your request for meeting has been sent successfully!",
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
