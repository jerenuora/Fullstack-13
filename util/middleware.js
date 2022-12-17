const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { Sessions, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      
      const session = await Sessions.findOne({where: {token: authorization.substring(7)}})
      console.log("session.userId", session.userId)
      const user = await User.findByPk(session.userId)
      if (user.disabled) {
        await Sessions.destroy({ where: { userId: user.id } })

        return res.status(401).json({ error: 'user disabled' })

      }
      console.log("user", user )
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error)
    if (error.name === 'SequelizeValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).json({ error: error.message })
      }
    
    next(error)
  }
  
  module.exports = {
    errorHandler,
    tokenExtractor
  }
  