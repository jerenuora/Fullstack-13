const router = require('express').Router()

const { User, Sessions } = require('../models')

const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const session = await Sessions.destroy({ where: { userId: user.id } })

  if (session) {
    res.status(200).end()
  }
  res.status(204).end()
})

module.exports = router
