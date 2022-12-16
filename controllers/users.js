const router = require('express').Router()
const { Op } = require('sequelize')

const { User, Blog, Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'reads',
      attributes: { exclude: ['userId'] },
      through: {
        attributes: [],
      },
      include: {
        model: Readinglist,
        attributes: ['read','id'],
        where: {user_id: req.params.id},
      }

    },
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
