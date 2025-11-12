const express = require('express');

const cookiesMiddleware = require('../middlewares/cookies')

const IndexController = require('../controllers/index')

const main_routes = express.Router();

main_routes.get("/", cookiesMiddleware, IndexController.index)
main_routes.get("/docentes", IndexController.docentes)
main_routes.get("/incubadora-de-negocios", IndexController.IncBussiness)
main_routes.get("/ceelex", IndexController.Ceelex)
main_routes.get("/ececut", IndexController.Ececut)
main_routes.get("/aviso-de-privacidad", IndexController.PrivacyAdvice)
main_routes.get("/transparencia", IndexController.Transparency)
main_routes.get("/informes-financieros", IndexController.Financial)
main_routes.get("/sistema-de-calidad", IndexController.QualitySystem)

module.exports = main_routes;