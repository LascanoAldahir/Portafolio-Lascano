//importar el modelo de usuario
const User = require('../models/User')
//importar el modelo
const passport = require("passport")
//mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
const { sendMailToUser } = require("../config/nodemailer")



//capturar los datos del formulario y almacenar en BDD
const registerNewUser =async(req,res)=>{
    //capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    //validar todos los campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //validar el password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //validar si el usuario ya esta registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //creamos una nueva instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    //Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)

    //guardar en la BDD
    newUser.save()
    //redireccionamiento
    res.redirect('/user/login')
}

//----------------------------------------------------------------------

//mostrar el formulario de login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
//capturar los datos del formulario y realizar el proceso de login 
//en conjuntocon BDD
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

//cerrar sesion del usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}


// Ahora se procede a trabajar en la lógica de la verificación
//  del token, para lo cual se procede a crear un método en 
//  la siguiente ruta:
const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token=null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

//exportando los metodos (controladores)
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}