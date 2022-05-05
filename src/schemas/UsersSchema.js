'use strict'
const database = require('../factories/mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: 'https://storage.googleapis.com/ack-users-images/user-question-mark.jpg'
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        trim: true,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [String],
        required: true,
        min: 1,
        max: 5,
        enum: ["ADMIN", "BARMAN", "OWNER", "PROMOTER", "SELLER", "SUPERVISOR", "WARDROBE"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
    updatedAt: {
        type: String,
        default: null
    }
})

const Users = database.model( 'Users', userSchema, 'Users' )
module.exports = Users
