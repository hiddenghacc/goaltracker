const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Finished tracker",
      version: "1.0.0"
    }
  },
  apis: ["app.js", "./routes/*.router.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs
