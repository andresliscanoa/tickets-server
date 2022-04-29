'use strict'
if(process.env.NODE_ENV === 'develop') require( 'dotenv' ).config()
const cluster = require( 'cluster' )
const os = require( 'os' )
const Logger = require( './src/factories/logger' )
const logger = new Logger( 'EXPRESS' )
const cpu = os.cpus().length
const port = process.env.PORT || 3000
const app = require( './src/factories/express' )
try {
    if ( cluster.isPrimary ) {
        for ( let i = 0; i < cpu; i++ ) {
            cluster.fork()
        }
        cluster.on( 'exit', ( worker, code, signal ) => {
            logger.warn(`WORKER ${worker.process.pid} DIED`)
            cluster.fork()
        } )
    } else {
        require( './src/factories/mongoose' )
        app.listen( port, () => {
            logger.info( `WORKER SERVER PID ${ process.pid } LISTENING ON PORT: ${ port }` )
        } )
        require( './src/factories/routes' )( app )
    }
} catch ( error ) {
    logger.error( 'SERVER ERROR', { error } )
}