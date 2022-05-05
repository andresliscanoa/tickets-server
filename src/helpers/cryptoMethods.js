'use strict'
const crypto = require( 'crypto' )
const Logger = require( '../factories/logger' )
const logger = new Logger( 'HELPERS-CRYPTO' )

const hash = ( { string, key, size, encoding } ) => {
    try {
        return { hash: crypto.scryptSync( Buffer.from(string,'utf8'), key, size ).toString( encoding ) }
    } catch ( err ) {
        const { message, stack } = err
        logger.error( 'Error en hash', {
            error: [ { message, stack } ]
        } )
        return { hash: '' }
    }
}
const randomHexString = size => crypto.randomBytes(size).toString('hex')

module.exports = { hash, randomHexString }
