if(process.env.NODE_ENV === 'develop') require( 'dotenv' ).config()
const express = require( 'express' )
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const morgan = require( 'morgan' )
const { requestInfo } = require("../guards/requestInfo");



const app = express()
app.set( 'trust proxy', 1 )
app.use( requestInfo )
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( helmet() )
app.use( morgan( process.env.NODE_ENV === 'development' ? 'dev' : 'short' ) )
app.use( cors() )
app.use( function ( req, res, next ) {
    res.header( 'Access-Control-Allow-Origin', '*' )
    res.header( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' )
    res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' )
    next()
} )


module.exports = app
