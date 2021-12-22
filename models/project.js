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
  },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: []
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('project', schema, 'projects')
