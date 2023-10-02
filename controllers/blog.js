
const blogRouter = require('express').Router()
const { Blog } = require('../model')
const { blogFinder } = require('../util/middle')

blogRouter.get('/', async (req, res) => {

    const blogs = await Blog.findAll()
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id', blogFinder, async (req, res, next) => {
    try {
        req.blog
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } catch (error) {
        next(error)
    }


})

module.exports = blogRouter
