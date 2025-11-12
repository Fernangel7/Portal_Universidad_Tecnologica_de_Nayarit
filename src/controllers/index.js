const navigationLinks = require('../data/navigation.js')
const images = require("../data/images.js")
const featuredPrograms = require("../data/featured_programs.js")
const newsItems = require("../data/news_items.js")

const { loading_delay, website_name, InscriptionProcess } = require("../config/config-globals.js")

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
            IscProcess: InscriptionProcess
        })
    }

    static async docentes (req, res) {
        await res.render('docentes', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
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