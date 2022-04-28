const express = require("express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Goal tracker",
      version: "1.0.0"
    }
  },
  apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
