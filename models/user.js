const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: { unique: true }
  },
  name: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('user', schema, 'users')
