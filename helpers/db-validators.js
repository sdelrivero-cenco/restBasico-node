const Role = require('../models/rol')
const User = require('../models/user')

const rolValidator = async (rol = '') => {
    const roleExists = await Role.findOne( { rol } )

    if ( !roleExists ){
        throw new Error(' El rol ingresado no es correcto')
    }
}

const emailValidator = async ( email = '' ) => {
    const emailExists = await User.findOne( { email } )
    if ( emailExists ){
        throw new Error( 'El correo ya esta en uso' )
    }
}
const userIdValidator = async ( id = '' ) => {
    const userIdExists = await User.findById(id)
    if ( !userIdExists ){
        throw new Error( 'El id de usuario no existe' )
    }
}

module.exports = {
    rolValidator, 
    emailValidator,
    userIdValidator
}