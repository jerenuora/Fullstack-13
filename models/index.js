const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Sessions = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)
User.belongsToMany(Blog, { through: Readinglist, as: 'reads' })
Blog.belongsToMany(User, { through: Readinglist, as: 'usersBlogs' })
Blog.hasMany(Readinglist)
User.hasMany(Sessions)

module.exports = {
  Blog,
  User,
  Readinglist,
  Sessions
}
