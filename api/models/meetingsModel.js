const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const instructors = require("./instructorModel");
const learners = require("./learnerModel");


const meetings = sequelize.define("meetings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  learnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: learners,
      key: "id"
    }
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: instructors,
      key: "id"
    }
  },
});


// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("meetings table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = meetings;
