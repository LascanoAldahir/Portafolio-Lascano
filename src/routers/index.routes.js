//importar routes de express

const {Router} = require('express')

const router = Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})


//importae la variable router
module.exports = router