const { request, response } = require("express")


const usersGet = (req = request, res = response ) =>{

    const params = req.query;

    res.json({
        msg: "get",
        params
    })

}


const usersPost = ( req, res ) =>{

    const { nombre, edad, id } = req.body
    res.json({
        nombre,
        edad,
        id
    })

}


const usersPut = (req, res) =>{

    const id = req.params.id

    res.json({
        id
    })
}
const usersDelete = (req, res) =>{
    res.send('delete request')
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete

}