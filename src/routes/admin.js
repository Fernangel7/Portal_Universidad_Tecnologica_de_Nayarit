const express = require('express')

const app = express.Router()

const { Index_controller } = require('../controllers/admin.js')

app.get('/', async (req, res) => await res.redirect("/admin/dashboard"))
app.get('/login', async (req, res) => Index_controller.login(req, res))
app.get('/dashboard', async (req, res) => Index_controller.dashboard(req, res))
app.get('/informacion_general', async (req, res) => Index_controller.informacion_general(req, res))

app.get('/carreras', async (req, res) => Index_controller.carreras(req, res))
app.get('/carreras/add', async (req, res) => Index_controller.carreras_add(req, res))
app.get('/carreras/update/:uuid', async (req, res) => Index_controller.carreras_update(req, res))

app.get('/noticias', async (req, res) => Index_controller.noticias(req, res))
app.get('/noticias/add', async (req, res) => Index_controller.noticias_add(req, res))
app.get('/noticias/update/:uuid', async (req, res) => Index_controller.noticias_update(req, res))

app.get('/eventos', async (req, res) => Index_controller.eventos(req, res))
app.get('/eventos/add', async (req, res) => Index_controller.eventos_add(req, res))
app.get('/eventos/update/:uuid', async (req, res) => Index_controller.eventos_update(req, res))

app.get('/docentes', async (req, res) => Index_controller.docentes(req, res))
app.get('/docentes/add', async (req, res) => Index_controller.docentes_add(req, res))
app.get('/docentes/update/:uuid', async (req, res) => Index_controller.docentes_update(req, res))

app.get('/alumnos', async (req, res) => Index_controller.alumnos(req, res))
app.get('/alumnos/add', async (req, res) => Index_controller.alumnos_add(req, res))
app.get('/alumnos/update/:uuid', async (req, res) => Index_controller.alumnos_update(req, res))

app.get('/informes_financieros', async (req, res) => Index_controller.informes_financieros(req, res))

module.exports = {
    admin_router: app
}