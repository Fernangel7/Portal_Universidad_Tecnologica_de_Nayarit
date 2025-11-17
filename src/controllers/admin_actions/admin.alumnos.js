const alumnos_model = require('../../models/mongodb/admin_actions/admin.alumnos.js').admin_alumnos_model

class AdminAlumnosController {
    static async getAllStudents(req, res) {
        // Logic to get all students
    }

    static async findStudentByMatricula(req, res) {
        // Logic to find a student by matricula
    }

    static async addStudent(req, res) {
        // Logic to add a new student
    }

    static async updateStudent(req, res) {
        // Logic to update a student's information
    }

    static async deleteStudent(req, res) {
        // Logic to delete a student
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