const { Blog } = require('../model')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === "SequelizeValidationError") {
        return response.status(400).send({ error: error.message })
    }
    //response.status(500).json({ error: 'Internal server Error' })
    next(error)
}

module.exports = { blogFinder, errorHandler }