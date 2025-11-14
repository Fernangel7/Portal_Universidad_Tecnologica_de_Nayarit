const mongoose = require('mongoose')

const {
    carrera_schema,
    admin_schema
} = require('../../schemas/mongo/general.js')

const { model } = mongoose

//setting models
const carrera_model = model('Carrera', carrera_schema)
const admin_model = model('Admin', admin_schema)

//exporting models
module.exports = {
    carrera_model,
    admin_model
}