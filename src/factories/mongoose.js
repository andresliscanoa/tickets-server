'use strict'
if(process.env.NODE_ENV === 'develop' ) require( 'dotenv' ).config()
const Logger = require( '../factories/logger' )
const logger = new Logger( 'MONGOOSE' )
const mongoose = require( 'mongoose' )
const db_options = {
    useNewUrlParser      : true,
    useUnifiedTopology   : true,
    maxPoolSize          : 10,
    minPoolSize          : 1,
    family               : 4,
    w                    : 3,
    keepAlive            : true,
    keepAliveInitialDelay: 300000
}
const db = mongoose.createConnection(
    process.env.MONGO_URI,
    db_options
)

db.on( 'open', () => logger.info( `Mongoose successfully connected to database \'${ process.env.MONGO_DB }\'` ) )
db.on( 'disconnecting', () => logger.info( `Mongoose closing connection to database \'${ process.env.MONGO_DB }\'` ) )
db.on( 'close', () => logger.info( `Mongoose connection closed to database \'${ process.env.MONGO_DB }\'` ) )
db.on( 'error', async err => {
    const { message, stack } = err
    logger.error( `Mongoose connection error on database \'${ process.env.MONGO_DB }\'`, {
        error: [ {
            message,
            stack
        } ]
    } )
} )
process.on( 'SIGINT', () => db.close() )
module.exports.database = db
