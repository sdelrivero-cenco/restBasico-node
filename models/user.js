
const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
         default: false
    }


})

// la idea de desto es quitar la pass y la version del usuario para imprimirlo.
UserSchema.methods.toJson = function(){
    const  { __v, password, ...usuario } = this.toObject()
    return usuario
}


module.exports = model('Usuario', UserSchema )