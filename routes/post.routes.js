const express = require('express')
const {
  GetAllPublishedPost,
  GetASinglePublishedPost,
  CreateAPost,
  UpdateAPost,
  DeleteAPost
} = require('../controller/post.controller')

const {
  authenticate
} = require('../auth/user.auth')

const router = express.Router()


// api endpoint
router.post('/', authenticate, CreateAPost)
router.get('/', GetAllPublishedPost)
router.get('/:postId', GetASinglePublishedPost)
router.patch('/:postId', UpdateAPost)
router.delete('/:postId', DeleteAPost)

module.exports = router