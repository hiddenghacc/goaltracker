const express = require("express")
const { FinishedController } = require("../controllers")
const finishedRouter = express.Router()

// middleware that is specific to this router
if (process.env.NODE_ENV === "development") {
  finishedRouter.use((req, res, next) => {
    console.log("Finished router")
    console.log("Time: ", Date.now())
    next()
  })
}

/**
 * @swagger
 * /finisheds:
 *    get:
 *      description: gets all finisheds
 *      responses:
 *        200:
 *          description: if ok then gets all finisheds
 *        400:
 *          description: if bad request
 */
finishedRouter.get("/", FinishedController.getAll)

/**
 * @swagger
 * /finisheds:
 *    get:
 *      description: gets finished by pk
 *      responses:
 *        200:
 *          description: if ok then gets finished
 *        404:
 *          description: finished not found
 */
finishedRouter.get("/:id", FinishedController.getOne)

/**
 * @swagger
 * /finisheds:
 *    post:
 *      description: creates a finished, idk
 *      responses:
 *        201:
 *          description: created
 *        400:
 *          description: bad request
 */
finishedRouter.post("/", FinishedController.createOne)

/**
 * @swagger
 * /finisheds:
 *    delete:
 *      description: deletes by pk
 *      responses:
 *        200:
 *          description: if ok then deleted
 *        400:
 *          description: something went wrong
 */
finishedRouter.delete("/:id", FinishedController.deleteOne)

/**
 * @swagger
 * /finisheds:
 *    put:
 *      description: updates a finished
 *      responses:
 *        200:
 *          description: updated
 */
finishedRouter.put("/:id", FinishedController.updateOne)

module.exports = finishedRouter
