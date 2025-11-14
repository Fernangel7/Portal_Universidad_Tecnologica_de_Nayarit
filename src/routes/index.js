const express = require('express');

const IndexController = require('../controllers/index');

const main_routes = express.Router();

main_routes.get("/", IndexController.index)
main_routes.get("/docentes", IndexController.docentes)

main_routes.get("/incubadora-de-negocios", DeniedAccess, IndexController.IncBussiness)
main_routes.get("/ceelex", DeniedAccess, IndexController.Ceelex)
main_routes.get("/ececut", DeniedAccess, IndexController.Ececut)
main_routes.get("/aviso-de-privacidad", DeniedAccess, IndexController.PrivacyAdvice)
main_routes.get("/transparencia", DeniedAccess, IndexController.Transparency)
main_routes.get("/informes-financieros", DeniedAccess, IndexController.Financial)
main_routes.get("/sistema-de-calidad", DeniedAccess, IndexController.QualitySystem)

main_routes.get('/google-maps/Universidad-Tecnologica-de-Nayarit', (req, res) => res.redirect('https://www.google.com/maps/place/Universidad+Tecnol%C3%B3gica+de+Nayarit/@21.4240756,-104.899325,19z/data=!4m6!3m5!1s0x84273123eaaaf2b9:0x16adf6ada41de099!8m2!3d21.4240756!4d-104.8983803!16s%2Fg%2F1wk4dch6?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D'))

async function DeniedAccess(req, res) {
    res.status(403).render('403', { title: "403 - Acceso denegado" } )
}

module.exports = main_routes;