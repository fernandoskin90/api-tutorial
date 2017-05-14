// Se exporta el modelo creado
const Product = require('../models/product')

/* *****SE AGREGAN LAS PETICIONES************* */
/* el primer parametro es la url a la cual queremos que escuche el servidor
el segundo parametro el callbakc que recive req(peticion) y res es la respuesta
*/

/* para el req y mandar parametros se pone url ejm /hola/:parametro
app.get('/hola/:name', (req, res) => {
  // res.send({ message: 'Hola Mundo!' })
  res.send({ message: `Hola ${req.params.name}!` })
}) */

function getProductId (req, res) {
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
}

function getProducts (req, res) {
  Product.find({}, (err, doc) => {
    if (err) {
      return res.status(500).send({message: `Error al realizar la petión: ${err}`})
    }
    if (!doc) {
      return res.status(404).send({ message: `El producto no existe: ${err}` })
    }
    res.status(200).send({ doc })
  })
}

function createProduct (req, res) {
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
}

function upDateProducts (req, res) {
  // se captura el ID del producto
  let id = req.params.productId
  // se captura el producto a actualizar, objento con los campos a actualizar
  let upDate = req.body

  Product.findByIdAndUpdate(id, upDate, (err, productUpdated) => {
    if (err) {
      res.status(500).send({ message: `Error al tratar de actuaziar  el producto: ${err}` })
    }
    res.status(200).send({product: productUpdated})
  })
}

function deleteProduct (req, res) {
   // se captura el ID del producto
  let id = req.params.productId

  Product.findById(id, (error, product) => {
    if (error) {
      res.status(500).send({ message: `Error al tratar de borrar el producto: ${error}` })
    }
    product.remove(err => {
      if (err) {
        res.status(500).send({ message: `Error al tratar de borrar el producto: ${err}` })
      }
      res.status(200).send({ message: `El producto ha sido eiminado` })
    })
  })
}

module.exports = {
  getProductId,
  getProducts,
  upDateProducts,
  deleteProduct,
  createProduct
}
