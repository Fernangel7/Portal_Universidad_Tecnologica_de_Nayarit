const express = require('express')

const { UnauthorizedAccess } = require('../../middlewares/admin.js')

const app = express.Router()

app.use('/alumnos', UnauthorizedAccess, require('./admin.alumnos.js').admin_alumnos_router)
app.use('/carreras', UnauthorizedAccess, require('./admin.carreras.js').admin_carreras_router)
app.use('/docentes', UnauthorizedAccess, require('./admin.docentes.js').admin_docentes_router)
app.use('/eventos', UnauthorizedAccess, require('./admin.eventos.js').admin_eventos_router)
app.use('/noticias', UnauthorizedAccess, require('./admin.noticias.js').admin_noticias_router)

module.exports = {
    admin_actions_router: app
}