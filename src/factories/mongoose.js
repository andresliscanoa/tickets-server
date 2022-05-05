'use strict'
if(process.env.NODE_ENV === 'develop' ) require( 'dotenv' ).config()
const mongoose = require( 'mongoose' )
const Logger = require( '../factories/logger' )
const logger = new Logger( 'MONGOOSE' )
const db_options = {
    useNewUrlParser      : true,
    useUnifiedTopology   : true,
    maxPoolSize          : 10,
    minPoolSize          : 1,
    family               : 4,
    w: process.env.NODE_ENV !== 'develop' ? 3 : 1,
    keepAlive            : true,
    keepAliveInitialDelay: 300000
}
const db = mongoose.createConnection(
    process.env.MONGO_URI,
    db_options
)
db.on( 'disconnecting', () => logger.info( `Mongoose closing connection ` ) )
db.on( 'close', () => logger.info( `Mongoose connection closed` ) )
db.on( 'error', err => {
    logger.error( `Mongoose connection error`, { err } )
} )
process.on( 'SIGINT', () => db.close() )
module.exports = db

