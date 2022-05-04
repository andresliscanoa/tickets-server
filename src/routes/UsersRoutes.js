'use strict'
const { Router } = require( 'express' )
const router = Router()
const { body, param } = require( 'express-validator' )
const { saveUsers, updateUserById } = require( '../controllers/UsersController' )
const isAuth = require( '../guards/isAuth' )
const isErrors = require( '../guards/isErrors' )
const isAdmin = require( '../middlewares/isAdmin' )

router.post( '/', [
    isAuth,
    ( req, res, next ) => isAdmin
], [
    body( 'name' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'lastname' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'email' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isEmail().withMessage( 'Formato inválido' )
        .bail()
        .isLength( { min: 5, max: 255 } ).withMessage( 'Debe estar entre cinco y 255 caracteres' )
        .bail()
        .trim(),
    body( 'roles' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isMongoId().withMessage( 'Formato inválido' )
], isErrors, saveUsers )

router.put('/:id',[
    isAuth,
    ( req, res, next ) => isAllow( req, res, next, 'arn:auth:users:update:own' )
],[
    param( 'id' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isMongoId().withMessage( 'Formato inválido' )
        .bail()
        .isAlphanumeric().withMessage( 'No se permiten caracteres especiales' )
        .bail()
        .trim(),
    body( 'name' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'lastname' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'gender' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'telephone' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isString().withMessage( 'Debe ser un string válido' )
        .bail()
        .isLength( { min: 4, max: 50 } ).withMessage( 'Debe estar entre cuatro y 50 caracteres' )
        .bail()
        .trim(),
    body( 'picture' )
        .exists( { checkNull: true, checkFalsy: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isURL( { require_protocol: true, require_valid_protocol: true, protocols: [ 'https' ] } )
        .bail()
        .trim(),
    body( 'email' )
        .exists( { checkFalsy: true, checkNull: true } ).withMessage( 'Campo obligatorio' )
        .bail()
        .isEmail().withMessage( 'Formato inválido' )
        .bail()
        .isLength( { min: 5, max: 255 } ).withMessage( 'Debe estar entre cinco y 255 caracteres' )
        .bail()
        .trim()
],isErrors, updateUserById)
module.exports = router
