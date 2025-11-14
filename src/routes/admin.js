const express = require('express')

const app = express.Router()

//middlewares
const { UnauthorizedAccess } = require('../middlewares/admin.js')

//controllers
const { admin_render_controller, admin_mongo_controller } = require('../controllers/admin.js')

//routes
app.get('/', async (req, res) => {
    if (!req.signedCookies.refreshToken) res.redirect('/admin/login')
    else res.redirect('/admin/dashboard')
})

app.get('/login', UnauthorizedAccess, async (req, res) => await admin_render_controller.login(req, res))
app.post('/login/verify', async (req, res) => await admin_mongo_controller.login_verify(req, res))

//Rutas protegidas
app.get('/dashboard', UnauthorizedAccess, async (req, res) => await admin_render_controller.dashboard(req, res))
app.get('/informacion_general', UnauthorizedAccess, async (req, res) => await admin_render_controller.informacion_general(req, res))

app.get('/carreras', UnauthorizedAccess, async (req, res) => await admin_render_controller.carreras(req, res))
app.get('/carreras/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.carreras_add(req, res))
app.get('/carreras/update/:uuid', UnauthorizedAccess, async (req, res) => await admin_render_controller.carreras_update(req, res))

app.get('/noticias', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias(req, res))
app.get('/noticias/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias_add(req, res))
app.get('/noticias/update/:uuid', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias_update(req, res))

app.get('/eventos', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos(req, res))
app.get('/eventos/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos_add(req, res))
app.get('/eventos/update/:uuid', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos_update(req, res))

app.get('/docentes', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes(req, res))
app.get('/docentes/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes_add(req, res))
app.get('/docentes/update/:uuid', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes_update(req, res))

app.get('/alumnos', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos(req, res))
app.get('/alumnos/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos_add(req, res))
app.get('/alumnos/update/:uuid', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos_update(req, res))

app.get('/informes_financieros', UnauthorizedAccess, async (req, res) => await admin_render_controller.informes_financieros(req, res))

app.get('/logout', UnauthorizedAccess, async (req, res) => {
    res.clearCookie('refreshToken')
    res.redirect('/admin/login')
})

module.exports = {
    admin_router: app
}