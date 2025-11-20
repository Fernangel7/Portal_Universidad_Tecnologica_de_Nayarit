const express = require('express')

const eventos_controller = require('../../controllers/admin_actions/admin.eventos.js').admin_eventos_controller

const app = express.Router()

app.get('/get-all', async (req, res) => await eventos_controller.getAllEvents(req, res))
app.get('/find/:id', async (req, res) => await eventos_controller.findEventById(req, res))
app.post('/add-one', async (req, res) => await eventos_controller.addEvent(req, res))
app.put('/update-one/:id', async (req, res) => await eventos_controller.updateEvent(req, res))
app.patch('/deactivate-one/:id', async (req, res) => await eventos_controller.deactivateEvent(req, res))
app.patch('/reactivate-one/:id', async (req, res) => await eventos_controller.reactivateEvent(req, res))
app.delete('/delete-one/:id', async (req, res) => await eventos_controller.deleteEvent(req, res))

module.exports = {
    admin_eventos_router: app
}
