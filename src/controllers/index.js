const navigationLinks = require('../data/navigation.js')
const images = require("../data/images.js")
const featuredPrograms = require("../data/featured_programs.js")
const newsItems = require("../data/news_items.js")

const { loading_delay, website_name, InscriptionProcess } = require("../utils/utils-globals.js")

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
        await res.render('incubadora-de-negocios', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Ceelex (req, res) {
        await res.render('ceelex', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Becas (req, res) {
        await res.render('becas', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Ececut (req, res) {
        await res.render('ececut', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async PrivacyAdvice (req, res) {
        await res.render('aviso-de-privacidad', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Transparency (req, res) {
        await res.render('transparencia', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Financial (req, res) {
        await res.render('informes-financieros', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async QualitySystem (req, res) {
        await res.render('sistema-de-calidad', {
            title: website_name,
            ...navigationLinks,
            IscProcess: InscriptionProcess
        });
    }
}