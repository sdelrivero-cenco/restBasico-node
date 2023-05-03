const mongoose = require('mongoose')


const dbConnection = async () => {

    try{
        await mongoose.connect('mongodb+srv://user_node_cafe:qVNbenvNxtPURrUr@cluster0.3e3l1ft.mongodb.net/test', {
            useNewUrlParser: true, 


        })

        console.log(" Base de datos online ");
    }

    catch (error){
        console.log(error);
        throw new Error('Error a la hora de levantar la base de datos')
    }
    
}


module.exports = {dbConnection};