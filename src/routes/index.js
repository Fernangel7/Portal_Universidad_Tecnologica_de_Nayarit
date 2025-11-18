const express = require('express');

const IndexController = require('../controllers/index');

const main_routes = express.Router();

main_routes.get("/", IndexController.index)
main_routes.get("/docentes", IndexController.docentes)
main_routes.get("/docentes/:slug", IndexController.docenteDetalle)
main_routes.get("/noticias", IndexController.noticias)
main_routes.get("/noticias/:slug", IndexController.noticiaDetalle)
main_routes.get("/eventos", IndexController.eventos)
main_routes.get("/eventos/:slug", IndexController.eventoDetalle)

main_routes.get("/incubadora-de-negocios", IndexController.IncBussiness)
main_routes.get("/ceelex", IndexController.Ceelex)
main_routes.get("/becas", IndexController.Becas)
main_routes.get("/ececut", IndexController.Ececut)
main_routes.get("/aviso-de-privacidad", IndexController.PrivacyAdvice)
main_routes.get("/transparencia", IndexController.Transparency)
main_routes.get("/informes-financieros", IndexController.Financial)
main_routes.get("/sistema-de-calidad", IndexController.QualitySystem)

// Additional sections
main_routes.get("/psicologia", IndexController.Psicologia)
main_routes.get("/vinculacion/extension-universitaria", IndexController.ExtensionUniversitaria)
// Keep legacy/nav paths working
main_routes.get("/vinculacion/incubadora-negocios", (req, res) => res.redirect(301, "/incubadora-de-negocios"))

main_routes.get('/google-maps/Universidad-Tecnologica-de-Nayarit', (req, res) => res.redirect('https://www.google.com/maps/place/Universidad+Tecnol%C3%B3gica+de+Nayarit/@21.4240756,-104.899325,19z/data=!4m6!3m5!1s0x84273123eaaaf2b9:0x16adf6ada41de099!8m2!3d21.4240756!4d-104.8983803!16s%2Fg%2F1wk4dch6?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D'))

module.exports = main_routes;