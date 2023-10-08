const authorRouter = require('express').Router()
const { Op, fn, col } = require('sequelize')

const { Blog } = require('../model')


authorRouter.get('/', async (req, res, next) => {
    try {
        const result = await Blog.findAll({
            attributes: [
                [fn('COUNT', col('title')), 'articles'],
                [fn('SUM', col('likes')), 'likes'], 'author'

            ],
            group: ['author'],
            order: [['likes', 'DESC']]

        })

        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = authorRouter