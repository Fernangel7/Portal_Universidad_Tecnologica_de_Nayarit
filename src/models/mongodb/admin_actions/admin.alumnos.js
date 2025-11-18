const crypto = require('node:crypto');
const { alumno_model } = require('../general.js');

class AdminAlumnosModel {
    static async getAllStudents() {
        try {
            const students = await alumno_model.find({ Estado: true }).sort({ Created_at: -1 });
            return { status: 200, msg: 'Alumnos obtenidos', data: { students } };
        } catch (error) {
            return { status: 500, msg: 'Error al obtener alumnos', data: { error: error.message } };
        }
    }

    static async findStudentByMatricula(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            return { status: 200, msg: 'Alumno encontrado', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al buscar alumno', data: { error: error.message } };
        }
    }

    static async addStudent(data) {
        try {
            const existing = await alumno_model.findOne({ Matricula: data.Matricula });
            if (existing) return { status: 400, msg: 'Ya existe un alumno con esa matrícula', data: null };
            const student = new alumno_model({
                UUID: crypto.randomUUID(),
                Matricula: data.Matricula,
                Nombre: data.Nombre,
                Apellidos: data.Apellidos || '',
                Correo: data.Correo || '',
                CarreraSlug: data.CarreraSlug || '',
                Estado: data.Estado !== undefined ? data.Estado : true,
                Created_at: Date.now(),
                Updated_at: Date.now()
            });
            await student.save();
            return { status: 201, msg: 'Alumno creado', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al crear alumno', data: { error: error.message } };
        }
    }

    static async updateStudent(matricula, data) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            ['Nombre','Apellidos','Correo','CarreraSlug'].forEach(f => {
                if (data[f] !== undefined) student[f] = data[f];
            });
            if (data.Estado !== undefined) student.Estado = data.Estado;
            student.Updated_at = Date.now();
            await student.save();
            return { status: 200, msg: 'Alumno actualizado', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al actualizar alumno', data: { error: error.message } };
        }
    }

    static async deleteStudent(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            student.Estado = false;
            student.Updated_at = Date.now();
            await student.save();
            return { status: 200, msg: 'Alumno eliminado', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar alumno', data: { error: error.message } };
        }
    }
}

module.exports = {
    admin_alumnos_model: {
        getAllStudents: AdminAlumnosModel.getAllStudents,
        findStudentByMatricula: AdminAlumnosModel.findStudentByMatricula,
        addStudent: AdminAlumnosModel.addStudent,
        updateStudent: AdminAlumnosModel.updateStudent,
        deleteStudent: AdminAlumnosModel.deleteStudent
    }
}