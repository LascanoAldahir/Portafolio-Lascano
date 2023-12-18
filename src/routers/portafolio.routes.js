//IMPORTAR ROUTER DE EXPRESS
const{Router} = require('express')

//INSTANCIAR LA VARIABLE ROUTER
const router = Router()

const {isAuthenticated} = require('../helpers/validate-auth')

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controller.js')

//RUTA PARA CARGGAR KA VITA DEL FORMULARIO
router.get('/portafolio/add',isAuthenticated, renderPortafolioForm)
//RUTA PARA CAPTURAR LOS DATOS DEL FORM Y GUARDAR EN BDD
router.post('/portafolio/add',isAuthenticated, createNewPortafolio)

//RUTA PARA PRESENTAR TODOS LOS PORTAFOLIOS
router.get('/portafolios',isAuthenticated, renderAllPortafolios)
//RUTA PARA PRESENTAR EL DETALLE DE UN PORTAFOLIO
router.get('/portafolio/:id',isAuthenticated, renderPortafolio)

//RUTA PARA CARGAR LA VISTA DEL FORMULARIO
router.get('/portafolio/edit/:id', isAuthenticated, renderEditPortafolioForm)

//RUTA PARA CAPTURAR LOS DATOS DEL FPRM Y GUARDAR EN BDD
router.put('/portafolio/edit/:id', isAuthenticated, updatePortafolio)

//RUTA PARA ELIMINAR EL PORTAFOLIO
router.post('/portafolio/delete/:id', isAuthenticated, deletePortafolio)

module.exports = router