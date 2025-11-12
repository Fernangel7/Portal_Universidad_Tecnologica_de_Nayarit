const mongoose = require('mongoose');

const { Schema, model } = mongoose

const carrera_schema = new Schema({
    UUID: String,
    Nombre: String,
    Division: String,
    Logo: String,
    Descripcion: {},
    UUID_plan_estudios: String,
    Estado: Boolean
})

module.exports = {
    carrera_schema
}