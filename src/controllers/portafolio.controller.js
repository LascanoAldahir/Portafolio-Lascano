const Portfolio = require('../models/Portfolio')
const { uploadImage } = require('../config/cloudinary')

const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
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
    try{

        await uploadImage(req.files.image.tempFilePath)
        await newPortfolio.save()
    }catch(e){
    console.log(e)
    }

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
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //actualizar el portafolio en bdd
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}


//metodo para eliminar el portafolio
const deletePortafolio = async(req,res)=>{
    //capturtar el id del portafolio
    await Portfolio.findByIdAndDelete(req.params.id) //posiblemente borrar las dos lineas
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