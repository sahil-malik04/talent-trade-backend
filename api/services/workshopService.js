const instructors = require("../models/instructorModel");
const learners = require("../models/learnerModel");
const workshops = require("../models/workshopModel");
const { checkEmailExist } = require("../utils/common");

module.exports = {
  getWorshopsUser,
  addWorshopUser,
};

async function getWorshopsUser(authData) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const getData = await workshops.findAll();
        return resolve({ message: "Success!", data: getData });
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}

async function addWorshopUser(authData, payload) {
  return new Promise(async function (resolve, reject) {
    try {
      let isValidUser;
      if (authData?.role === 1) {
        isValidUser = await checkEmailExist(instructors, authData?.email);
      } else {
        isValidUser = await checkEmailExist(learners, authData?.email);
      }
      if (isValidUser) {
        const isWorkshopExist = await workshops.findOne({
          where: {
            instructorId: payload?.instructorId,
            workshopDate: payload?.workshopDate,
            workshopTimmings: payload?.workshopTimmings,
          },
        });
        if (isWorkshopExist) {
          return reject({
            message: "Workshop already exist on specified date and time",
          });
        } else {
          const body = {
            instructorId: payload?.instructorId,
            title: payload?.title,
            subject: payload?.subject,
            workshopDate: payload?.workshopDate,
            workshopTimmings: payload?.workshopTimmings,
          };

          const save = await workshops.create(body);
          if (save) {
            return resolve({
              message: "Workshop added successfully!",
            });
          }
        }
      } else {
        return reject({ message: "User doesn't exist" });
      }
    } catch (err) {
      return reject({ message: "Server Error! Please try again" });
    }
  });
}
