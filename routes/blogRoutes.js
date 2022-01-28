const express = require('express')
const jwt = require('../middleware/jwt')
const Blog = require('../schema/blogSchema')

const blogRoute = express.Router()

blogRoute.get('/', jwt.authenticationToken, (req, res) => {

    Blog.find({ private: false }, (error, blogs) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        res.status(200).json({ message: blogs })
    })
})

blogRoute.get('/:username', jwt.authenticationToken, (req, res) => {
    let username = req.params.username

    Blog.find({ username: username, private: false }, (error, blogs) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        if ({ private: true }) {
            username: username == username
        }
        res.status(200).json({ message: blogs })
    })
})



blogRoute.post('/:username', jwt.authenticationToken, (req, res) => {
    let username = req.params.username
    let blogpost = req.body
    blogpost.created_by = username
    blogpost.created_at = Date.now()

    Blog.create(blogpost, (error, blogs) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        res.status(200).json({ message: blogs })
    })
})

blogRoute.get('/:id', jwt.authenticationToken, (req, res) => {
    let id = req.params.id

    Blog.findbyId(id, (error, blogs) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        res.status(200).json({ message: blogs })
    })

})

blogRoute.put('/:id', jwt.authenticationToken, (req, res) => {
    let id = req.params.id
    let newBlog = req.body

    Blog.findbyIdAndUpdate(id, newBlog, (error, blogs) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        res.status(200).json({ message: blogs })
    })

})

blogRoute.delete('/:id', jwt.authenticationToken, (req, res) => {
    let id = req.params.id
    let newBlog = req.body

    Blog.findbyIdAndDelete(id, (error) => {
        if (error) {
            res.status(400).json({ message: error.message })
        }
        res.status(204).json({ message: "Deleted" })
    })

})

module.exports = blogRoute