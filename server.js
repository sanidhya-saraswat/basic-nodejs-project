const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv=require('dotenv')
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

//setting up swagger documentation for APIs. Accessible at /docs path.
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./controllers/*.js']
}
const optionsCSSSwagger = {
  customCss: '.swagger-ui .topbar { display: none }'
}

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const swaggerSpec = swaggerJsdoc(options)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, optionsCSSSwagger))

// connecting to mongodb 
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to db')
  })
  .catch((err) => {
    console.log('Error connecting to db:', err)
  })

// getting the routes
const routes = require('./routes')
app.use(routes)

module.exports=app