const { Blog } = require('../model')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === "SequelizeValidationError") {
        return response.status(400).send({ error: error.message })
    }
    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: error.message })
    }
    //response.status(500).json({ error: 'Internal server Error' })
    next(error)
}
const tokenExtrator = (req, res, next) => {
    const authorization = req.get('authorization')
    console.log(authorization, 'authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = { blogFinder, errorHandler, tokenExtrator }