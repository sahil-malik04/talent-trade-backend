const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const instructors = require("./instructorModel");

const workshops = sequelize.define("workshops", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workshopDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workshopTimmings: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

workshops.belongsTo(instructors, {
  foreignKey: "instructorId",
  as: "instructor",
  references: {
    model: instructors,
    key: "id",
  },
});

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("workshops table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });

module.exports = workshops;
