const router = require('express').Router()
const bcrpt = require('bcryptjs')
const { User, Blog, ReadingTables } = require('../model')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {

        const { username, name, password } = req.body
        const saltRound = 10
        const passwordHash = await bcrpt.hash(password, saltRound)
        const user = await User.create({ username, name, passwordHash })
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res) => {

    //const { read } = req.query;
    //const where = read === "true" || read === "false" ? { isRead: read } : {};
    let read = { [Op.in]: [true, false] };

    if (req.query.read) {
        read = req.query.read === "true";
    }
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: [''] },
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] },

            },
            {
                model: Blog,
                as: 'marked_blog',
                attributes: { exclude: ['userId'] },
                through: {
                    attributes: { exclude: ['userId', 'blogId'] },
                    where: {
                        isRead: read
                    }

                },
            },

        ],
        where: {
            read: {
                [Op.substring]: req.query.search ? req.query.search : {}
            }
        }


    })
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})



router.put('/:username', async (req, res, next) => {

    try {
        const findUser = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        findUser.username = req.body.username
        await findUser.save()

        res.json(findUser)
    } catch (error) { next(error) }



})

module.exports = router