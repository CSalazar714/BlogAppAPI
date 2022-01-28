const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
    let token = req.get('Authorization')

    if (token === null || token === undefined) {
        res.status(403).json({ message: 'You Must Be Logged In' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
        if (error) {
            res.status(400).json({ message: "Token is not correct" })
        }
        if (result === false) {
            res.status(403).json({ message: 'You Must Be Logged In' })
        }
        next()
    })
}
function generateAccessToken(usernameToken) {
    return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s' })
}

function authenticationToken(req, res, next) {
    const token = req.get('Authorization')

    if (token === null) {
        res.status(403).json({ message: "Not Autheotized" })
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        next()
    })
}
module.exports = { verifyJWT, generateAccessToken, authenticationToken }
