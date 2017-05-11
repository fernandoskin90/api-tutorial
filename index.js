const express = require('express')
const bodyParser = require('body-parser') // esto es un middleware
const mongoose = require('mongoose') // dirver para manejar las base de datos en mongo

// Se exporta el modelo creado
const Product = require('./models/product')

const app = express()
// se define el puerto donde va a escuchar el servidor
const port = process.env.PORT || 3001

// SE USAN LOS MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
// permite peticiones en formato JSON
app.use(bodyParser.json())

/* *****SE AGREGAN LAS PETICIONES************* */
/* el primer parametro es la url a la cual queremos que escuche el servidor
el segundo parametro el callbakc que recive req(peticion) y res es la respuesta
*/

/* para el req y mandar parametros se pone url ejm /hola/:parametro
app.get('/hola/:name', (req, res) => {
  // res.send({ message: 'Hola Mundo!' })
  res.send({ message: `Hola ${req.params.name}!` })
}) */

// para traer todos los elementos del Schema
app.get('/api/producto', (req, res) => {
  Product.find({}, (err, doc) => {
    if (err) {
      return res.status(500).send({message: `Error al realizar la petión: ${err}`})
    }
    if (!doc) {
      return res.status(404).send({ message: `El producto no existe: ${err}` })
    }
    res.status(200).send({ doc })
  })
})

// una ruta get para acceder a un solo producto
app.get('/api/producto/:productId', (req, res) => {
  // se captura el ID del producto
  let id = req.params.productId

  Product.find(id, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error al realizar la petión: ${err}`})
    }
    if (!product) {
      return res.status(404).send({ message: `El producto no existe: ${err}` })
    }

    res.status(200).send({ product })
  })
})

// para agregar productos
app.post('/api/producto', (req, res) => {
  // body se accede a la peticiones
  console.log('POST api/producto')
  console.log(req.body.name)

  let product = new Product(req.body)
  /* product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description */

  product.save((err, productStore) => {
    if (err) {
      res.status(500).send({ message: `Error al tratar de guardar el producto: ${err}` })
    } else {
      res.status(200).send({ product: productStore })
    }
  })
})

// actualizar los productos
app.put('/api/producto/:productId', (req, res) => {

})

// ruta para borrar productos de la base de datos
app.delete('/api/producto/:productId', (req, res) => {

})

/* mongoose.conect se conecta a la base de datos, el cual recive un url donde esta la base de datos y el nombre
y luego un callbakc
*/
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  } else {
    console.log('conexión a base de datos establecida... ')
    app.listen(port, () => {
      console.log(`API REST corriendo en http://localhost:${port}`)
    })
  }
})
