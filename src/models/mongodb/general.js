const mongoose = require('mongoose')

const { carrera_schema } = require('../../schemas/mongo/general.js')

const { Schema, model } = mongoose

//setting models
const carrera_model = model('Carrera', carrera_schema)

//exporting models
module.exports = {
    carrera_model
}