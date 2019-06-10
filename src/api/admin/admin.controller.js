const User = require('../user/user.model')
const Blog = require('../blog/blog.model')

const successResponse = require('../../utils/successResponse')
const errorResponse = require('../../utils/errorResponse')

const constants = require('../../utils/constants')

/*
 * ROUTE  - /api/v1/admin/get-users
 * METHOD - GET
 * ACCESS - Private
 * BODY   - None
 * DESC   - View all details of the user like email, username, usertype, createdAt, updatedAt
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      'username email usertype createdAt updatedAt'
    )

    if (!users) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    res.json(successResponse(constants.BASIC_MESSAGE, users))
  } catch (e) {
    console.log('Error in fetching details by admin: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/admin/user/:user_id
 * METHOD - DELETE
 * ACCESS - Private
 * BODY   - NONE
 * DESC   - Delete a user account -> Allow admin to either keep this users blog or delete them as well by sending a ``` blogs ``` key in body with boolean value
 */
const deleteUser = async (req, res) => {
  const { user_id } = req.params
  try {
    const user = await User.findByIdAndDelete(user_id)

    if (!user) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    if (req.body.blogs) {
      const removedBlogs = await Blog.find({ author: user_id.toString() })
      const promises = []
      removedBlogs.map(blog => {
        const promise = Blog.findOneAndDelete({ _id: blog._id.toString() })
        promises.push(promise)
      })
      await Promise.all(promises)
    }

    res.json(successResponse(constants.BASIC_MESSAGE, user))
  } catch (e) {
    console.log('Error in deleting user by admin: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/admin/blog/:blog_id
 * METHOD - PATCH
 * ACCESS - Private
 * BODY   - { title, content, published }
 * DESC   - Edit a blog created by any user
 */
const editBlog = async (req, res) => {
  const { title, content, published, active } = req.body
  const { blog_id } = req.params

  try {
    let blog = await Blog.findById(blog_id)

    if (!blog) {
      return res.status(404).json(errorResponse(constants.ERROR_404))
    }

    if (title) blog.title = title
    if (content) blog.content = content
    if (published) blog.published = published
    blog.active = !!active

    const savedBlog = await blog.save()

    res.json(successResponse(constants.BASIC_MESSAGE, savedBlog))
  } catch (e) {
    console.log('Error in Editing Blog by admin: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

/*
 * ROUTE  - /api/v1/admin/blog/:blog_id
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

    blog.active = !blog.active

    const savedBlog = await blog.save()

    res.json(successResponse(constants.BASIC_MESSAGE, savedBlog))
  } catch (e) {
    console.log('Error in Editing Blog: ', e)
    res.status(500).json(errorResponse(constants.SERVER_ERROR))
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  editBlog,
  deleteBlog,
}
