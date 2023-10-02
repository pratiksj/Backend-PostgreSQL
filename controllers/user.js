const router = require('express').Router()
const bcrpt = require('bcryptjs')
const { User } = require('../model')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async (req, res) => {
    try {
        const { username, name, password } = req.body
        const saltRound = 10
        const passwordHash = await bcrpt.hash(password, saltRound)
        const user = await User.create({ username, name, passwordHash })
        console.log(user, 'user')
        res.json(user)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
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