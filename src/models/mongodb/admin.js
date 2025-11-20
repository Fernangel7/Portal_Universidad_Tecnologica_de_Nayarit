const bcrypt = require('bcrypt')

const { admin_model } = require('./general.js')

class admin_render_model {

}

class admin_mongo_model {
    static async login_verify(data) {
        if (!data) return { status: 204, message: 'No content.' }

        // Lógica de verificación de login aquí
        const response = await admin_model.findOne({ Username: data.Username }, { _id: 0, Username: 1, Password: 1 })
        if (response) {
            try {
                if (await bcrypt.compare(data.Password, response.Password)) {
                    return {
                        status: 200,
                        message: 'Usuario verificado.',
                        refreshToken: {
                            Username: response.Username,
                            Password: response.Password
                        }
                    }
                }
            } catch (e) { }
        }
        return { status: 401, message: 'Usuario no encontrado.' }
    }
}

module.exports = {
    admin_render_model,
    admin_mongo_model
}