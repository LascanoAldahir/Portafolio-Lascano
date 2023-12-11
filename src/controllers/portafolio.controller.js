const Portfolio = require('../models/Portfolio')

const renderAllPortafolios = (req,res)=>{
    res.send('Listar todos los portafolios')
}

const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.json({newPortfolio})
}

const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}






module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}