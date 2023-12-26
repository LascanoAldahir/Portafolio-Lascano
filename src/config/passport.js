//importar passport
const passport = require('passport')
//establecer el modelo user
const User = require('../models/User')
//establecer la estrategia
const LocalStrategy = require('passport-local').Strategy

//implementar la estrategia local
passport.use(new LocalStrategy({
    //en base a email y password
    usernameField:'email',
    passwordField:'password'
    //función para hacer el proceso de inicio de sesion
},async(email,password,done)=>{
    //buscar el usuario en base al email
    const userBDD = await User.findOne({email})
    //verificar si existe el usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //dessencriptar el password
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    //retornar el usuario de la bdd
    return done(null,userBDD)
}))

//serializar el usuario
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//deserealizar el usuario
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});