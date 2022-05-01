const { DataTypes } = require("sequelize")
const Goal = require("./Goal")
const sequelize = require("../config/database")

const Finished = sequelize.define(
  "Finished",
  {
    date: {
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

Finished.belongsTo(Goal, {
  foreignKey: "goalId"
})

module.exports = Finished
