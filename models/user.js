const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  email: {type: String, unique: true, lowecase: true},
  displayName: String,
  avatar: String,
  password: {type: String, select: false},
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

// se encripta la contraseña que ingresa el usuario
UserSchema.pre('save', (next) => {
  let user = this
  if (!user.isModified('passwor')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})


UserSchema.methods.gravatar = () => {
  // si el usuario no ha ingresado un avatar se le asigna uno por default
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
