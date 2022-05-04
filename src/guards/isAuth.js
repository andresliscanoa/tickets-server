'use strict'
if(process.env.NODE_ENV === 'develop') require('dotenv').config()
const Logger = require( '../factories/logger' )
const logger = new Logger( 'isAuth' )
const jwt = require( 'jsonwebtoken' )

module.exports = async ( req, res, next ) => {
    const token = req.header( 'Authorization' ) ? req.header( 'Authorization' ).split( ' ' )[1] : false
    const clientId = req.header( 'clientId ') ? req.header( 'clientId ') : null
    if ( token.length > 25 || clientId !== null ) {
        process.env.NODE_ENV === 'develop' ? logger.info( 'Existe el token de usuario', {
            info: {
                ...req.info,
                token
            }
        } ) : logger.info( 'Existe el token de usuario', { info: req.info } )
        await jwt.verify(token,process.env.JWT_SECRET, (err, result) => {
            if(err) {
                logger.error( 'Error en token de usuario', { ...err, info: req.info } )
                return res.status( 401 ).send( {
                    status : 'error',
                    message: 'Token corrupto o vencido'
                } )
            }
            req.info.user = result
            req.info.clientId = clientId
            return next()
        })
    } else {
        logger.warn( 'Acceso no autorizado', { info: req.info } )
        return res.status( 401 ).send( {
            status : 'warning',
            message: 'Usuario no autenticado'
        } )
    }
}
