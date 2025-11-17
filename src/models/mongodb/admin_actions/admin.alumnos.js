class AdminAlumnosModel {
    static async getAllStudents(req, res) {
        // Database logic to get all students
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async findStudentByMatricula(req, res) {
        // Database logic to find a student by matricula
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async addStudent(req, res) {
        // Database logic to add a new student
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async updateStudent(req, res) {
        // Database logic to update a student's information
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
        }
    }

    static async deleteStudent(req, res) {
        // Database logic to delete a student
        return {
            status: 200,
            msg: 'all its ok',
            data: {
                
            }
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