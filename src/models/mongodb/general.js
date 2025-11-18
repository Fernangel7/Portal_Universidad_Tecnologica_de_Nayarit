const mongoose = require('mongoose')

const {
    carrera_schema,
    admin_schema,
    docente_schema,
    noticia_schema,
    evento_schema,
    alumno_schema
} = require('../../schemas/mongo/general.js')

const { model } = mongoose

//setting models
const carrera_model = model('Carrera', carrera_schema)
const admin_model = model('Admin', admin_schema)
const docente_model = model('Docente', docente_schema)
const noticia_model = model('Noticia', noticia_schema)
const evento_model = model('Evento', evento_schema)
const alumno_model = model('Alumno', alumno_schema)

//exporting models
module.exports = {
    carrera_model,
    admin_model,
    docente_model,
    noticia_model,
    evento_model,
    alumno_model
}