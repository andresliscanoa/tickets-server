'use strict'
const Logger = require('../factories/logger')
const logger = new Logger('UsersProviderSave')
const {saveUser} = require('../repositories/UsersRepository')

process.on('message', async message => {
    const {name, lastname, email, roles, info} = message
    logger.info("message: " ,{message})
    let response = { code: 400, body: {status: 'error', message: 'Ha ocurrido un error inesperado'}}
    try {
        const user = { name, lastname, email, createdBy: '62732e169c08fd9df86babb7' }
        user.roles = [ roles ]
        logger.info("user",{ user })
        response = await saveUser({user, info})
    } catch (err) {
        await logger.error('ERROR ', {err, info})
    } finally {
        process.send(response)
        process.exit()
    }
})