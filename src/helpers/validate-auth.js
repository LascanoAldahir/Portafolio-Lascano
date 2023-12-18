
//metodo para proteger rutas y a la vez esta siendo exportado
module.exports.isAuthenticated = (req,res,next)=>{
    //si existe un inicio de sesion
    if(req.isAuthenticated()){
        //continuar
        return next()
    }
    //caso contrario redireccionamiento
    res.redirect('/user/login')
 
    
}
   //redireccionar a la vista portafolios si el usuario inicio sesion
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}