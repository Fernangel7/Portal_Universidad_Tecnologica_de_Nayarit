const express = require('express');

const cookiesMiddleware = require('../middlewares/cookies')

const IndexController = require('../controllers/index')

const navigationLinks = require('../data/navigation')

const main_routes = express.Router();

main_routes.get("/", cookiesMiddleware, IndexController.index)

main_routes.get("/docentes", async (req, res) => {
    res.render("docentes", { ...navigationLinks })
})

module.exports = main_routes;