const crypto = require('node:crypto');
const { alumno_model } = require('../general.js');

class AdminAlumnosModel {
    static async getAllStudents() {
        try {
            const students = await alumno_model.find({}).sort({ Created_at: -1 });
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

    static async temporaryLeave(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            student.Estado = false;
            student.TipoBaja = 'temporal';
            student.FechaBaja = Date.now();
            student.Updated_at = Date.now();
            await student.save();
            return { status: 200, msg: 'Baja temporal aplicada', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al aplicar baja temporal', data: { error: error.message } };
        }
    }

    static async definitiveLeave(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            student.Estado = false;
            student.TipoBaja = 'definitiva';
            student.FechaBaja = Date.now();
            student.Updated_at = Date.now();
            await student.save();
            return { status: 200, msg: 'Baja definitiva aplicada', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al aplicar baja definitiva', data: { error: error.message } };
        }
    }

    static async deleteStudentPermanently(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            await alumno_model.deleteOne({ Matricula: matricula });
            return { status: 200, msg: 'Alumno eliminado permanentemente', data: null };
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar alumno permanentemente', data: { error: error.message } };
        }
    }

    static async reactivateStudent(matricula) {
        try {
            const student = await alumno_model.findOne({ Matricula: matricula });
            if (!student) return { status: 404, msg: 'Alumno no encontrado', data: null };
            
            // No permitir reactivar si es baja definitiva
            if (student.TipoBaja === 'definitiva') {
                return { status: 403, msg: 'No se puede reactivar un alumno con baja definitiva', data: null };
            }
            
            student.Estado = true;
            student.TipoBaja = null;
            student.FechaBaja = null;
            student.Updated_at = Date.now();
            await student.save();
            return { status: 200, msg: 'Alumno reactivado', data: { student } };
        } catch (error) {
            return { status: 500, msg: 'Error al reactivar alumno', data: { error: error.message } };
        }
    }
}

module.exports = {
    admin_alumnos_model: {
        getAllStudents: AdminAlumnosModel.getAllStudents,
        findStudentByMatricula: AdminAlumnosModel.findStudentByMatricula,
        addStudent: AdminAlumnosModel.addStudent,
        updateStudent: AdminAlumnosModel.updateStudent,
        deleteStudent: AdminAlumnosModel.deleteStudent,
        temporaryLeave: AdminAlumnosModel.temporaryLeave,
        definitiveLeave: AdminAlumnosModel.definitiveLeave,
        deleteStudentPermanently: AdminAlumnosModel.deleteStudentPermanently,
        reactivateStudent: AdminAlumnosModel.reactivateStudent
    }
}