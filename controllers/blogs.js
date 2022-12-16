const router = require('express').Router()
const {tokenExtractor} = require('../util/middleware')
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')

const { Blog, User } = require('../models')


router.get('/', async (req, res) => {
  const where = {}
  console.log(req.query.search)

  where[Op.or] = {
    title: {
      [Op.iLike]: req.query.search,
    },
    author: {
      [Op.iLike]: req.query.search,
    },
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
    where: {
      ...(req.query.search && where),
    },
    order: sequelize.literal('likes DESC'),
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  console.log(req.body)
  const user = await User.findByPk(req.decodedToken.id)

  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog) {
    if (req.blog.userId === user.id) {
      await req.blog.destroy()
    } else {
      res.status(400).end()
    }
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
  res.status(404).end()
})

module.exports = router
