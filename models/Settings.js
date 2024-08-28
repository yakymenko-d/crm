const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  restaurantName: {
    type: String,
    required: true,
    default: ''
  },
  image: {
    type: String,
    default: '',
    required: false
  },
  mainColor: {
    type: String,
    default: '#000',
    required: false
  },
  secondaryColor: {
    type: String,
    default: '#000',
    required: false
  },
})

module.exports = mongoose.model('settings', settingsSchema)