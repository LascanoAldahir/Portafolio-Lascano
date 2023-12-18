const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
const router = Router()
const { redirectIfAuthenticated } = require('../helpers/validate-auth')


//ruta para mostrar el formulario de registro
router.get('/user/register',renderRegisterForm)
//ruta para capturar los datos del formulario y almacenar en BDD
router.post('/user/register',registerNewUser)

//ruta para mostrar el fomrulario de login
router.get('/user/login',redirectIfAuthenticated,renderLoginForm)
//ruta para capturar los datos del formulario y realizar el proceso
//de login en conjunto con BDD
router.post('/user/login',loginUser)

//ruta para cerrar sesion del usuario
router.post('/user/logout',logoutUser)


module.exports =router