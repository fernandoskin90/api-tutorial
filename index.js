const mongoose = require('mongoose') // dirver para manejar las base de datos en mongo

// se hace una referencia a la app
const app = require('./app')
const config = require('./config')

/* mongoose.conect se conecta a la base de datos, el cual recive un url donde esta la base de datos y el nombre
y luego un callbakc
*/
mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  } else {
    console.log('conexión a base de datos establecida... ')
    app.listen(config.port, () => {
      console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
  }
})
