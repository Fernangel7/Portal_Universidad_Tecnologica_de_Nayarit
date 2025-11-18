const express = require('express')

const aspirantes = require('../controllers/aspirantes.js').aspirantes_controller
const { AspiranteUnauthorized } = require('../middlewares/aspirantes.js')

const app = express.Router()

app.get('/', async (req, res) => {
    if (!req.signedCookies.aspiranteToken) return res.redirect('/aspirantes/login')
    return res.redirect('/aspirantes/dashboard')
})

app.get('/login', async (req, res) => await aspirantes.login(req, res))
app.post('/login/verify', async (req, res) => await aspirantes.login_verify(req, res))

app.get('/dashboard', AspiranteUnauthorized, async (req, res) => await aspirantes.dashboard(req, res))

app.get('/form/pre-register', async (req, res) => await aspirantes.preRegisterForm(req, res))
app.post('/form/pre-register', async (req, res) => await aspirantes.pre_register_create(req, res))

app.get('/form/pre-register/edit', AspiranteUnauthorized, async (req, res) => await aspirantes.preRegisterEdit(req, res))
app.post('/form/pre-register/edit', AspiranteUnauthorized, async (req, res) => await aspirantes.pre_register_update(req, res))

app.get('/logout', AspiranteUnauthorized, async (req, res) => {
    res.clearCookie('aspiranteToken')
    res.redirect('/aspirantes/login')
})

module.exports = {
    aspirantes_router: app
}