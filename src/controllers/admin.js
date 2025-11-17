const jwt = require('jsonwebtoken')

const { admin_mongo_model } = require('../models/mongodb/admin.js')

const { JWT_SECRET_KEY } = require('../config/config-globals.js')
const { website_name } = require('../utils/utils-globals.js')

class admin_render_controller {
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

    static async carreras_add(req, res) {
        res.render('admin/update/add_carreras', {
            title: website_name,
            options: {
                isAdd: true,
                isUpdate: false,
                data: {

                }
            }
        })
    }

    static async carreras_update(req, res) {
        res.render('admin/update/add_carreras', {
            title: website_name,
            options: {
                isAdd: false,
                isUpdate: true,
                data: {
                    
                }
            }
        })
    }

    static async noticias(req, res) {
        res.render('admin/noticias', {
            title: website_name
        })
    }

    static async noticias_add(req, res) {
        res.render('admin/update/add_noticias', {
            title: website_name,
            options: {
                isAdd: true,
                isUpdate: false,
                data: {
                    
                }
            }
        })
    }

    static async noticias_update(req, res) {
        res.render('admin/update/add_noticias', {
            title: website_name,
            options: {
                isAdd: false,
                isUpdate: true,
                data: {
                    
                }
            }
        })
    }

    static async eventos(req, res) {
        res.render('admin/eventos', {
            title: website_name
        })
    }

    static async eventos_add(req, res) {
        res.render('admin/update/add_eventos', {
            title: website_name,
            options: {
                isAdd: true,
                isUpdate: false,
                data: {
                    
                }
            }
        })
    }

    static async eventos_update(req, res) {
        res.render('admin/update/add_eventos', {
            title: website_name,
            options: {
                isAdd: false,
                isUpdate: true,
                data: {
                    
                }
            }
        })
    }

    static async docentes(req, res) {
        res.render('admin/docentes', {
            title: website_name
        })
    }

    static async docentes_add(req, res) {
        res.render('admin/update/add_docentes', {
            title: website_name,
            options: {
                isAdd: true,
                isUpdate: false,
                data: {
                    
                }
            }
        })
    }

    static async docentes_update(req, res) {
        res.render('admin/update/add_docentes', {
            title: website_name,
            options: {
                isAdd: false,
                isUpdate: true,
                data: {
                    
                }
            }
        })
    }

    static async alumnos(req, res) {
        res.render('admin/alumnos', {
            title: website_name
        })
    }

    static async alumnos_add(req, res) {
        res.render('admin/update/add_alumnos', {
            title: website_name,
            options: {
                isAdd: true,
                isUpdate: false,
                data: {
                    
                }
            }
        })
    }

    static async alumnos_update(req, res) {
        res.render('admin/update/add_alumnos', {
            title: website_name,
            options: {
                isAdd: false,
                isUpdate: true,
                data: {
                    
                }
            }
        })
    }

    static async informes_financieros(req, res) {
        res.render('admin/informes_financieros', {
            title: website_name
        })
    }
}

class admin_mongo_controller {
    static async login_verify(req, res) {
        if (!req.body)
            return res.status(200).json({
                status: '204',
                message: 'No content',
                error: 'No content'
            })

        const { username, password, prev } = req.body;

        const response = await admin_mongo_model.login_verify({ Username: username, Password: password })

        if (response && response.status == 200) {

            if (prev == true) return true

            res.cookie('refreshToken',
                jwt.sign(response.refreshToken, JWT_SECRET_KEY),
                {
                    signed: true,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                })

            return res.status(200).json({
                status: 200,
                message: 'Usuario verificado.'
            })
        }

        if (prev == true) return false

        // Lógica de verificación de login aquí
        return res.status(200).json({
            status: 401,
            message: 'Usuario no encontrado.'
        })
    }
}

module.exports = {
    admin_render_controller,
    admin_mongo_controller
}