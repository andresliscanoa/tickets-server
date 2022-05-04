'use strict'
const { database } = require( './mongoose' )
if ( process.env.NODE_ENV === 'develop' ) require( 'dotenv' ).config()
const Logger = require( './logger' )
const logger = new Logger( 'CONNECTIONS' )

const db = () => {
    logger.info( `Database selected \'${ process.env.MONGO_DB }\'` )
    return database.useDb( process.env.MONGO_DB, { useCache: true } )
}

module.exports = db
