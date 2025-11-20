const jwt = require('jsonwebtoken')

const { carrera_model } = require('../models/mongodb/general.js')
const aspirantes = require('../models/mongodb/aspirantes.js').aspirantes_model
const { website_name, JWT_SECRET_KEY } = require('../config/config-globals.js')

class AspirantesRenderController {
    static async login(req, res) {
        res.render('login_aspirante', { title: website_name })
    }

    static async dashboard(req, res) {
        try {
            const token = req.signedCookies.aspiranteToken
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            const info = await aspirantes.getByUUID(decoded.UUID)
            if (info.status !== 200) return res.status(401).render('401', { title: '401 - Unauthorized' })
            res.render('dashboard_aspirante', { title: website_name, aspirante: info.data.aspirante })
        } catch (e) {
            res.status(401).render('401', { title: '401 - Unauthorized' })
        }
    }

    static async preRegisterForm(req, res) {
        try {
            const careers = await carrera_model.find({ Estado: true }).select('Nombre Slug').sort({ Nombre: 1 }).lean()
            res.render('from_pre_registro', { title: website_name, careers, created: null, aspirante: null, editMode: false })
        } catch (e) {
            res.render('from_pre_registro', { title: website_name, careers: [], created: null, aspirante: null, editMode: false })
        }
    }

    static async preRegisterEdit(req, res) {
        try {
            const token = req.signedCookies.aspiranteToken
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            const [info, careers] = await Promise.all([
                aspirantes.getByUUID(decoded.UUID),
                carrera_model.find({ Estado: true }).select('Nombre Slug').sort({ Nombre: 1 }).lean()
            ])
            if (info.status !== 200) return res.status(401).render('401', { title: '401 - Unauthorized' })
            res.render('from_pre_registro', { title: website_name, careers, created: null, aspirante: info.data.aspirante, editMode: true })
        } catch (e) {
            res.status(401).render('401', { title: '401 - Unauthorized' })
        }
    }
}

class AspirantesMongoController {
    static async login_verify(req, res) {
        const { username, password } = req.body || {}
        const result = await aspirantes.loginVerify({ Username: username, Password: password })
        if (result.status === 200) {
            const token = jwt.sign({ UUID: result.data.UUID, Username: result.data.Username }, JWT_SECRET_KEY)
            res.cookie('aspiranteToken', token, {
                signed: true,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
        }
        return res.status(200).json({ status: result.status, message: result.msg })
    }

    static async pre_register_create(req, res) {
        const payload = req.body || {}
        if (!payload.Nombre) return res.status(400).render('from_pre_registro', { title: website_name, careers: [], created: { error: 'Nombre es requerido' } })
        const result = await aspirantes.createPreRegistro(payload)
        try {
            const careers = await carrera_model.find({ Estado: true }).select('Nombre Slug').sort({ Nombre: 1 }).lean()
            if (result.status === 201) {
                return res.render('from_pre_registro', {
                    title: website_name,
                    careers,
                    created: {
                        ok: true,
                        username: result.data.credentials.username,
                        password: result.data.credentials.password,
                        preficha: result.data.aspirante.Preficha
                    },
                    aspirante: null,
                    editMode: false
                })
            }
            return res.render('from_pre_registro', { title: website_name, careers, created: { error: result.msg }, aspirante: null, editMode: false })
        } catch (e) {
            return res.render('from_pre_registro', { title: website_name, careers: [], created: { error: 'Error al procesar' }, aspirante: null, editMode: false })
        }
    }

    static async pre_register_update(req, res) {
        try {
            const token = req.signedCookies.aspiranteToken
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            const result = await aspirantes.updatePreRegistro(decoded.UUID, req.body || {})
            if (result.status === 200) return res.redirect('/aspirantes/dashboard')
            return res.status(400).render('from_pre_registro', { title: website_name, careers: [], created: { error: result.msg }, editMode: true, aspirante: result.data?.aspirante || null })
        } catch (e) {
            return res.status(401).render('401', { title: '401 - Unauthorized' })
        }
    }

    static async preficha_delete(req, res) {
        try {
            const token = req.signedCookies.aspiranteToken
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            const result = await aspirantes.removePreficha(decoded.UUID)
            if (result.status === 200) {
                const secureCookie = process.env.NODE_ENV === 'production'
                res.clearCookie('aspiranteToken', { httpOnly: true, sameSite: 'strict', secure: secureCookie })
                return res.status(200).json({ status: 200, message: result.msg, redirect: '/aspirantes/login' })
            }
            return res.status(result.status).json({ status: result.status, message: result.msg, data: result.data || null })
        } catch (e) {
            return res.status(401).json({ status: 401, message: 'No autorizado' })
        }
    }
}

module.exports = {
    aspirantes_controller: {
        login: AspirantesRenderController.login,
        dashboard: AspirantesRenderController.dashboard,
        preRegisterForm: AspirantesRenderController.preRegisterForm,
        preRegisterEdit: AspirantesRenderController.preRegisterEdit,
        login_verify: AspirantesMongoController.login_verify,
        pre_register_create: AspirantesMongoController.pre_register_create,
        pre_register_update: AspirantesMongoController.pre_register_update,
        preficha_delete: AspirantesMongoController.preficha_delete
    }
}