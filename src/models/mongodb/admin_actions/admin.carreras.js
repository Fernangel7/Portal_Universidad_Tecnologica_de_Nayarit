class AdminCarrerasModel {
    static async getAllCareers(req, res) {
        // Database logic to get all careers
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async findCareerById(req, res) {
        // Database logic to find a career by id
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async addCareer(req, res) {
        // Database logic to add a new career
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async updateCareer(req, res) {
        // Database logic to update a career's information
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async deleteCareer(req, res) {
        // Database logic to delete a career
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }
}

module.exports = {
    admin_carreras_model: {
        getAllCareers: AdminCarrerasModel.getAllCareers,
        findCareerById: AdminCarrerasModel.findCareerById,
        addCareer: AdminCarrerasModel.addCareer,
        updateCareer: AdminCarrerasModel.updateCareer,
        deleteCareer: AdminCarrerasModel.deleteCareer
    }
}
