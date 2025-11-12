const { website_name } = require('../utils/utils-globals.js')

class Index_controller {
    static async dashboard(req, res) {
        res.render('admin/dashboard', {
            title: website_name
        })
    }

    static async login(req, res) {
        res.render('admin/login', {
            title: website_name
        })
    }

    static async informacion_general(req, res) {
        res.render('admin/informacion_general', {
            title: website_name
        })
    }
    
    static async carreras(req, res) {
        res.render('admin/carreras', {
            title: website_name
        })
    }

    static async noticias(req, res) {
        res.render('admin/noticias', {
            title: website_name
        })
    }

    static async eventos(req, res) {
        res.render('admin/eventos', {
            title: website_name
        })
    }

    static async docentes(req, res) {
        res.render('admin/docentes', {
            title: website_name
        })
    }

    static async alumnos(req, res) {
        res.render('admin/alumnos', {
            title: website_name
        })
    }

    static async informes_financieros(req, res) {
        res.render('admin/informes_financieros', {
            title: website_name
        })
    }
}

module.exports = {
    Index_controller
}