const noticias_model = require('../../models/mongodb/admin_actions/admin.noticias.js').admin_noticias_model

class AdminNoticiasController {
    static async getAllNews(req, res) {
        // Logic to get all news
    }

    static async findNewsById(req, res) {
        // Logic to find news by id
    }

    static async addNews(req, res) {
        // Logic to add new news
    }

    static async updateNews(req, res) {
        // Logic to update news information
    }

    static async deleteNews(req, res) {
        // Logic to delete news
    }
}

module.exports = {
    admin_noticias_controller: {
        getAllNews: AdminNoticiasController.getAllNews,
        findNewsById: AdminNoticiasController.findNewsById,
        addNews: AdminNoticiasController.addNews,
        updateNews: AdminNoticiasController.updateNews,
        deleteNews: AdminNoticiasController.deleteNews
    }
}
