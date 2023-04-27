const express = require('express');
var cors = require('cors');
const router = require('../routes/user');



class Server {

    constructor(){

        this.app = express()
        this.PORT = 8000
        this.usuariosPath = '/api/usuarios'
        
        // middlewares 
        this.middlewares()
        // rutas de mi aplicacion
        // this.listen()
        this.routes()

    }

    middlewares(){
        this.app.use( express.static( 'public' ) )
        this.app.use(cors())

        // lectura y parseo del body
        this.app.use( express.json() )

    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'))
    }
    
    listen(){
        this.app.listen( this.PORT, () => {

            console.log(`Servidor corriendo en el puerto`, this.PORT);
            
        })
    }
}

module.exports = Server;