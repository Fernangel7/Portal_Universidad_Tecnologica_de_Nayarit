const navigationLinks = require('../models/data/navigation')
const images = require("../models/data/images")
const featuredPrograms = require("../models/data/featured_programs")
const newsItems = require("../models/data/news_items")

const { loading_delay } = require("../config/config")
const { website_name } = require("../utils/util")

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
            IscProcess: require("../config/config").InscriptionProcess
        })
    }

    static async docentes (req, res) {
        await res.render('docentes', {
            ...navigationLinks
        })
    }

    static async IncBussiness (req, res) {
        await res.render('inc_bussiness', {
            // To be implemented
        })
    }

    static async Ceelex (req, res) {
        await res.render('inc_bussiness', {
            // To be implemented
        })
    }

    static async Becas (req, res) {
        await res.redirect('/becas');
    }

    static async Ececut (req, res) {
        await res.render('ececut', {
            // To be implemented
        });
    }

    static async PrivacyAdvice (req, res) {
        await res.render('privacy', {
            // To be implemented
        });
    }

    static async Transparency (req, res) {
        await res.render('transparency', {
            // To be implemented
        });
    }

    static async Financial (req, res) {
        await res.render('financial', {
            // To be implemented
        });
    }

    static async QualitySystem (req, res) {
        await res.render('quality_system', {
            // To be implemented
        });
    }
}