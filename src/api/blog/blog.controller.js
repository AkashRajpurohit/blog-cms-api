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
  } catch (e) {
    console.log('Error in Adding Blog: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/blog/:blog_id
 * METHOD - PATCH
 * ACCESS - Private { By the user who created this blog }
 * BODY   - { title, content, published, id }
 * DESC   - Edit a blog
 */
const editBlog = async (req, res) => {
  const { title, content, published } = req.body
  const { blog_id } = req.params

  try {
    let blog = await Blog.findById(blog_id)

    if (!blog) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(401).json(errorResponse(constants.UNAUTHORIZED))
    }

    if (title) blog.title = title
    if (content) blog.content = content
    if (published) blog.published = published

    const savedBlog = await blog.save()

    res.json(successResponse(constants.BASIC_MESSAGE, savedBlog))
  } catch (e) {
    console.log('Error in Editing Blog: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/blog/:blog_id
 * METHOD - DELETE
 * ACCESS - Private
 * BODY   - NONE
 * DESC   - Soft delete the blog -> may give option to restore deleted blog
 */
const deleteBlog = async (req, res) => {
  const { blog_id } = req.params
  try {

    let blog = await Blog.findById(blog_id)

    if (!blog) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    if (blog.author.toString() !== req.userId) {
      return res.status(401).json(errorResponse(constants.UNAUTHORIZED))
    }

    blog.active = !blog.active

    const savedBlog = await blog.save()

    res.json(successResponse(constants.BASIC_MESSAGE, savedBlog))
    
  } catch (e) {
    console.log('Error in Editing Blog: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  addBlog,
  editBlog,
  deleteBlog,
}
