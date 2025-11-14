const mongoose = require('mongoose');

const { Schema } = mongoose

const carrera_schema = new Schema({
    UUID: String,
    Nombre: String,
    Division: String,
    Logo: String,
    Descripcion: {},
    UUID_plan_estudios: String,
    Estado: Boolean,
    Created_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

const admin_schema = new Schema({
    UUID: String,
    Name: String,
    Age: Number,
    Mail: String,
    Role: String,
    Username: String,
    Password: String,
    Created_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

module.exports = {
    carrera_schema,
    admin_schema
}