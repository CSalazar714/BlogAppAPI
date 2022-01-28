const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    blog_title: { type: String, required: true, unique: true },
    blog_content: { type: String, required: true },
    private: { type: Boolean, default: false }

})

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel