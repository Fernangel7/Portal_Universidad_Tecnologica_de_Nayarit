const express = require('express')
const carreras_routes = express.Router()
const educative_offer = require("../data/educative_offer")

carreras_routes.get("/", async (req, res) => {
    res.render("carreras", {
        title: "Carreras",
        educativeOffer: [...educative_offer]
    })
})

module.exports = carreras_routes