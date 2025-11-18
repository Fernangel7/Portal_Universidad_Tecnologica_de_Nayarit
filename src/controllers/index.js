const navigationLinks = require('../data/navigation.js')
const images = require("../data/images.js")
const { admin_carreras_model } = require('../models/mongodb/admin_actions/admin.carreras.js')
const { admin_noticias_model } = require('../models/mongodb/admin_actions/admin.noticias.js')
const { admin_eventos_model } = require('../models/mongodb/admin_actions/admin.eventos.js')
const { admin_docentes_model } = require('../models/mongodb/admin_actions/admin.docentes.js')
const { noticia_model, evento_model, docente_model, carrera_model, alumno_model } = require('../models/mongodb/general.js')

const { loading_delay, website_name, InscriptionProcess } = require("../utils/utils-globals.js")

const img = images.placeholderImages

const slugify = (s) => s ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''

// Lightweight in-memory cache with short TTL to speed up homepage
const HOME_CACHE_TTL_MS = parseInt(process.env.HOME_CACHE_TTL_MS || '60000')
let careersCache = { data: null, expires: 0 }
let newsCache = { data: null, expires: 0 }
let eventsCache = { data: null, expires: 0 }

const getCareersData = async () => {
    try {
        const now = Date.now()
        if (careersCache.data && careersCache.expires > now) return careersCache.data
        const data = await carrera_model.find({ Estado: true })
            .select('Nombre Slug ShortDescription ImageUrl')
            .sort({ Created_at: -1 })
            .lean()
            .maxTimeMS(800)
        careersCache = { data, expires: now + HOME_CACHE_TTL_MS }
        return data
    } catch (error) {
        return []
    }
}

const getNewsData = async () => {
    try {
        const now = Date.now()
        if (newsCache.data && newsCache.expires > now) return newsCache.data
        const data = await noticia_model.find({ Estado: true })
            .select('Titulo Slug Resumen ImageUrl Publicada_en')
            .sort({ Publicada_en: -1 })
            .lean()
            .maxTimeMS(800)
        newsCache = { data, expires: now + HOME_CACHE_TTL_MS }
        return data
    } catch { return [] }
}

const getEventsData = async () => {
    try {
        const now = Date.now()
        if (eventsCache.data && eventsCache.expires > now) return eventsCache.data
        const data = await evento_model.find({ Estado: true })
            .select('Titulo Slug Descripcion ImageUrl FechaInicio FechaFin')
            .sort({ FechaInicio: -1 })
            .lean()
            .maxTimeMS(800)
        eventsCache = { data, expires: now + HOME_CACHE_TTL_MS }
        return data
    } catch { return [] }
}

// Build careers navigation items (max 12), normalizing slugs
const getCareersForNav = async () => {
    const careersData = await getCareersData()
    return careersData.slice(0, 12).map(c => {
        const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
        return {
            title: c.Nombre,
            href: `/carreras/${s}`,
            description: c.ShortDescription || ''
        }
    })
}

module.exports = class IndexController {

    static async index (req, res) {
        const FEATURED_LIMIT = parseInt(process.env.HOME_FEATURED_CAREERS_MAX || '6')
        
        // Ejecutar todas las consultas en paralelo
        const [careersData, newsData, eventsData] = await Promise.all([
            getCareersData(),
            getNewsData(),
            getEventsData()
        ])

        // Procesar carreras para navegación (máximo 12)
        const careersForNav = careersData.slice(0, 12).map(c => {
            const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
            return {
                title: c.Nombre,
                href: `/carreras/${s}`,
                description: c.ShortDescription || ''
            }
        })

        // Procesar carreras destacadas
        const featured = careersData.slice(0, FEATURED_LIMIT).map(c => {
            const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
            return {
                slug: s,
                name: c.Nombre,
                shortDescription: c.ShortDescription || '',
                programImage: { imageUrl: c.ImageUrl || img[0]?.imageUrl, description: c.Nombre }
            }
        })

        // Procesar noticias y eventos (sin límite)
        const homeNews = (newsData || []).map(n => ({
            titulo: n.Titulo,
            slug: n.Slug,
            resumen: n.Resumen,
            imageUrl: n.ImageUrl,
            publicada_en: n.Publicada_en
        }))

        const homeEvents = (eventsData || []).map(e => ({
            titulo: e.Titulo,
            slug: e.Slug,
            descripcion: e.Descripcion,
            imageUrl: e.ImageUrl,
            fechaInicio: e.FechaInicio,
            fechaFin: e.FechaFin
        }))

        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav

        await res.render('index', {
            title: website_name,
            heroImage: { ...img[0] },
            featuredPrograms: featured,
            newsItems: homeNews,
            eventItems: homeEvents,
            campusLifeImage: { ...img[0] },
            navigationLinks: navLinks.navigationLinks,
            delay: 0,
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
                teachers = (result.data.teachers || [])
                    .filter(t => t && t.Estado === true)
                    .map(t => ({
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
            IscProcess: InscriptionProcess,
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
                news = (result.data.news || [])
                    .filter(n => n && n.Estado === true)
                    .map(n => ({
                    titulo: n.Titulo,
                    slug: n.Slug,
                    resumen: n.Resumen,
                    imageUrl: n.ImageUrl,
                    publicada_en: n.Publicada_en
                }))
            }
        } catch (e) {}
        const heroImage = img.find(i => i.id === 'news-hero') || img[0] || null
        await res.render('noticias', { title: website_name, navigationLinks: navLinks.navigationLinks, IscProcess: InscriptionProcess, heroImage, news })
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
            IscProcess: InscriptionProcess,
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
                events = (result.data.events || [])
                    .filter(ev => ev && ev.Estado === true)
                    .map(ev => ({
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
        await res.render('eventos', { title: website_name, navigationLinks: navLinks.navigationLinks, IscProcess: InscriptionProcess, events })
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

        // Obtener todos los eventos activos para la vista general embebida
        let allEvents = []
        try {
            const result = await admin_eventos_model.getAllEvents()
            if (result.status === 200) {
                allEvents = (result.data.events || [])
                    .filter(ev2 => ev2 && ev2.Estado === true)
                    .map(ev2 => ({
                        titulo: ev2.Titulo,
                        slug: ev2.Slug,
                        fechaInicio: ev2.FechaInicio,
                        fechaFin: ev2.FechaFin,
                        ubicacion: ev2.Ubicacion,
                        imageUrl: ev2.ImageUrl,
                        descripcion: ev2.Descripcion
                    }))
            }
        } catch (e) {}
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
            },
            allEvents
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

        let kpis = { careers: 0, students: 0, teachers: 0, news: 0 }
        try {
            const [careers, students, teachers, news] = await Promise.all([
                carrera_model.countDocuments({ Estado: true }).catch(() => 0),
                alumno_model.countDocuments({ Estado: true }).catch(() => 0),
                docente_model.countDocuments({ Estado: true }).catch(() => 0),
                noticia_model.countDocuments({ Estado: true }).catch(() => 0)
            ])
            kpis = { careers, students, teachers, news }
        } catch (e) { /* ignore and keep zeros */ }

        await res.render('sistema-de-calidad', {
            title: website_name,
            heroImage: img.find(i => i.id === 'quality-hero') || null,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess,
            kpis
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

    // Transparencia sub-sections
    static async MarcoNormativo (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('marco-normativo', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async EstructuraOrganizacional (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('estructura-organizacional', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Convocatorias (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('convocatorias', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Infraestructura (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('infraestructura', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }

    static async Indicadores (req, res) {
        const careersForNav = await getCareersForNav()
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        await res.render('indicadores', {
            title: website_name,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }
}