const jwt = require('jsonwebtoken')

const { admin_mongo_model } = require('../models/mongodb/admin.js')
const { admin_carreras_model } = require('../models/mongodb/admin_actions/admin.carreras.js')
const { admin_noticias_model } = require('../models/mongodb/admin_actions/admin.noticias.js')
const { admin_eventos_model } = require('../models/mongodb/admin_actions/admin.eventos.js')
const { admin_docentes_model } = require('../models/mongodb/admin_actions/admin.docentes.js')
const { admin_alumnos_model } = require('../models/mongodb/admin_actions/admin.alumnos.js')

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
        try {
            const result = await admin_carreras_model.getAllCareers();
            const careers = result.status === 200 ? result.data.careers : [];
            
            res.render('admin/carreras', {
                title: website_name,
                careers: careers
            });
        } catch (error) {
            console.error('Error fetching careers:', error);
            res.render('admin/carreras', {
                title: website_name,
                careers: []
            });
        }
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
        try {
            const { matricula } = req.params;
            const result = await admin_carreras_model.findCareerById(matricula);
            
            if (result.status === 404) {
                return res.status(404).render('404', { title: 'Carrera no encontrada' });
            }
            
            res.render('admin/update/add_carreras', {
                title: website_name,
                options: {
                    isAdd: false,
                    isUpdate: true,
                    data: result.status === 200 ? result.data.career : {}
                }
            });
        } catch (error) {
            console.error('Error fetching career:', error);
            res.status(500).render('404', { title: 'Error al cargar carrera' });
        }
    }

    static async noticias(req, res) {
            try {
                const result = await admin_noticias_model.getAllNews();
                const news = result.status === 200 ? result.data.news : [];
                res.render('admin/noticias', {
                    title: website_name,
                    news
                })
            } catch (error) {
                res.render('admin/noticias', { title: website_name, news: [] })
            }
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
            try {
                const result = await admin_eventos_model.getAllEvents();
                const events = result.status === 200 ? result.data.events : [];
                res.render('admin/eventos', {
                    title: website_name,
                    events
                })
            } catch (error) {
                res.render('admin/eventos', { title: website_name, events: [] })
            }
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
            try {
                const result = await admin_docentes_model.getAllTeachers();
                const teachers = result.status === 200 ? result.data.teachers : [];
                res.render('admin/docentes', {
                    title: website_name,
                    teachers
                })
            } catch (error) {
                res.render('admin/docentes', { title: website_name, teachers: [] })
            }
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
            try {
                const result = await admin_alumnos_model.getAllStudents();
                const students = result.status === 200 ? result.data.students : [];
                res.render('admin/alumnos', {
                    title: website_name,
                    students
                })
            } catch (error) {
                res.render('admin/alumnos', { title: website_name, students: [] })
            }
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