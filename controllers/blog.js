
const blogRouter = require('express').Router()
const { Blog, User } = require('../model')
const { blogFinder, tokenExtrator } = require('../util/middle')

blogRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            include: {
                model: User,
                attributes: ['name']
            }
        })
        res.json(blogs)
    } catch (error) { next(error) }

})

blogRouter.post('/', tokenExtrator, async (req, res, next) => {
    try {

        const user = await User.findByPk(req.decodedToken.id)

        const blog = Blog.build({ ...req.body })
        blog.userId = user.id
        await blog.save()
        res.json(blog)

        //const blog = await Blog.create(req.body)
        //res.json(blog)
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

blogRouter.delete('/:id', tokenExtrator, blogFinder, async (req, res, next) => {
    try {
        const blogToDelete = req.blog
        if (req.blog.userId !== req.decodedToken.id) {
            res.status(404).json({ message: 'you are note authorized to delete this note' })
        }
        else {
            await blogToDelete.destroy()
            res.status(204).end()
        }

    } catch (error) { next(error) }


})

module.exports = blogRouter
