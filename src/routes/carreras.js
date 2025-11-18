const express = require('express')
const carreras_routes = express.Router()
const { admin_carreras_model } = require('../models/mongodb/admin_actions/admin.carreras.js')
const navigationLinks = require('../data/navigation.js')
const images = require("../data/images.js")
const { website_name, InscriptionProcess } = require("../utils/utils-globals.js")
const slugify = (s) => s ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : ''

carreras_routes.get("/", async (req, res) => {
    try {
        const img = images.placeholderImages || []
        const allProgramsHero = img.find(i => i.id === 'all-programs-hero') || img[0] || null
        
        const result = await admin_carreras_model.getAllCareers()
        const dbPrograms = result.status === 200 ? (result.data.careers || []).filter(c => c && c.Estado === true) : []
        
        const programs = dbPrograms.map(career => {
            const s = career.Slug && career.Slug.trim() && !career.Slug.includes('://') ? career.Slug : slugify(career.Nombre)
            return {
                id: career.UUID,
                slug: s,
                name: career.Nombre,
                shortDescription: career.ShortDescription || '',
                programImage: { imageUrl: career.ImageUrl || allProgramsHero?.imageUrl, description: career.Nombre },
                programDetails: career.FullDescription || '',
                workField: career.WorkField || '',
                competencies: career.Competencies || '',
                studyPlan: career.StudyPlan || []
            }
        })

        const careersForNav = dbPrograms.slice(0, 12).map(c => {
            const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
            return {
                title: c.Nombre,
                href: `/carreras/${s}`,
                description: c.ShortDescription || ''
            }
        })
        
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav

        res.render("carreras", {
            title: website_name,
            allProgramsHero,
            programs,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    } catch (error) {
        console.error('Error fetching careers:', error)
        res.render("carreras", {
            title: website_name,
            allProgramsHero: null,
            programs: [],
            navigationLinks: navigationLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }
})

// Career detail by slug (links use program.slug)
carreras_routes.get("/:programId", async (req, res) => {
    try {
        const { programId } = req.params
        const result = await admin_carreras_model.getAllCareers()
        
        if (result.status !== 200) {
            return res.status(404).render("404", {
                title: "Programa No Encontrado",
                navigationLinks: navigationLinks.navigationLinks,
                IscProcess: InscriptionProcess
            })
        }
        
        const dbCareers = (result.data.careers || []).filter(c => c && c.Estado === true)
        const career = dbCareers.find(c => (c.Slug && c.Slug === programId) || slugify(c.Nombre) === programId)
        
        if (!career) {
            return res.status(404).render("404", {
                title: "Programa No Encontrado",
                navigationLinks: navigationLinks.navigationLinks,
                IscProcess: InscriptionProcess
            })
        }
        
        const program = {
            id: career.UUID,
            slug: career.Slug && career.Slug.trim() && !career.Slug.includes('://') ? career.Slug : slugify(career.Nombre),
            name: career.Nombre,
            shortDescription: career.ShortDescription || '',
            programImage: career.ImageUrl,
            programDetails: career.FullDescription || '',
            workField: career.WorkField || '',
            competencies: career.Competencies || '',
            studyPlan: career.StudyPlan || []
        }
        
        const careersForNav = dbCareers.slice(0, 12).map(c => {
            const s = c.Slug && c.Slug.trim() && !c.Slug.includes('://') ? c.Slug : slugify(c.Nombre)
            return {
                title: c.Nombre,
                href: `/carreras/${s}`,
                description: c.ShortDescription || ''
            }
        })
        
        const navLinks = { ...navigationLinks }
        const carrerasMenu = navLinks.navigationLinks.find(item => item.title === 'Carreras')
        if (carrerasMenu) carrerasMenu.children = careersForNav
        
        const programHeroImage = program.programImage ? { imageUrl: program.programImage, description: program.name } : null

        res.render("program-detail", {
            title: `${program.name} - ${website_name}`,
            program,
            programHeroImage,
            navigationLinks: navLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    } catch (error) {
        console.error('Error fetching career detail:', error)
        return res.status(500).render("404", {
            title: "Error al cargar programa",
            navigationLinks: navigationLinks.navigationLinks,
            IscProcess: InscriptionProcess
        })
    }
})

module.exports = carreras_routes