//importar routes de express

const {Router} = require('express')

const router = Router()
const {renderIndex,renderAbout} = require('../controllers/index.controllers.js')

router.get('/',renderIndex)
router.get('/login',renderAbout)

//importae la variable router
module.exports = router