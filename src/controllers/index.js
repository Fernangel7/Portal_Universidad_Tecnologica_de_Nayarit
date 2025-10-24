const navigationLinks = require('../data/navigation')
const images = require("../data/images")
const featuredPrograms = require("../data/featured_programs")
const newsItems = require("../data/news_items")

const { loading_delay } = require("../config")
const { website_name } = require("../util")

const img = images.placeholderImages

module.exports = class IndexController {

    static async index (req, res) {
        await res.render('index', {
            title: website_name,
            heroImage: { ...img[0] },
            featuredPrograms: [...featuredPrograms],
            newsItems: [...newsItems],
            campusLifeImage: { ...img[0] },
            ...navigationLinks,
            delay: loading_delay,
            IscProcess: require("../config").InscriptionProcess
        });
    }

    static async docentes (req, res) {
        res.render('docentes', {
            // Additional data can be passed here
        });
    }
}