const { Router } = require('express')
const { check } = require('express-validator')
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/usuarios')
const { rolValidator, emailValidator, userIdValidator } = require('../helpers/db-validators')
const { validationMiddleware } = require('../middlewares/validationMiddleware')


const router = Router()

router.get('/', usersGet)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y mas de 6 letras').isLength( 6 ),
    // check('rol', 'No es un rol valido').isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
    check('rol').custom( rolValidator ),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailValidator ),
    validationMiddleware
        ],
    usersPost )

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userIdValidator ),
    check('rol').custom( rolValidator ),

    validationMiddleware
],usersPut)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userIdValidator ),
    validationMiddleware
], usersDelete)


module.exports = router;