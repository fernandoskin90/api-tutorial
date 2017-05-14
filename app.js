// en este archivo estan todas las funcionalidades de express
const express = require('express')
const bodyParser = require('body-parser') // esto es un middleware

const app = express()
const api = require('./routes')
// SE USAN LOS MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
// permite peticiones en formato JSON
app.use(bodyParser.json())

// se utiza las rutas del api
app.use('/api', api)

module.exports = app
