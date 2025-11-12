const express = require('express')

const app = express.Router()

const { website_name } = require('../../utils/utils-globals.js')

app.get('/', (req, res) => {
    res.redirect('/admin/dashboard')
})

app.get('/login', (req, res) => {
    res.render('admin/login', {
        title: website_name
    })
})

app.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: website_name
    })
})

app.get('/informacion_general', (req, res) => {
    res.render('admin/informacion_general', {
        title: website_name
    })
})

app.get('/carreras', (req, res) => {
    res.render('admin/carreras', {
        title: website_name
    })
})

app.get('/noticias', (req, res) => {
    res.render('admin/noticias', {
        title: website_name
    })
})

app.get('/eventos', (req, res) => {
    res.render('admin/eventos', {
        title: website_name
    })
})

app.get('/docentes', (req, res) => {
    res.render('admin/docentes', {
        title: website_name
    })
})

app.get('/alumnos', (req, res) => {
    res.render('admin/alumnos', {
        title: website_name
    })
})

app.get('/informes_financieros', (req, res) => {
    res.render('admin/informes_financieros', {
        title: website_name
    })
})

module.exports = {
    admin_router: app
}