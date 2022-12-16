const router = require('express').Router()
const {tokenExtractor} = require('../util/middleware')

const { User, Readinglist } = require('../models')

router.post('/', async (req, res) => {
    const reading = await Readinglist.create(req.body)
    res.json(reading)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const reading = await Readinglist.findByPk(req.params.id)
    const user = await User.findByPk(req.decodedToken.id)

    if (reading.userId === user.id) {
      reading.read = req.body.read
      await reading.save()
      res.json(reading)
    } else {
      res.status(400).end()
    }
  })
  
module.exports = router
