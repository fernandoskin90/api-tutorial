// se define el puerto donde va a escuchar el servidor
// y la ruta dond ees ta la base de datos, si estamos en prdduccion o si estamos en desarrollo
module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB || 'mongodb://localhost/shop',
  SECRET_TOKEN: 'kiratoken'
}
