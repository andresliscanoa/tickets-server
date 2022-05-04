'use strict'
const Logger = require( '../factories/logger' )
const logger = new Logger( 'UsersController' )
const { fork } = require( 'child_process' )

const saveUsers = async ( req, res ) => {
    try {
        const { name, lastname, email, roles } = req.body
        const info = req.info
        const childProcess = fork( 'src/providers/CreateUsersProvider.js' )
        childProcess.send( { name, lastname, email, roles, info } )
        childProcess.on( 'message', message =>
            res.status( message.code ).send( message.body )
        )
    } catch ( err ) {
        logger.error( 'Ha ocurrido un error al crear el usuario', {
            ...err, info: req.info
        } )
        return res.status( 400 ).send( {
            status : 'error',
            message: 'Ops, algo ha salido mal'
        } )
    }
}

const updateUserById = async ( req, res ) => {
    try {
        const info = req.info
        const { id } = req.params
        const { name, lastname, gender, telephone, picture, email } = req.body
        const childProcess = fork('src/providers/UpdateUserByIdProvider.js')
        childProcess.send( { id, name, lastname, gender, telephone, picture, email, info } )
        childProcess.on( 'message', message =>
            res.status( message.code ).send( message.body )
        )
    } catch ( err ) {
        logger.error( 'Ha ocurrido un error al actualizar los datos del usuario', {
            ...err, info: req.info
        } )
        return res.status( 400 ).send( {
            status : 'error',
            message: 'Ops, algo ha salido mal'
        } )
    }
}

module.exports = { saveUsers, updateUserById }
