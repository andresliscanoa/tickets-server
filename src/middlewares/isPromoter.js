'use strict'
const Logger = require( '../factories/logger' )
const logger = new Logger( 'isPromoter' )

module.exports = (req,res, next) => {
    const user = req.info.user
    const clientId = req.info.clientId
    try {
        const tenant = user.tenants.find(tenant => tenant.application === clientId )
        if(tenant.roles.includes("PROMOTER")) return next()
    } catch (error) {
        logger.error( 'ERROR AL VALIDAR EL ACCESO DEL USUARIO', {
            ...error, info: req.info
        } )
        return res.status( 400 ).send( {
            status : 'error',
            message: 'Ops, algo ha salido mal'
        } )
    }
}