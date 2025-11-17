const carreras_model = require('../../models/mongodb/admin_actions/admin.carreras.js').admin_carreras_model

class AdminCarrerasController {
    static async getAllCareers(req, res) {
        // Logic to get all careers
    }

    static async findCareerById(req, res) {
        // Logic to find a career by id
    }

    static async addCareer(req, res) {
        // Logic to add a new career
    }

    static async updateCareer(req, res) {
        // Logic to update a career's information
    }

    static async deleteCareer(req, res) {
        // Logic to delete a career
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
