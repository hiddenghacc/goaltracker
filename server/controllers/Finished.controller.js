const { Finished } = require("../models")

const getAll = async (req, res) => {
  try {
    const { date } = req.query
    let dateWhere = {}
    if (date) {
      dateWhere.date = new Date(date).toDateString()
    }
    const finisheds = await Finished.findAll({
      where: {
        ...dateWhere
      }
    })
    res.status(200).json(finisheds)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

const getOne = async (req, res) => {
  try {
    const pk = req.params.id
    const finisheds = await Finished.findByPk(pk)
    res.status(200).json(finisheds)
  } catch (err) {
    console.error(err)
    return res.sendStatus(404)
  }
}

const createOne = async (req, res) => {
  try {
    const { date, note, goalId } = req.body
    const finished = await Finished.create({ date, note, goalId })
    res.status(201).json(finished)
  } catch (err) {
    console.error(err.message)
    return res.sendStatus(400)
  }
}

const updateOne = async (req, res) => {
  try {
    const pk = req.params.id
    const { date, note, goalId } = req.body
    const finished = await Finished.update(
      { date, note, goalId },
      { where: { id: pk } }
    )
    res.status(201).json(finished)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}
const deleteOne = async (req, res) => {
  try {
    const pk = req.params.id
    const finished = await Finished.destroy({ where: { id: pk } })
    res.status(201).json(finished)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}
