const Blog = require('./blog')
const User = require('./user')
const ReadingTables = require('./reading_table')



User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingTables, as: 'marked_blog' })
Blog.belongsToMany(User, { through: ReadingTables, as: 'users_marked' })

// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
    Blog,
    User,
    ReadingTables
}