const Post = require('../model/Post.model')

exports.GetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.user._id
    })
  } catch (error) {
    throw error
  }
}