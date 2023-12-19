const Portfolio = require('../models/Portfolio')

const { uploadImage } = require('../config/cloudinary')


const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
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
    newPortfolio.user = req.user._id
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    await uploadImage(req.files.image.tempFilePath)
    await newPortfolio.save()
    res.redirect('/portafolios')
}

//metodo de actualizar el foprmulario
const renderEditPortafolioForm =async(req,res)=>{
//consulta del ´portafolio en bdd al id
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}

//metodo actualizar en la bdd lo capturado en el form
const updatePortafolio = async(req,res)=>{
    //capturar los datos del body
    const {title,category,description}= req.body
    //actualizar el portafolio en bdd
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

//metodo para eliminar el portafolio
const deletePortafolio = async(req,res)=>{
    //capturtar el id del portafolio
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
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