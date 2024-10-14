const express = require('express')

const {
  GetAllPosts
} = require('../controller/user.controller')
const {
  signup,
  login,
  authenticate
} = require('../auth/user.auth')

const router = express.Router()

router.post('/author', authenticate, GetAllPosts)

router.post('/auth/signup', signup)
router.post('/auth/login', login)

module.exports = router
