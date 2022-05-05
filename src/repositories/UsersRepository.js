'use strict'
const Logger = require('../factories/logger')
const logger = new Logger('UsersRepository')
const Users = require('../schemas/UsersSchema')
//const db = require('../factories/connections')

const saveUser = async ({user, info}) => {
    //const conn = db("test")
    let response
    try {
        //const Users = conn.model('Users', userSchema, 'Users')
        logger.info("SAVING USER IN DATABASE", {user})
        await new Users(user).save()
        response = {
            code: 201,
            body: {
                status: 'success', message: 'Usuario creado satisfactoriamente'
            }
        }
    } catch (err) {
        logger.error("ERROR", {err, info})
        response = {
            code: 400,
            body: {
                status: 'error', message: 'Ha ocurrido un error'
            }
        }
    }
    return response
}

module.exports = { saveUser }