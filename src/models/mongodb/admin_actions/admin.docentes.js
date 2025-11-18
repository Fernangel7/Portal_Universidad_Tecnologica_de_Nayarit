const crypto = require('node:crypto');
const { docente_model } = require('../general.js');

const slugify = (str) => (str || '').toString().toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

class AdminDocentesModel {
    static async getAllTeachers() {
        try {
            const teachers = await docente_model.find({ Estado: true }).sort({ Created_at: -1 });
            return { status: 200, msg: 'Docentes obtenidos', data: { teachers } };
        } catch (error) {
            return { status: 500, msg: 'Error al obtener docentes', data: { error: error.message } };
        }
    }

    static async findTeacherById(id) {
        try {
            const teacher = await docente_model.findOne({ UUID: id, Estado: true });
            if (!teacher) return { status: 404, msg: 'Docente no encontrado', data: null };
            return { status: 200, msg: 'Docente encontrado', data: { teacher } };
        } catch (error) {
            return { status: 500, msg: 'Error al buscar docente', data: { error: error.message } };
        }
    }

    static async addTeacher(data) {
        try {
            const slug = data.Slug ? data.Slug : slugify(data.Nombre);
            const existing = await docente_model.findOne({ Slug: slug });
            if (existing) return { status: 400, msg: 'Ya existe un docente con ese slug', data: null };

            const teacher = new docente_model({
                UUID: crypto.randomUUID(),
                Nombre: data.Nombre,
                Slug: slug,
                Cargo: data.Cargo || '',
                Departamento: data.Departamento || '',
                ShortBio: data.ShortBio || '',
                FullBio: data.FullBio || '',
                ImageUrl: data.ImageUrl || '',
                Estado: true,
                Created_at: Date.now(),
                Updated_at: Date.now()
            });
            await teacher.save();
            return { status: 201, msg: 'Docente creado', data: { teacher } };
        } catch (error) {
            return { status: 500, msg: 'Error al crear docente', data: { error: error.message } };
        }
    }

    static async updateTeacher(id, data) {
        try {
            const teacher = await docente_model.findOne({ UUID: id });
            if (!teacher) return { status: 404, msg: 'Docente no encontrado', data: null };

            if (data.Slug && data.Slug !== teacher.Slug) {
                const exists = await docente_model.findOne({ Slug: data.Slug });
                if (exists) return { status: 400, msg: 'Slug en uso', data: null };
                teacher.Slug = data.Slug;
            }

            ['Nombre','Cargo','Departamento','ShortBio','FullBio','ImageUrl'].forEach(f => {
                if (data[f] !== undefined) teacher[f] = data[f];
            });
            teacher.Updated_at = Date.now();
            await teacher.save();
            return { status: 200, msg: 'Docente actualizado', data: { teacher } };
        } catch (error) {
            return { status: 500, msg: 'Error al actualizar docente', data: { error: error.message } };
        }
    }

    static async deleteTeacher(id) {
        try {
            const teacher = await docente_model.findOne({ UUID: id });
            if (!teacher) return { status: 404, msg: 'Docente no encontrado', data: null };
            teacher.Estado = false;
            teacher.Updated_at = Date.now();
            await teacher.save();
            return { status: 200, msg: 'Docente eliminado', data: { teacher } };
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar docente', data: { error: error.message } };
        }
    }
}

module.exports = {
    admin_docentes_model: {
        getAllTeachers: AdminDocentesModel.getAllTeachers,
        findTeacherById: AdminDocentesModel.findTeacherById,
        addTeacher: AdminDocentesModel.addTeacher,
        updateTeacher: AdminDocentesModel.updateTeacher,
        deleteTeacher: AdminDocentesModel.deleteTeacher
    }
}
