const classes = require('./classes')
const expressmid = require('./expressmid')

exp = module.exports = classes.AltSource

// Express Middleware
exp.middleware = expressmid

// Classes
exp.App = classes.App
exp.AppVersion = classes.AppVersion
exp.AppPermission = classes.AppPermission
exp.NewsItem = classes.NewsItem