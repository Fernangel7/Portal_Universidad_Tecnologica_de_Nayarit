const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const { BCRYPT_SALT_ROUNDS } = require('../../config/config-globals.js')

// Define schema locally to keep scope isolated to aspirantes
const { Schema, model } = mongoose

const aspirante_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    Preficha: { type: String, required: true, unique: true },
    Nombre: { type: String, required: true },
    Apellidos: { type: String, default: '' },
    Correo: { type: String, default: '' },
    Telefono: { type: String, default: '' },
    CarreraSlug: { type: String, default: '' },
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true }, // hashed
    Estado: { type: Boolean, default: true },
    Created_at: { type: Date, default: Date.now },
    Updated_at: { type: Date, default: Date.now },
    Aditional_info: {}
})

const aspirante_model_mongoose = model('AspirantePreRegistro', aspirante_schema)

class AspirantesModel {
    static async generateCredentials(baseUsername) {
        const usernameBase = (baseUsername || 'aspirante').toLowerCase().replace(/[^a-z0-9]/g, '') || 'aspirante'

        // ensure unique username
        let username = usernameBase
        let suffix = 0
        // try a few times to find a unique username
        /* eslint-disable no-await-in-loop */
        while (await aspirante_model_mongoose.findOne({ Username: username })) {
            suffix += 1
            username = `${usernameBase}${suffix}`
        }

        // random password 10 chars
        const plainPassword = crypto.randomBytes(6).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
        const rounds = parseInt(BCRYPT_SALT_ROUNDS) || 10
        const hash = await bcrypt.hash(plainPassword, rounds)

        return { username, plainPassword, hash }
    }

    static async createPreRegistro(payload) {
        try {
            const uuid = crypto.randomUUID()
            const preficha = `PF-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`

            const baseUserFromMail = (payload.Correo || '').split('@')[0]
            const { username, plainPassword, hash } = await AspirantesModel.generateCredentials(baseUserFromMail)

            const doc = new aspirante_model_mongoose({
                UUID: uuid,
                Preficha: preficha,
                Nombre: payload.Nombre,
                Apellidos: payload.Apellidos || '',
                Correo: payload.Correo || '',
                Telefono: payload.Telefono || '',
                CarreraSlug: payload.CarreraSlug || '',
                Username: username,
                Password: hash,
                Estado: true,
                Created_at: Date.now(),
                Updated_at: Date.now(),
                Aditional_info: payload.Aditional_info || {}
            })

            await doc.save()
            return {
                status: 201,
                msg: 'Pre-registro creado',
                data: {
                    aspirante: {
                        UUID: doc.UUID,
                        Preficha: doc.Preficha,
                        Nombre: doc.Nombre,
                        Apellidos: doc.Apellidos,
                        Correo: doc.Correo,
                        Telefono: doc.Telefono,
                        CarreraSlug: doc.CarreraSlug,
                        Username: doc.Username,
                        Created_at: doc.Created_at
                    },
                    credentials: { username: doc.Username, password: plainPassword }
                }
            }
        } catch (error) {
            return { status: 500, msg: 'Error al crear pre-registro', data: { error: error.message } }
        }
    }

    static async loginVerify({ Username, Password }) {
        try {
            const found = await aspirante_model_mongoose.findOne({ Username: Username })
            if (!found) return { status: 401, msg: 'Usuario no encontrado' }

            const ok = await bcrypt.compare(Password, found.Password)
            if (!ok) return { status: 401, msg: 'Credenciales inválidas' }

            return {
                status: 200,
                msg: 'Usuario verificado',
                data: { UUID: found.UUID, Username: found.Username }
            }
        } catch (error) {
            return { status: 500, msg: 'Error al verificar login', data: { error: error.message } }
        }
    }

    static async getByUUID(uuid) {
        try {
            const doc = await aspirante_model_mongoose.findOne({ UUID: uuid }, { _id: 0, Password: 0 })
            if (!doc) return { status: 404, msg: 'No encontrado' }
            return { status: 200, msg: 'OK', data: { aspirante: doc } }
        } catch (error) {
            return { status: 500, msg: 'Error al obtener aspirante', data: { error: error.message } }
        }
    }

    static async updatePreRegistro(uuid, payload) {
        try {
            const doc = await aspirante_model_mongoose.findOne({ UUID: uuid })
            if (!doc) return { status: 404, msg: 'No encontrado' }

            const fields = ['Nombre', 'Apellidos', 'Correo', 'Telefono', 'CarreraSlug']
            fields.forEach(k => {
                if (payload[k] !== undefined) doc[k] = payload[k]
            })
            doc.Updated_at = Date.now()
            await doc.save()
            return { status: 200, msg: 'Actualizado', data: { aspirante: { UUID: doc.UUID, Preficha: doc.Preficha, Nombre: doc.Nombre, Apellidos: doc.Apellidos, Correo: doc.Correo, Telefono: doc.Telefono, CarreraSlug: doc.CarreraSlug, Username: doc.Username } } }
        } catch (error) {
            return { status: 500, msg: 'Error al actualizar', data: { error: error.message } }
        }
    }

    static async listAll() {
        try {
            const items = await aspirante_model_mongoose.find({}, { _id: 0, Password: 0 }).sort({ Created_at: -1 }).lean()
            return { status: 200, msg: 'OK', data: { aspirantes: items } }
        } catch (error) {
            return { status: 500, msg: 'Error al listar aspirantes', data: { error: error.message } }
        }
    }
}

module.exports = {
    aspirantes_model: {
        createPreRegistro: AspirantesModel.createPreRegistro,
        loginVerify: AspirantesModel.loginVerify,
        getByUUID: AspirantesModel.getByUUID,
        updatePreRegistro: AspirantesModel.updatePreRegistro,
        listAll: AspirantesModel.listAll
    }
}