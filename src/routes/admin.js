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
app.get('/carreras/update/:matricula', UnauthorizedAccess, async (req, res) => await admin_render_controller.carreras_update(req, res))
app.post('/carreras/update/:id', UnauthorizedAccess, async (req, res) => {
    // Redirect POST to PUT via raw-data endpoint
    const result = await require('../controllers/admin_actions/admin.carreras.js').admin_carreras_controller.updateCareer(req, res);
})

app.get('/noticias', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias(req, res))
app.get('/noticias/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias_add(req, res))
app.get('/noticias/update/:id', UnauthorizedAccess, async (req, res) => await admin_render_controller.noticias_update(req, res))
app.post('/noticias/update/:id', UnauthorizedAccess, async (req, res) => {
    // Redirect POST from form to controller update action
    const result = await require('../controllers/admin_actions/admin.noticias.js').admin_noticias_controller.updateNews(req, res);
})

app.get('/eventos', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos(req, res))
app.get('/eventos/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos_add(req, res))
app.get('/eventos/update/:id', UnauthorizedAccess, async (req, res) => await admin_render_controller.eventos_update(req, res))
app.post('/eventos/update/:id', UnauthorizedAccess, async (req, res) => {
    const result = await require('../controllers/admin_actions/admin.eventos.js').admin_eventos_controller.updateEvent(req, res);
})

app.get('/docentes', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes(req, res))
app.get('/docentes/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes_add(req, res))
app.get('/docentes/update/:id', UnauthorizedAccess, async (req, res) => await admin_render_controller.docentes_update(req, res))
app.post('/docentes/update/:id', UnauthorizedAccess, async (req, res) => {
    const result = await require('../controllers/admin_actions/admin.docentes.js').admin_docentes_controller.updateTeacher(req, res);
})

app.get('/alumnos', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos(req, res))
app.get('/alumnos/add', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos_add(req, res))
app.get('/alumnos/update/:id', UnauthorizedAccess, async (req, res) => await admin_render_controller.alumnos_update(req, res))
app.post('/alumnos/update/:id', UnauthorizedAccess, async (req, res) => {
    const result = await require('../controllers/admin_actions/admin.alumnos.js').admin_alumnos_controller.updateStudent(req, res);
})

app.get('/informes_financieros', UnauthorizedAccess, async (req, res) => await admin_render_controller.informes_financieros(req, res))

// Pre-registros de aspirantes
app.get('/aspirantes/pre-registros', UnauthorizedAccess, async (req, res) => await admin_render_controller.aspirantes_preregistros(req, res))
app.delete('/aspirantes/pre-registros/:uuid', UnauthorizedAccess, async (req, res) => await admin_mongo_controller.delete_aspirante(req, res))

app.get('/logout', UnauthorizedAccess, async (req, res) => {
    res.clearCookie('refreshToken')
    res.redirect('/admin/login')
})

module.exports = {
    admin_router: app
}