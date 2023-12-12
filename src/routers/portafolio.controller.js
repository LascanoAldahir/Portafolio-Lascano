//metodo para listar los portafolios
const renderAllPortafolios = async(req,res)=>{
    //listar todos los portafolios y transformar en objetos
    const portfolios = await Portfolio.find().lean()
    //mandar a la vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}

//metodo para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//metodo para mostrar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}
//metodo para guardar una base de datos lo capturado en el form
const createNewPortafolio =async (req,res)=>{
    //desestructurar los datos del req.body
    const {title, category,description} = req.body
    //crear una nueva istancia
    const newPortfolio = new Portfolio({title,category,description})
    //guardar en la BDD
    await newPortfolio.save()
    //mostrar el resultado
    res.redirect('/portafolios')
}


//metodo para actualizar el formulario
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
//metodo para guardar en la base de datos
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}

//metodo para eliminar en la base de datos
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}

const Portfolio = require('../models/Portfolio')


//exportacion commonjs nombrada
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}

