'use strict'
const Logger = require( '../factories/logger' )
const logger = new Logger( 'UsersController' )
const { fork } = require( 'child_process' )

const saveUsers = async ( req, res ) => {
    try {
        const { name, lastname, email, roles } = req.body
        const info = req.info
        const childProcess = fork( 'src/providers/UsersProviderSave.js' )
        childProcess.send( { name, lastname, email, roles, info } )
        childProcess.on( 'message', message =>
            res.status( message.code ).send( message.body )
        )
    } catch ( err ) {
        logger.error( 'ERROR', {
            ...err, info: req.info
        } )
        return res.status( 400 ).send( {
            status : 'error',
            message: 'Ops, algo ha salido mal'
        } )
    }
}

module.exports = { saveUsers }
