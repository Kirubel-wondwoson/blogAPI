const Post = require('../model/Post.model')
const User = require('../model/User.model')
// Post 
exports.GetAllPublishedPost = async (req, res) => {
  try {
    const posts = await Post.find({ state: "published" })
    res.status(200).json({
      status: "success",
      posts
    })
  } catch (error) {
    throw error
  }
}

exports.GetASinglePublishedPost = async (req, res) => {
  try {
    const postId = req.parms.postId
    const post = await Post.findById(postId)
      .where('state')
      .eq('published')

    if (!post) {
      return res.status(404).json({
        state: 'Failed',
        message: 'Post not found'
      })
    } else {
      post.readCount === 0 ? post.readCount++ : post.readCount++
      await post.save()
    }
    res.status(200).json({
      state: "sucess",
      post
    })
  } catch (error) {
    throw error
  }
}

exports.CreateAPost = async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      body,
    } = req.body

    //calculate read time of post from the body passed in
    const wpm = 225; //wpm => word per minute
    const numberOfWords = body.trim().split(/\s+/).length;
    const readTime = Math.ceil(numberOfWords / wpm);

    let {firstname, lastname} = req.user
    let author = `${firstname} ${lastname}`
    let authorId = req.user._id
  
    const post = new Post({
      title,
      description,
      tags,
      author,
      authorId,
      body,
      readTime
    })

    let user = await User.findById(req.user_id)
    user.posts.push(post._id)
    await post.save()

    res.status(201).json({
      state: 'success',
      post
    })
  } catch (error) {
    throw error
  }
}

