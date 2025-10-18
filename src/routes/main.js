const express = require('express');
const main_routes = express.Router();

const { website_name, captalize_case } = require("../util")

const navigationLinks = require('../data/navigation')
const images = require("../data/images")
const featuredPrograms = require("../data/featured_programs")
const newsItems = require("../data/news_items")

const img = images.placeholderImages

main_routes.get("/", async (req, res) => {
    res.render('home', {
        title: website_name,
        heroImage: { ...img[0] },
        featuredPrograms: [...featuredPrograms],
        newsItems: [ ...newsItems ],
        campusLifeImage: { ...img[0] },
        ...navigationLinks
    });

})

main_routes.get("/docentes", async (req, res) => {
    res.render("docentes", { ...navigationLinks })
})

module.exports = main_routes;