const mongoose = require('mongoose')

//const MONGODB_URI = 'mongodb+srv://byrontosh:sistemas@cluster0.6e8zntc.mongodb.net/test'



//cadena de conexion a la bdd

const MONGODB_URI='mongodb://localhost:27017/portafolio'


//crear metodo para hacer la cadena de conexion

connection = async()=>{
    try {
        //invocar al metodo connect
         await mongoose.connect(MONGODB_URI)
         // respuesta de la promesa == "OK"
        console.log("Database is connected")
    } catch (error) {
        //RESPUESTA DE LA PROMESA == "ERROR"
        console.log(error);
    }
}
 //EXPORTAR EL METODO CONNECT
module.exports = connection