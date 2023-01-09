const Mongoose = require("mongoose")
const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  empid: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
})

module.exports = Mongoose.models.User || Mongoose.model('User',userSchema)
