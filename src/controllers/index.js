const navigationLinks = require('../data/navigation.js')
const images = require("../data/images.js")
const newsItems = require("../data/news_items.js")
const { admin_carreras_model } = require('../models/mongodb/admin_actions/admin.carreras.js')
const { admin_noticias_model } = require('../models/mongodb/admin_actions/admin.noticias.js')
const { admin_eventos_model } = require('../models/mongodb/admin_actions/admin.eventos.js')
const { admin_docentes_model } = require('../models/mongodb/admin_actions/admin.docentes.js')
const { noticia_model, evento_model, docente_model } = require('../models/mongodb/general.js')

const { loading_delay, website_name, InscriptionProcess } = require("../utils/utils-globals.js")

const img = images.placeholderImages

const slugify = (s) => s ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''

const getCareersForNav = async () => {
    try {
        const result = await admin_carreras_model.getAllCareers()
        if (result.status === 200) {
            return result.data.careers.slice(0, 12).map(c => {
                const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
                return {
                    title: c.Nombre,
                    href: `/carreras/${s}`,
                    description: c.ShortDescription || ''
                }
            })
        }
    } catch (error) {
    }
    return []
}

const getFeaturedPrograms = async (limit) => {
    try {
        const result = await admin_carreras_model.getAllCareers()
        if (result.status === 200) {
            return result.data.careers.slice(0, limit).map(c => {
                const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
                return {
                    slug: s,
                    name: c.Nombre,
                    shortDescription: c.ShortDescription || '',
                    programImage: { imageUrl: c.ImageUrl || img[0]?.imageUrl, description: c.Nombre }
                }
            })
        }
    } catch (error) {
    }
    return []
}

module.exports = class IndexController {

    static async index (req, res) {
        const careersForNav = await getCareersForNav()
        const FEATURED_LIMIT = parseInt(process.env.HOME_FEATURED_CAREERS_MAX || '6')
        const featured = await getFeaturedPrograms(FEATURED_LIMIT)
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('index', {
            title: website_name,
            heroImage: { ...img[0] },
            featuredPrograms: featured,
            newsItems: [...newsItems],
            campusLifeImage: { ...img[0] },
            navigationLinks: navLinks.navigationLinks,
            delay: loading_delay,
            IscProcess: InscriptionProcess
        })
    }

    static async docentes (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let teachers = []
        try {
            const result = await admin_docentes_model.getAllTeachers()
            if (result.status === 200) {
                teachers = result.data.teachers.map(t => ({
                    nombre: t.Nombre,
                    slug: t.Slug,
                    cargo: t.Cargo,
                    departamento: t.Departamento,
                    shortBio: t.ShortBio,
                    imageUrl: t.ImageUrl
                }))
            }
        } catch (e) {}
        await res.render('docentes', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess,
            teachers
        })
    }

    static async docenteDetalle (req, res) {
        const { slug } = req.params
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let teacher = null
        try {
            teacher = await docente_model.findOne({ Slug: slug, Estado: true }).lean()
        } catch (e) {}
        if (!teacher) return res.status(404).render('404', { title: 'Docente no encontrado' })
        await res.render('docente-detail', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            teacher: {
                nombre: teacher.Nombre,
                cargo: teacher.Cargo,
                departamento: teacher.Departamento,
                fullBio: teacher.FullBio,
                imageUrl: teacher.ImageUrl
            }
        })
    }

    static async noticias (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let news = []
        try {
            const result = await admin_noticias_model.getAllNews()
            if (result.status === 200) {
                news = result.data.news.map(n => ({
                    titulo: n.Titulo,
                    slug: n.Slug,
                    resumen: n.Resumen,
                    imageUrl: n.ImageUrl,
                    publicada_en: n.Publicada_en
                }))
            }
        } catch (e) {}
        await res.render('noticias', { title: website_name, navigationLinks: navLinks.navigationLinks, news })
    }

    static async noticiaDetalle (req, res) {
        const { slug } = req.params
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let item = null
        try { item = await noticia_model.findOne({ Slug: slug, Estado: true }).lean() } catch (e) {}
        if (!item) return res.status(404).render('404', { title: 'Noticia no encontrada' })
        await res.render('noticia-detail', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            noticia: {
                titulo: item.Titulo,
                resumen: item.Resumen,
                contenido: item.Contenido,
                imageUrl: item.ImageUrl,
                publicada_en: item.Publicada_en
            }
        })
    }

    static async eventos (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let events = []
        try {
            const result = await admin_eventos_model.getAllEvents()
            if (result.status === 200) {
                events = result.data.events.map(ev => ({
                    titulo: ev.Titulo,
                    slug: ev.Slug,
                    fechaInicio: ev.FechaInicio,
                    fechaFin: ev.FechaFin,
                    ubicacion: ev.Ubicacion,
                    imageUrl: ev.ImageUrl,
                    descripcion: ev.Descripcion
                }))
            }
        } catch (e) {}
        await res.render('eventos', { title: website_name, navigationLinks: navLinks.navigationLinks, events })
    }

    static async eventoDetalle (req, res) {
        const { slug } = req.params
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        let ev = null
        try { ev = await evento_model.findOne({ Slug: slug, Estado: true }).lean() } catch (e) {}
        if (!ev) return res.status(404).render('404', { title: 'Evento no encontrado' })
        await res.render('evento-detail', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            evento: {
                titulo: ev.Titulo,
                descripcion: ev.Descripcion,
                contenido: ev.Contenido,
                fechaInicio: ev.FechaInicio,
                fechaFin: ev.FechaFin,
                ubicacion: ev.Ubicacion,
                imageUrl: ev.ImageUrl
            }
        })
    }

    static async IncBussiness (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('incubadora-de-negocios', {
            title: website_name,
            heroImage: img.find(i => i.id === 'incubator-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Ceelex (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('ceelex', {
            title: website_name,
            heroImage: img.find(i => i.id === 'ceelex-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Becas (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('becas', {
            title: website_name,
            heroImage: img.find(i => i.id === 'becas-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Ececut (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('ececut', {
            title: website_name,
            heroImage: img.find(i => i.id === 'ececut-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async PrivacyAdvice (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('aviso-de-privacidad', {
            title: website_name,
            heroImage: img.find(i => i.id === 'privacy-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Transparency (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('transparencia', {
            title: website_name,
            heroImage: img.find(i => i.id === 'transparency-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Financial (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('informes-financieros', {
            title: website_name,
            heroImage: img.find(i => i.id === 'financial-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async QualitySystem (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('sistema-de-calidad', {
            title: website_name,
            heroImage: img.find(i => i.id === 'quality-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async Psicologia (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('psicologia', {
            title: website_name,
            heroImage: img.find(i => i.id === 'psicologia-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }

    static async ExtensionUniversitaria (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('extension-universitaria', {
            title: website_name,
            heroImage: img.find(i => i.id === 'extension-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        });
    }
}