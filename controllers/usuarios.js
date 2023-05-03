const { request, response } = require("express")
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { findByIdAndUpdate } = require("../models/user");


const usersGet = async (req = request, res = response ) =>{
    
    const { limite = 5, desde = 0} = req.query
    const query = { state: true }

    // ejecuta las promesas al mismo tiempo, pero no espera una u otra... si una falla ya tira
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(Number(limite))
        .skip( Number(desde) )

    ])

    res.json({
        total,
        usuarios
    })

}


const usersPost = async ( req, res ) =>{

    
    
    const { name, password, email, rol } = req.body
    const user = new User( { name, password, email, rol } );

    // Verificar si el orreo existe
   

    // encriptar la constraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password, salt )

    await user.save();

    res.json({
        msg: 'POST Api - Users',
        user
    })

}


const usersPut = async (req, res) =>{

    const id = req.params.id
    const { password, google, email, _id, ...rest } = req.body

    // TODO validar contra base de datos.

    // quiere actualizar contraseña
    if ( password ) {
         // encriptar la constraseña
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await User.findByIdAndUpdate( id,  rest)


    res.json({
        id
    })
}
const usersDelete = async (req, res) =>{

    const { id } = req.params

    // Lo borramos fisicamente
    // const usuario = await User.findByIdAndDelete( id );

    // Es preferible cambiar el estado del usuario.

    const usuario = await User.findByIdAndUpdate( id, {
        state: false
    })


    res.json(usuario)
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete

}