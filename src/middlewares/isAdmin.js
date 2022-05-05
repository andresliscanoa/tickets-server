'use strict'
const Logger = require('../factories/logger')
const logger = new Logger('isAdmin')

module.exports = (req, res, next) => {
    const user = req.info.user
    if (user.roles.includes("ADMIN")) return next()
    logger.warn('NO ES USUARIO ADMINISTRADOR', { info: req.info})
    return res.status(403).send({
        status: 'warning',
        message: 'Unauthorized user'
    })
}