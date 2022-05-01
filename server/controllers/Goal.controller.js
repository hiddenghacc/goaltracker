const { Goal } = require("../models")

const getAll = async (_, res) => {
  try {
    const goals = await Goal.findAll()
    res.status(200).json(goals)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

const getOne = async (req, res) => {
  try {
    const pk = req.params.id
    const goals = await Goal.findByPk(pk)
    res.status(200).json(goals)
  } catch (err) {
    console.error(err)
    return res.sendStatus(404)
  }
}

const createOne = async (req, res) => {
  try {
    // console.log(req)
    // console.log(req.body)
    const { name, note } = req.body
    const goal = await Goal.create({ name, note })
    res.status(201).json(goal)
  } catch (err) {
    console.error(err.message)
    // console.log(err)
    return res.sendStatus(400)
  }
}

const updateOne = async (req, res) => {
  try {
    const pk = req.params.id
    const { name, note } = req.body
    const goal = await Goal.update({ name, note }, { where: { id: pk } })
    res.status(201).json(goal)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}
const deleteOne = async (req, res) => {
  try {
    const pk = req.params.id
    const goal = await Goal.destroy({ where: { id: pk } })
    res.status(201).json(goal)
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
