const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = Blog = mongoose.model('blogs', BlogSchema)
