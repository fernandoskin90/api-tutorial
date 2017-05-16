const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
  const payload = {
    // id debe ser != del de la base de datos
    sub: user._id,
    // fecha de creacion del token
    iat: moment().unix(),
    // fecha en que expira el token
    exp: moment().add(2, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

module.exports = createToken
