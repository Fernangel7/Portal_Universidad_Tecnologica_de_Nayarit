const express = require('express')

const alumnos_controller = require('../../controllers/admin_actions/admin.alumnos.js').admin_alumnos_controller

const app = express.Router()

app.get('/get-all', async (req, res) => await alumnos_controller.getAllStudents(req, res))
app.get('/find/:matricula', async (req, res) => await alumnos_controller.findStudentByMatricula(req, res))
app.post('/add-one', async (req, res) => await alumnos_controller.addStudent(req, res))
app.put('/update-one/:matricula', async (req, res) => await alumnos_controller.updateStudent(req, res))
app.delete('/delete-one/:matricula', async (req, res) => await alumnos_controller.deleteStudent(req, res))

module.exports = {
    admin_alumnos_router: app
}