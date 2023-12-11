//IMPORTAR SEMA Y EL MODELO
const {Schema, model} = require('mongoose')
//IMPORTAR BCRYPT
const bcrypt = require('bcryptjs')

//CREAR UN SCHEMA -- userSchema
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    }
},{
    timestamps:true
})

///exportar el modelo 
module.exports = model('user',userSchema)

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    //establecer los saltos para encriptar el  password
    const salt = await bcrypt.genSalt(10)
    //encriptar codigo
    const passwordEncryp = await bcrypt.hash(password,salt)
    //retornar el codigo encriptado
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    //utilizar el metodo compare
    const response = await bcrypt.compare(password,this.password)
    return response
}