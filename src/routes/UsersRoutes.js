'use strict'
const { Router } = require( 'express' )
const router = Router()
const { body, param } = require( 'express-validator' )
const { saveUsers } = require( '../controllers/UsersController' )
const isAuth = require( '../guards/isAuth' )
const isErrors = require( '../guards/isErrors' )
const isAdmin = require( '../middlewares/isAdmin' )

router.post( '/', [
    //isAuth,
    //( req, res, next ) => isAdmin
], [
    body( 'name' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Mandatory field' )
        .bail()
        .isString().withMessage( 'Invalid format' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Must be between {4} and {50}' )
        .bail()
        .trim(),
    body( 'lastname' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Mandatory fields' )
        .bail()
        .isString().withMessage( 'Invalid format' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Must be between {4} and {50}' )
        .bail()
        .trim(),
    body( 'email' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'mandatory field' )
        .bail()
        .isEmail().withMessage( 'Invalid format' )
        .bail()
        .isLength( { min: 5, max: 255 } ).withMessage( 'Must be between {5} and {255}' )
        .bail()
        .trim(),
    body( 'roles' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Mandatory field' )
        .bail()
        .isString().withMessage( 'Invalid format' )
        .bail()
        .isIn(["ADMIN", "BARMAN", "OWNER", "PROMOTER", "SELLER", "SUPERVISOR", "WARDROBE"]).withMessage("Invalid value")
], isErrors, saveUsers )

module.exports = router
