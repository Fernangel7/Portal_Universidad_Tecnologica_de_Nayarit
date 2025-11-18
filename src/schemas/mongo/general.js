const mongoose = require('mongoose');

const { Schema } = mongoose

const carrera_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Nombre: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Division: String,
    ShortDescription: String,
    FullDescription: String,
    ImageUrl: String,
    WorkField: String,
    Competencies: String,
    StudyPlan: [{
        term: Number,
        content: String
    }],
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

// Docentes (public listing of teacher profiles)
const docente_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Nombre: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Cargo: String,
    Departamento: String,
    ShortBio: String,
    FullBio: String,
    ImageUrl: String,
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

// Noticias (public news/articles)
const noticia_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Titulo: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Resumen: String,
    Contenido: String,
    ImageUrl: String,
    Categoria: String,
    Publicada_en: { type: Date, default: Date.now },
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

// Eventos (public events)
const evento_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Titulo: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Descripcion: String,
    Contenido: String,
    FechaInicio: Date,
    FechaFin: Date,
    Ubicacion: String,
    ImageUrl: String,
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

// Alumnos (admin only visibility)
const alumno_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Matricula: { type: String, required: true, unique: true },
    Nombre: { type: String, required: true },
    Apellidos: String,
    Correo: String,
    CarreraSlug: String, // reference to carrera slug (simplified)
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
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
    admin_schema,
    docente_schema,
    noticia_schema,
    evento_schema,
    alumno_schema
}