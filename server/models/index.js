const sequelize = require("../config/database")
const Goal = require("./Goal")
const Finished = require("./Finished")

// force: true if you want to remigrate tables
// ;(async function () {
//   await sequelize.sync({ force: true })
// })()

module.exports = {
  Goal,
  Finished
}
