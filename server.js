const express = require('express')
const app = express()

const keys = require('./config/key')
const connectToDB = require('./config/db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(keys.PORT, console.log(`Server is running on port ${keys.PORT}`))
