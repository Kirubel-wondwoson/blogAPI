const mongoose = require('mongoose')
const config = require('./key')
const db = config.MONGODB_URL

const connectDB = async() => {
  try {
    await mongoose.connect(db)
    console.log("Succesfully Conneced!!")
  } catch (error) {
    console.log("It isn't Connected!!")
    process.exit(1)
  }
}
module.exports = connectDB