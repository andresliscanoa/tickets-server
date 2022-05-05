'use strict'
if(process.env.NODE_ENV === 'develop') require('dotenv').config()
const Logger = require( '../factories/logger' )
const logger = new Logger( 'isAuth' )
const jwt = require( 'jsonwebtoken' )
const {verifyToken} = require("../helpers/tokens");

module.exports = async ( req, res, next ) => {
    const token = req.header( 'Authorization' ) ? req.header( 'Authorization' ).split( ' ' )[1] : false
    if ( token.length > 25 ) {
        process.env.NODE_ENV === 'develop' ? logger.info( 'Existe el token de usuario', {
            info: {
                ...req.info,
                token
            }
        } ) : logger.info( 'Existe el token de usuario', { info: req.info } )
        req.info.user = await verifyToken(token)
        return next()
    } else {
        logger.warn( 'Acceso no autorizado', { info: req.info } )
        return res.status( 401 ).send( {
            status : 'warning',
            message: 'Usuario no autenticado'
        } )
    }
}
