const express = require('express')
const authRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../schema/userSchema')
const { verifyJWT } = require('../middleware/jwt')

authRouter.post('/register', async (req, res) => {
    let user = req.body
    let password = user.password
    let username = req.body.username
    let salt = Number(process.env.SALT)

    // if (!password || !user.username) {
    //     res.status(400).json({ message: "Please make sure you have a Username And Password" })
    // }

    let hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword

    User.create(user, (error, result) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        if (result === undefined || null) {
            res.status(400).json({ message: "Please make a unique user" })
        }
        let token = jwt.sign(username, process.env.JWT_SECRET)
        res.setHeader('Authorization', token)
        res.status(200).json({ data: result })
    })
})

authRouter.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!password || !username) {
        res.status(400).json({ message: "Please make sure you have a Username And Password" })
    }

    User.findOne({ username: username }, (error, result) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        if (result === null || result === undefined) {
            res.status(404).json({ message: "User Not Found" })
        }
        bcrypt.compare(password, result.password, (error, matching) => {
            if (matching === false) {
                res.status(403).json({ message: "Either username or password is incorrect" })
            }
            let token = jwt.sign(username, process.env.JWT_SECRET)
            res.setHeader('Authorization', token)
            res.status(200).json({ data: result })
        })
    })
})

authRouter.get('/', verifyJWT, (req, res) => {
    User.find((error, result) => {
        if (error) {
            res.status(404).json({ message: error.message })
        }
        if (result === null || result === undefined || result === []) {
            res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json({ data: result })
    })
})
module.exports = authRouter
