
const mongoose = require('mongoose');


const MovieSchema = mongoose.Schema({
  id: {
    type: Number,

  },

  title: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true,
    min: 1888,

  },

  rating: {
    type: Number,

  }

})

module.exports = mongoose.model(`table5`, MovieSchema);