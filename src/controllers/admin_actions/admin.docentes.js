const docentes_model = require('../../models/mongodb/admin_actions/admin.docentes.js').admin_docentes_model

class AdminDocentesController {
    static async getAllTeachers(req, res) {
        try {
            const result = await docentes_model.getAllTeachers();
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async findTeacherById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await docentes_model.findTeacherById(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async addTeacher(req, res) {
        try {
            const { nombre, slug, cargo, departamento, shortBio, fullBio, imageUrl } = req.body;
            if (!nombre) return res.status(400).json({ status: 400, msg: 'Nombre requerido', data: null });
            const data = { Nombre: nombre, Slug: slug, Cargo: cargo, Departamento: departamento, ShortBio: shortBio, FullBio: fullBio, ImageUrl: imageUrl };
            const result = await docentes_model.addTeacher(data);
            if (result.status === 201) return res.redirect('/admin/docentes');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async updateTeacher(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const { nombre, slug, cargo, departamento, shortBio, fullBio, imageUrl } = req.body;
            const data = {};
            if (nombre) data.Nombre = nombre;
            if (slug) data.Slug = slug;
            if (cargo) data.Cargo = cargo;
            if (departamento) data.Departamento = departamento;
            if (shortBio) data.ShortBio = shortBio;
            if (fullBio) data.FullBio = fullBio;
            if (imageUrl) data.ImageUrl = imageUrl;
            const result = await docentes_model.updateTeacher(id, data);
            if (result.status === 200) return res.redirect('/admin/docentes');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async deleteTeacher(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await docentes_model.deleteTeacher(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }
}

module.exports = {
    admin_docentes_controller: {
        getAllTeachers: AdminDocentesController.getAllTeachers,
        findTeacherById: AdminDocentesController.findTeacherById,
        addTeacher: AdminDocentesController.addTeacher,
        updateTeacher: AdminDocentesController.updateTeacher,
        deleteTeacher: AdminDocentesController.deleteTeacher
    }
}
