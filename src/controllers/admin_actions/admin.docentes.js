const docentes_model = require('../../models/mongodb/admin_actions/admin.docentes.js').admin_docentes_model

class AdminDocentesController {
    static async getAllTeachers(req, res) {
        // Logic to get all teachers
    }

    static async findTeacherById(req, res) {
        // Logic to find a teacher by id
    }

    static async addTeacher(req, res) {
        // Logic to add a new teacher
    }

    static async updateTeacher(req, res) {
        // Logic to update a teacher's information
    }

    static async deleteTeacher(req, res) {
        // Logic to delete a teacher
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
