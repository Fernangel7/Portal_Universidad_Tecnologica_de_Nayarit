const alumnos_model = require('../../models/mongodb/admin_actions/admin.alumnos.js').admin_alumnos_model

class AdminAlumnosController {
    static async getAllStudents(req, res) {
        try {
            const result = await alumnos_model.getAllStudents();
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async findStudentByMatricula(req, res) {
        try {
            const { matricula } = req.params;
            if (!matricula) return res.status(400).json({ status: 400, msg: 'Matrícula requerida', data: null });
            const result = await alumnos_model.findStudentByMatricula(matricula);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async addStudent(req, res) {
        try {
            const { matricula, nombre, apellidos, correo, carreraSlug } = req.body;
            if (!matricula || !nombre) return res.status(400).json({ status: 400, msg: 'Matrícula y nombre requeridos', data: null });
            const data = { Matricula: matricula, Nombre: nombre, Apellidos: apellidos, Correo: correo, CarreraSlug: carreraSlug };
            const result = await alumnos_model.addStudent(data);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async updateStudent(req, res) {
        try {
            const { matricula } = req.params;
            if (!matricula) return res.status(400).json({ status: 400, msg: 'Matrícula requerida', data: null });
            const { nombre, apellidos, correo, carreraSlug, estado } = req.body;
            const data = {};
            if (nombre) data.Nombre = nombre;
            if (apellidos) data.Apellidos = apellidos;
            if (correo) data.Correo = correo;
            if (carreraSlug) data.CarreraSlug = carreraSlug;
            if (estado !== undefined) data.Estado = estado === 'on';
            const result = await alumnos_model.updateStudent(matricula, data);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async deleteStudent(req, res) {
        try {
            const { matricula } = req.params;
            if (!matricula) return res.status(400).json({ status: 400, msg: 'Matrícula requerida', data: null });
            const result = await alumnos_model.deleteStudent(matricula);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }
}

module.exports = {
    admin_alumnos_controller: {
        getAllStudents: AdminAlumnosController.getAllStudents,
        findStudentByMatricula: AdminAlumnosController.findStudentByMatricula,
        addStudent: AdminAlumnosController.addStudent,
        updateStudent: AdminAlumnosController.updateStudent,
        deleteStudent: AdminAlumnosController.deleteStudent
    }
}