const Mongoose = require("mongoose")
const pollSchema = new Mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options:[{
    value: { type: String, required: true, trim: true },
    count: { type: Number, required: true, trim: true },
  }],
  code:{
    type: String,
    required: true
  },
  sub:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }, 
  response:[{
    user: { type: String, trim: true },
    choice: { type: String, trim: true },
  }],
  report:{
    type: Boolean,
    default: false
  }, 
})

module.exports = Mongoose.models.Polls || Mongoose.model('Polls',pollSchema)
