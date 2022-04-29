'use strict'

const tokenRoutes = require('../routes/Tokens')

module.exports = function ( app ) {
    app.use('/api/tokens', tokenRoutes)
}
