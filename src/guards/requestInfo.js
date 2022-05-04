'use strict'
const requestIp = require( 'request-ip' )

const requestInfo = async ( req, res, next ) => {
    req.info = {
        origin    : req.headers.origin,
        host      : req.headers.host,
        protocol  : req.secure ? 'https' : 'http',
        user_agent: req.get( 'User-Agent' ),
        url       : req.url,
        ip        : requestIp.getClientIp( req )
    }
    next()
}
module.exports = { requestInfo }
