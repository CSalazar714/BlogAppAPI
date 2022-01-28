const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    age: Number
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel