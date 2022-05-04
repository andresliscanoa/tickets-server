'use strict'

const usersRoutes = require('../routes/UsersRoutes')

module.exports = function ( app ) {
    app.use('/api/users', usersRoutes)
}
