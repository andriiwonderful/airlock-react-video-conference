const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, lowercase: true },
  link: { type: String },
  username: { type: String, unique: true },
  role: {
    type: String,
  },
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
