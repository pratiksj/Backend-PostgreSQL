const { Blog } = require('../model')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    response.status(500).json({ error: 'Internal server Error' })

}

module.exports = { blogFinder, errorHandler }