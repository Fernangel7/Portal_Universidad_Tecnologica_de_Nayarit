const express = require('express')

const carreras_controller = require('../../controllers/admin_actions/admin.carreras.js').admin_carreras_controller

const app = express.Router()

app.get('/get-all', async (req, res) => await carreras_controller.getAllCareers(req, res))
app.get('/find/:id', async (req, res) => await carreras_controller.findCareerById(req, res))
app.post('/add-one', async (req, res) => await carreras_controller.addCareer(req, res))
app.put('/update-one/:id', async (req, res) => await carreras_controller.updateCareer(req, res))
app.delete('/delete-one/:id', async (req, res) => await carreras_controller.deleteCareer(req, res))

module.exports = {
    admin_carreras_router: app
}
