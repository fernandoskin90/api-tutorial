const mongoose = require('mongoose')
const Schema = mongoose.Schema

// se crea el esquema(tabla) con sus datos y al final se exporta
const ProductSchema = Schema({
  name: String,
  picture: String,
  price: {type: Number, default: 0},
  category: { type: String, enum: [ 'computers', 'MTB', 'celphon' ] },
  description: String
})

// se exporta y se le pasa un nombre como primer parametro y el segundo es el esquema creado
module.exports = mongoose.model('product', ProductSchema)
