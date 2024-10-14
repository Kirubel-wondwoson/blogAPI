const express = require('express')
const app = express()

const keys = require('./config/key')
const connectToDB = require('./config/db')

connectToDB()
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', require('./routes/user.routes'))
app.use('/api/posts', require('./routes/post.routes'))

app.listen(keys.PORT, console.log(`Server is running on port ${keys.PORT}`)) 
