'use strict'
const Logger = require( '../factories/logger' )
const logger = new Logger( 'ErrorsMiddleware' )
const { validationResult } = require( 'express-validator' )

module.exports = ( req, res, next ) => {
    const errors = validationResult( req )
    if ( !errors.isEmpty() ) {
        logger.warn( 'Error de integridad de datos', {
            error: errors.array().map( err => err ),
            info : req.info
        } )
        return res.status( 400 ).send( {
            status : 'warning',
            message: 'Error de integridad de datos',
            payload: {
                errors: errors.array().map( err => {
                    return {
                        msg  : err.msg,
                        param: err.param
                    }
                } )
            }
        } )
    }
    return next()
}
