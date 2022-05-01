const express = require("express")
const { GoalController } = require("../controllers")
const goalRouter = express.Router()

// middleware that is specific to this router
if (process.env.NODE_ENV === "development") {
  goalRouter.use((req, res, next) => {
    console.log("Goal router")
    console.log("Time: ", Date.now())
    next()
  })
}

/**
 * @swagger
 * /goals:
 *    get:
 *      description: gets all goals
 *      responses:
 *        200:
 *          description: if ok then gets all goals
 *        400:
 *          description: if bad request
 */
goalRouter.get("/", GoalController.getAll)

/**
 * @swagger
 * /goals:
 *    get:
 *      description: gets goal by pk
 *      responses:
 *        200:
 *          description: if ok then gets goal
 *        404:
 *          description: goal not found
 */
goalRouter.get("/:id", GoalController.getOne)

/**
 * @swagger
 * /goals:
 *    post:
 *      description: creates a goal, idk
 *      responses:
 *        201:
 *          description: created
 *        400:
 *          description: bad request
 */
goalRouter.post("/", GoalController.createOne)

/**
 * @swagger
 * /goals:
 *    delete:
 *      description: deletes by pk
 *      responses:
 *        200:
 *          description: if ok then deleted
 *        400:
 *          description: something went wrong
 */
goalRouter.delete("/:id", GoalController.deleteOne)

/**
 * @swagger
 * /goals:
 *    put:
 *      description: updates a goal
 *      responses:
 *        200:
 *          description: updated
 */
goalRouter.put("/:id", GoalController.updateOne)

module.exports = goalRouter
