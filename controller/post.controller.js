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

    let { firstname, lastname } = req.user
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

exports.UpdateAPost = async (req, res) => {
  const { state, body } = req.body
  try {
    const post = await Post.findByIdAndUpdate(
      req.parms.postId,
      { state, body },
      { new: true }
    )

    //check if post belongs to the user initiatin the request 
    if (post.authorId.toString() !== req.user._id) {
      return res.status(401).json({
        status: 'Fail',
        message: `You can only update a post you created!`
      });
    }

    res.status(200).json({
      status: 'success',
      post
    });
  } catch (error) {
    throw error
  }
}

exports.DeleteAPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.postId, {
      authorId: req.user.id,
    });
    if (!post) return res.status(404).json({
      status: 'Fail',
      message: 'Post with given Id not found'
    })

    if (post.authorId.toString() !== req.user.id) {
      return res.status(401).json({
        status: "Fail",
        message: `You can only delete a post you created!`,
      });
    }

    //delete post from 'posts' array in user the document
    const postByUser = await User.findById(req.user._id);
    postByUser.posts.pull(post._id);
    await postByUser.updateOne({ posts: postByUser.posts });

    //return deleted post
    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    throw err;
  }
};