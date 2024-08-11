const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  },
  theme: {
    type: String,
    required: false
  },
  image: {
    type: String,
    default: '',
    required: false
  }
})

module.exports = mongoose.model('users', userSchema)