const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Goal = sequelize.define(
  "Goal",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING
    }
  },
  {
    // Other model options go here
  }
)

module.exports = Goal
