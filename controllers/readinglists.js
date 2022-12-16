const router = require('express').Router()

const { User, Readinglist } = require('../models')

router.post('/', async (req, res) => {
    const reading = await Readinglist.create(req.body)
    res.json(reading)
})

module.exports = router
