const express = require('express')
const path = require('path');

//importacion de passport
const passport = require('passport');
//importacion de express-sesion
const session = require('express-session');

const fileUpload = require('express-fileupload')


//Importar handlebars
const { engine }  = require('express-handlebars')


//importar el methodOvverride
const methodOverride = require('method-override')

// Inicializaciones
require('./config/passport')


//instanciar express

const app = express()

// Configuraciones

//varoanbles de configuracion
app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
//establecer el path de la carpeta vies
app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs',engine({
    //estbalecer el master page 
    defaultLayout:'main',
    //establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))

//establecer el motor de plantillas
app.set('view engine','.hbs')

// Middlewares
app.use(express.urlencoded({extended:false}))
app.use(methodOverride(`method`))
//configurar la sesion del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())

//variables globales
//crear una variable global
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})


// Rutas
//primera ruta
app.get('/',(req,res)=>{
res.render("index")
})

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

module.exports = app

// Configuraciones 

app.set('views',path.join(__dirname, 'views'))
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Rutas 
app.get('/',(req,res)=>{
    res.render('index')
})
// Rutas 
app.use(require('./routers/index.routes'))

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

// Rutas 
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))

// Middlewares 

app.use(methodOverride('_method'))

app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())


