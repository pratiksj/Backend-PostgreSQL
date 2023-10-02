
const blogRouter = require('express').Router()
const { Blog } = require('../model')

blogRouter.get('/api/blogs', async (req, res) => {

    const blogs = await Blog.findAll()
    res.json(blogs)
})
