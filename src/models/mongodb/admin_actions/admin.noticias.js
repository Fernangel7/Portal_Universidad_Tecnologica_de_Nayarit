class AdminNoticiasModel {
    static async getAllNews(req, res) {
        // Database logic to get all news
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async findNewsById(req, res) {
        // Database logic to find news by id
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async addNews(req, res) {
        // Database logic to add new news
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async updateNews(req, res) {
        // Database logic to update news information
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async deleteNews(req, res) {
        // Database logic to delete news
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }
}

module.exports = {
    admin_noticias_model: {
        getAllNews: AdminNoticiasModel.getAllNews,
        findNewsById: AdminNoticiasModel.findNewsById,
        addNews: AdminNoticiasModel.addNews,
        updateNews: AdminNoticiasModel.updateNews,
        deleteNews: AdminNoticiasModel.deleteNews
    }
}
