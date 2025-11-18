const carreras_model = require('../../models/mongodb/admin_actions/admin.carreras.js').admin_carreras_model

class AdminCarrerasController {
    static async getAllCareers(req, res) {
        try {
            const result = await carreras_model.getAllCareers();
            return res.status(result.status).json(result);
        } catch (error) {
            console.error('Controller error getting careers:', error);
            return res.status(500).json({
                status: 500,
                msg: 'Error interno del servidor',
                data: null
            });
        }
    }

    static async findCareerById(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    msg: 'ID de carrera requerido',
                    data: null
                });
            }

            const result = await carreras_model.findCareerById(id);
            return res.status(result.status).json(result);
        } catch (error) {
            console.error('Controller error finding career:', error);
            return res.status(500).json({
                status: 500,
                msg: 'Error interno del servidor',
                data: null
            });
        }
    }

    static async addCareer(req, res) {
        try {
            const { nombre, slug, shortDescription, fullDescription, imageUrl, workField, competencies } = req.body;

            // Validation
            if (!nombre || !slug) {
                return res.status(400).json({
                    status: 400,
                    msg: 'Nombre y slug son campos requeridos',
                    data: null
                });
            }

            // Parse study plan from form
            const studyPlan = [];
            const termKeys = Object.keys(req.body).filter(key => key.startsWith('term-'));
            termKeys.forEach(key => {
                const termNumber = parseInt(key.replace('term-', ''));
                if (req.body[key] && req.body[key].trim()) {
                    studyPlan.push({
                        term: termNumber,
                        content: req.body[key].trim()
                    });
                }
            });

            const careerData = {
                Nombre: nombre,
                Slug: slug,
                ShortDescription: shortDescription,
                FullDescription: fullDescription,
                ImageUrl: imageUrl,
                WorkField: workField,
                Competencies: competencies,
                StudyPlan: studyPlan
            };

            const result = await carreras_model.addCareer(careerData);
            
            if (result.status === 201) {
                // Redirect to careers list on success
                return res.redirect('/admin/carreras');
            }
            
            return res.status(result.status).json(result);
        } catch (error) {
            console.error('Controller error adding career:', error);
            return res.status(500).json({
                status: 500,
                msg: 'Error interno del servidor',
                data: { error: error.message }
            });
        }
    }

    static async updateCareer(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    msg: 'ID de carrera requerido',
                    data: null
                });
            }

            const { nombre, slug, shortDescription, fullDescription, imageUrl, workField, competencies } = req.body;

            // Parse study plan from form
            const studyPlan = [];
            const termKeys = Object.keys(req.body).filter(key => key.startsWith('term-'));
            termKeys.forEach(key => {
                const termNumber = parseInt(key.replace('term-', ''));
                if (req.body[key] && req.body[key].trim()) {
                    studyPlan.push({
                        term: termNumber,
                        content: req.body[key].trim()
                    });
                }
            });

            const careerData = {};
            if (nombre) careerData.Nombre = nombre;
            if (slug) careerData.Slug = slug;
            if (shortDescription) careerData.ShortDescription = shortDescription;
            if (fullDescription) careerData.FullDescription = fullDescription;
            if (imageUrl) careerData.ImageUrl = imageUrl;
            if (workField) careerData.WorkField = workField;
            if (competencies) careerData.Competencies = competencies;
            if (studyPlan.length > 0) careerData.StudyPlan = studyPlan;

            const result = await carreras_model.updateCareer(id, careerData);
            
            if (result.status === 200) {
                // Redirect to careers list on success
                return res.redirect('/admin/carreras');
            }
            
            return res.status(result.status).json(result);
        } catch (error) {
            console.error('Controller error updating career:', error);
            return res.status(500).json({
                status: 500,
                msg: 'Error interno del servidor',
                data: { error: error.message }
            });
        }
    }

    static async deleteCareer(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    status: 400,
                    msg: 'ID de carrera requerido',
                    data: null
                });
            }

            const result = await carreras_model.deleteCareer(id);
            return res.status(result.status).json(result);
        } catch (error) {
            console.error('Controller error deleting career:', error);
            return res.status(500).json({
                status: 500,
                msg: 'Error interno del servidor',
                data: null
            });
        }
    }
}

module.exports = {
    admin_carreras_controller: {
        getAllCareers: AdminCarrerasController.getAllCareers,
        findCareerById: AdminCarrerasController.findCareerById,
        addCareer: AdminCarrerasController.addCareer,
        updateCareer: AdminCarrerasController.updateCareer,
        deleteCareer: AdminCarrerasController.deleteCareer
    }
}
