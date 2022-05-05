const { database } = require( './mongoose' )
const Logger = require( './logger' )
const logger = new Logger( 'CONNECTIONS' )

module.exports = db = ( currentDB ) => {
    logger.info( `Database selected \'${ currentDB }\'` )
    return database.useDb( currentDB, { useCache: true } )
}
