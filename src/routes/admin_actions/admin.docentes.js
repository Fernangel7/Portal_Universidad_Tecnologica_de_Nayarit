const express = require('express')

const docentes_controller = require('../../controllers/admin_actions/admin.docentes.js').admin_docentes_controller

const app = express.Router()

app.get('/get-all', async (req, res) => await docentes_controller.getAllTeachers(req, res))
app.get('/find/:id', async (req, res) => await docentes_controller.findTeacherById(req, res))
app.post('/add-one', async (req, res) => await docentes_controller.addTeacher(req, res))
app.put('/update-one/:id', async (req, res) => await docentes_controller.updateTeacher(req, res))
app.delete('/delete-one/:id', async (req, res) => await docentes_controller.deleteTeacher(req, res))
app.delete('/delete-permanently/:id', async (req, res) => await docentes_controller.deleteTeacherPermanently(req, res))
app.put('/reactivate/:id', async (req, res) => await docentes_controller.reactivateTeacher(req, res))

module.exports = {
    admin_docentes_router: app
}
