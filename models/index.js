const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'reads' })
Blog.belongsToMany(User, { through: Readinglist, as: 'usersBlogs' })

module.exports = {
  Blog,
  User,
  Readinglist
}
