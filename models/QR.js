const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const qrSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  qr: {
    type: String,
    required: true,
    default: ''
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  order: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('qr', qrSchema)