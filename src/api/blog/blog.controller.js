const Blog = require('./blog.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

/*
 * ROUTE  - /api/v1/blog/
 * METHOD - POST
 * ACCESS - Private { By normal users and admins }
 * BODY   - { title, content, published }
 * DESC   - Add a new blog for a authenticated user
 */
const addBlog = async (req, res) => {
  const { title, content, published } = req.body

  try {
    const blog = new Blog({
      author: req.userId,
      title,
      content,
      published,
    })

    const newBlog = await blog.save()

    res.json(successResponse(constants.BASIC_MESSAGE, newBlog))
  } catch (error) {
    console.log('Error in Adding Blog: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  addBlog,
}
