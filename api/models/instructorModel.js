const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const instructor = sequelize.define("instructors", {
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
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: false,
  },
  YOE: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  industry: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  AOE: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// sequelize.sync({force: false}).then(() => {
//     console.log('instructor table created successfully.');
//   })
//   .catch(err => {
//     console.error('Error creating students table:', err);
//   });

module.exports = instructor;
