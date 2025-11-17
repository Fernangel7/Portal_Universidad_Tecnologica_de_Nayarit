const express = require('express')

const noticias_controller = require('../../controllers/admin_actions/admin.noticias.js').admin_noticias_controller

const app = express.Router()

app.get('/get-all', async (req, res) => await noticias_controller.getAllNews(req, res))
app.get('/find/:id', async (req, res) => await noticias_controller.findNewsById(req, res))
app.post('/add-one', async (req, res) => await noticias_controller.addNews(req, res))
app.put('/update-one/:id', async (req, res) => await noticias_controller.updateNews(req, res))
app.delete('/delete-one/:id', async (req, res) => await noticias_controller.deleteNews(req, res))

module.exports = {
    admin_noticias_router: app
}
