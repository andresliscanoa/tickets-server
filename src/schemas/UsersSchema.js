'use strict'
const { Schema } = require( 'mongoose' )

const userSchema = new Schema( {
    name       : {
        type    : String,
        required: true
    },
    lastname   : {
        type    : String,
        required: true
    },
    telephone  : {
        type   : String,
        default: ''
    },
    picture    : {
        type   : String,
        default: 'https://storage.googleapis.com/ack-users-images/user-question-mark.jpg'
    },
    email      : {
        type     : String,
        required : true,
        lowercase: true,
        max      : 255
    },
    password   : {
        type   : String,
        trim   : true,
        default: null
    },
    status     : {
        type   : Boolean,
        default: false
    },
    tenants: [
        {
            application: {
                type: String,
                trim: true,
                default: null
            },
            roles: {
                type: [String],
                required: true,
                min: 1,
                max: 5,
                enum: ["ADMIN", "BARMAN", "OWNER", "PROMOTER", "SELLER", "SUPERVISOR", "WARDROBE"]
            }
        }
    ],
    createdBy  : {
        type    : Schema.Types.ObjectId,
        ref     : 'Users',
        required: true
    },
    updatedBy  : {
        type   : Schema.Types.ObjectId,
        ref    : 'Users',
        default: null
    },
    createdAt  : {
        type    : String,
        required: true,
        default : new Date().toISOString()
    },
    updatedAt  : {
        type   : String,
        default: null
    }
} )

module.exports = userSchema
