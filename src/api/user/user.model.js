const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    usertype: {
      type: String,
      default: 'user',
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    forgotPasswordLocked: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

module.exports = User = mongoose.model('users', UserSchema)
