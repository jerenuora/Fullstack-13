const router = require('express').Router()
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')

const { Blog, User } = require('../models')



router.get('/', async (req, res) => {
    const where = {}
  
    if (req.query.search) {
      where.title = {
        [Op.iLike]: req.query.search
      },
      where.author = {
        [Op.iLike]: req.query.search
      }
    }
  
    const blogs = await Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
      ]
    })
    
    
    
  
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
  })
  



module.exports = router
