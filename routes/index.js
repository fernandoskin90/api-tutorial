const express = require('express')
// se requiere el contralador para las funciones del producto
const ProductCtrl = require('../controllers/product')
const api = express.Router()

// para traer todos los elementos del Schema
api.get('/producto', ProductCtrl.getProducts)
// una ruta get para acceder a un solo producto
api.get('/producto/:productId', ProductCtrl.getProductId)
// para agregar productos
api.post('/producto', ProductCtrl.createProduct)
// actualizar los productos
api.put('/producto/:productId', ProductCtrl.upDateProducts)
// ruta para borrar productos de la base de datos
api.delete('/producto/:productId', ProductCtrl.deleteProduct)

module.exports = api
