const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const student = sequelize.define("students", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  branch: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  preferredLearning: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferredTimeFrom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferredTimeTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// sequelize.sync()
//   .then(() => {
//     console.log('Students table created successfully.');
//   })
//   .catch(err => {
//     console.error('Error creating students table:', err);
//   });

module.exports = student;
