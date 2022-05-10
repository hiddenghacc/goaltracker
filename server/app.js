const express = require("express")
const swaggerUI = require("swagger-ui-express")
const app = express()

const swaggerDocs = require("./config/swagger")

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// cors
const cors = require("cors")
const CORSenv = process.env.CORS || "*"
app.use(cors())

// requiring models so I can use sync
const models = require("./models")

app.use(express.json())

/**
 * @swagger
 * /elvise:
 *   get:
 *     description: says if Elvis is still alive
 *     responses:
 *       200:
 *         description: 200 if Elvis is alive
 */
app.get("/elvise", (_, res) => {
  res.send("Ziv sam").status(200)
})

// require routes
const { goalRouter } = require("./routes")
app.use("/goals", goalRouter)
const { finishedRouter } = require("./routes")
app.use("/finished", finishedRouter)

const PORT = process.env.PORT || 5000
// TODO: set up cors
const CORS = process.env.CORS || "*"

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
