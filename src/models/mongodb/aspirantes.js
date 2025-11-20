const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')

const { BCRYPT_SALT_ROUNDS } = require('../../config/config-globals.js')

// Define schema locally to keep scope isolated to aspirantes
const { Schema, model } = mongoose

const aspirante_schema = new Schema({
    UUID: { type: String, required: true, unique: true },
    // Preficha ahora opcional para permitir eliminación por parte del aspirante
    Preficha: { type: String, required: false, unique: true, sparse: true },
    
    // Datos personales completos
    Nombre: { type: String, required: true },
    Apellidos: { type: String, default: '' },
    Edad: { type: Number, default: null },
    FechaNacimiento: { type: Date, default: null },
    Genero: { type: String, default: '' },
    CURP: { type: String, default: '' },
    EstadoCivil: { type: String, default: '' },
    LugarNacimiento: { type: String, default: '' },
    
    // Contacto
    Correo: { type: String, default: '' },
    Telefono: { type: String, default: '' },
    TelefonoEmergencia: { type: String, default: '' },
    
    // Domicilio
    Domicilio: {
        Calle: { type: String, default: '' },
        NumeroExterior: { type: String, default: '' },
        NumeroInterior: { type: String, default: '' },
        CodigoPostal: { type: String, default: '' },
        Colonia: { type: String, default: '' },
        Localidad: { type: String, default: '' },
        Ciudad: { type: String, default: '' },
        Municipio: { type: String, default: '' },
        Estado: { type: String, default: '' }
    },
    
    // Escuela de procedencia
    EscuelaProcedencia: {
        Nombre: { type: String, default: '' },
        Promedio: { type: Number, default: null },
        CarreraEstudiada: { type: String, default: '' },
        TipoEscuela: { type: String, default: '' }, // Publica/Privada
        AnioEgreso: { type: Number, default: null },
        Ciudad: { type: String, default: '' },
        Estado: { type: String, default: '' }
    },
    
    // Datos del padre/tutor
    Padre: {
        Nombre: { type: String, default: '' },
        Telefono: { type: String, default: '' },
        Correo: { type: String, default: '' },
        Ocupacion: { type: String, default: '' },
        VivoFinado: { type: String, default: '' }
    },
    
    // Datos de la madre/tutora
    Madre: {
        Nombre: { type: String, default: '' },
        Telefono: { type: String, default: '' },
        Correo: { type: String, default: '' },
        Ocupacion: { type: String, default: '' },
        VivoFinado: { type: String, default: '' }
    },
    
    // Datos del tutor (opcional, en caso de que no viva con padres)
    Tutor: {
        Nombre: { type: String, default: '' },
        Parentesco: { type: String, default: '' },
        Telefono: { type: String, default: '' },
        Correo: { type: String, default: '' }
    },
    
    // Información socioeconómica
    InfoSocioeconomica: {
        TrabajaActualmente: { type: Boolean, default: false },
        LugarTrabajo: { type: String, default: '' },
        IngresoMensual: { type: String, default: '' },
        PersonasDependenEconomicamente: { type: Number, default: null },
        TipoVivienda: { type: String, default: '' }, // Propia/Rentada/Prestada
        TransporteUtiliza: { type: String, default: '' }
    },
    
    // Información adicional
    DiscapacidadOCondicion: { type: String, default: '' },
    RequiereApoyo: { type: Boolean, default: false },
    TipoApoyo: { type: String, default: '' },
    ComoSeEntero: { type: String, default: '' }, // ¿Cómo se enteró de la universidad?
    
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
                // Datos personales
                Nombre: payload.Nombre,
                Apellidos: payload.Apellidos || '',
                Edad: payload.Edad ? parseInt(payload.Edad) : null,
                FechaNacimiento: payload.FechaNacimiento || null,
                Genero: payload.Genero || '',
                CURP: payload.CURP || '',
                EstadoCivil: payload.EstadoCivil || '',
                LugarNacimiento: payload.LugarNacimiento || '',
                // Contacto
                Correo: payload.Correo || '',
                Telefono: payload.Telefono || '',
                TelefonoEmergencia: payload.TelefonoEmergencia || '',
                // Domicilio
                Domicilio: {
                    Calle: payload.DomicilioCalle || '',
                    NumeroExterior: payload.DomicilioNumeroExterior || '',
                    NumeroInterior: payload.DomicilioNumeroInterior || '',
                    CodigoPostal: payload.DomicilioCodigoPostal || '',
                    Colonia: payload.DomicilioColonia || '',
                    Localidad: payload.DomicilioLocalidad || '',
                    Ciudad: payload.DomicilioCiudad || '',
                    Municipio: payload.DomicilioMunicipio || '',
                    Estado: payload.DomicilioEstado || ''
                },
                // Escuela de procedencia
                EscuelaProcedencia: {
                    Nombre: payload.EscuelaNombre || '',
                    Promedio: payload.EscuelaPromedio ? parseFloat(payload.EscuelaPromedio) : null,
                    CarreraEstudiada: payload.EscuelaCarrera || '',
                    TipoEscuela: payload.EscuelaTipo || '',
                    AnioEgreso: payload.EscuelaAnioEgreso ? parseInt(payload.EscuelaAnioEgreso) : null,
                    Ciudad: payload.EscuelaCiudad || '',
                    Estado: payload.EscuelaEstado || ''
                },
                // Datos del padre
                Padre: {
                    Nombre: payload.PadreNombre || '',
                    Telefono: payload.PadreTelefono || '',
                    Correo: payload.PadreCorreo || '',
                    Ocupacion: payload.PadreOcupacion || '',
                    VivoFinado: payload.PadreVivoFinado || ''
                },
                // Datos de la madre
                Madre: {
                    Nombre: payload.MadreNombre || '',
                    Telefono: payload.MadreTelefono || '',
                    Correo: payload.MadreCorreo || '',
                    Ocupacion: payload.MadreOcupacion || '',
                    VivoFinado: payload.MadreVivoFinado || ''
                },
                // Datos del tutor
                Tutor: {
                    Nombre: payload.TutorNombre || '',
                    Parentesco: payload.TutorParentesco || '',
                    Telefono: payload.TutorTelefono || '',
                    Correo: payload.TutorCorreo || ''
                },
                // Información socioeconómica
                InfoSocioeconomica: {
                    TrabajaActualmente: payload.TrabajaActualmente === 'true' || payload.TrabajaActualmente === true,
                    LugarTrabajo: payload.LugarTrabajo || '',
                    IngresoMensual: payload.IngresoMensual || '',
                    PersonasDependenEconomicamente: payload.PersonasDependenEconomicamente ? parseInt(payload.PersonasDependenEconomicamente) : null,
                    TipoVivienda: payload.TipoVivienda || '',
                    TransporteUtiliza: payload.TransporteUtiliza || ''
                },
                // Información adicional
                DiscapacidadOCondicion: payload.DiscapacidadOCondicion || '',
                RequiereApoyo: payload.RequiereApoyo === 'true' || payload.RequiereApoyo === true,
                TipoApoyo: payload.TipoApoyo || '',
                ComoSeEntero: payload.ComoSeEntero || '',
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

            // Actualizar campos básicos
            const basicFields = ['Nombre', 'Apellidos', 'Correo', 'Telefono', 'CarreraSlug', 
                                'Genero', 'CURP', 'EstadoCivil', 'LugarNacimiento', 'TelefonoEmergencia',
                                'DiscapacidadOCondicion', 'TipoApoyo', 'ComoSeEntero']
            basicFields.forEach(k => {
                if (payload[k] !== undefined) doc[k] = payload[k]
            })

            // Actualizar campos numéricos
            if (payload.Edad !== undefined) doc.Edad = payload.Edad ? parseInt(payload.Edad) : null
            if (payload.FechaNacimiento !== undefined) doc.FechaNacimiento = payload.FechaNacimiento || null
            if (payload.RequiereApoyo !== undefined) doc.RequiereApoyo = payload.RequiereApoyo === 'true' || payload.RequiereApoyo === true

            // Actualizar Domicilio
            if (!doc.Domicilio) doc.Domicilio = {}
            const domicilioFields = ['Calle', 'NumeroExterior', 'NumeroInterior', 'CodigoPostal', 'Colonia', 'Localidad', 'Ciudad', 'Municipio', 'Estado']
            domicilioFields.forEach(field => {
                const key = `Domicilio${field}`
                if (payload[key] !== undefined) doc.Domicilio[field] = payload[key]
            })

            // Actualizar Escuela de Procedencia
            if (!doc.EscuelaProcedencia) doc.EscuelaProcedencia = {}
            if (payload.EscuelaNombre !== undefined) doc.EscuelaProcedencia.Nombre = payload.EscuelaNombre
            if (payload.EscuelaPromedio !== undefined) doc.EscuelaProcedencia.Promedio = payload.EscuelaPromedio ? parseFloat(payload.EscuelaPromedio) : null
            if (payload.EscuelaCarrera !== undefined) doc.EscuelaProcedencia.CarreraEstudiada = payload.EscuelaCarrera
            if (payload.EscuelaTipo !== undefined) doc.EscuelaProcedencia.TipoEscuela = payload.EscuelaTipo
            if (payload.EscuelaAnioEgreso !== undefined) doc.EscuelaProcedencia.AnioEgreso = payload.EscuelaAnioEgreso ? parseInt(payload.EscuelaAnioEgreso) : null
            if (payload.EscuelaCiudad !== undefined) doc.EscuelaProcedencia.Ciudad = payload.EscuelaCiudad
            if (payload.EscuelaEstado !== undefined) doc.EscuelaProcedencia.Estado = payload.EscuelaEstado

            // Actualizar Padre
            if (!doc.Padre) doc.Padre = {}
            const padreFields = ['Nombre', 'Telefono', 'Correo', 'Ocupacion', 'VivoFinado']
            padreFields.forEach(field => {
                const key = `Padre${field}`
                if (payload[key] !== undefined) doc.Padre[field] = payload[key]
            })

            // Actualizar Madre
            if (!doc.Madre) doc.Madre = {}
            const madreFields = ['Nombre', 'Telefono', 'Correo', 'Ocupacion', 'VivoFinado']
            madreFields.forEach(field => {
                const key = `Madre${field}`
                if (payload[key] !== undefined) doc.Madre[field] = payload[key]
            })

            // Actualizar Tutor
            if (!doc.Tutor) doc.Tutor = {}
            if (payload.TutorNombre !== undefined) doc.Tutor.Nombre = payload.TutorNombre
            if (payload.TutorParentesco !== undefined) doc.Tutor.Parentesco = payload.TutorParentesco
            if (payload.TutorTelefono !== undefined) doc.Tutor.Telefono = payload.TutorTelefono
            if (payload.TutorCorreo !== undefined) doc.Tutor.Correo = payload.TutorCorreo

            // Actualizar Info Socioeconómica
            if (!doc.InfoSocioeconomica) doc.InfoSocioeconomica = {}
            if (payload.TrabajaActualmente !== undefined) doc.InfoSocioeconomica.TrabajaActualmente = payload.TrabajaActualmente === 'true' || payload.TrabajaActualmente === true
            if (payload.LugarTrabajo !== undefined) doc.InfoSocioeconomica.LugarTrabajo = payload.LugarTrabajo
            if (payload.IngresoMensual !== undefined) doc.InfoSocioeconomica.IngresoMensual = payload.IngresoMensual
            if (payload.PersonasDependenEconomicamente !== undefined) doc.InfoSocioeconomica.PersonasDependenEconomicamente = payload.PersonasDependenEconomicamente ? parseInt(payload.PersonasDependenEconomicamente) : null
            if (payload.TipoVivienda !== undefined) doc.InfoSocioeconomica.TipoVivienda = payload.TipoVivienda
            if (payload.TransporteUtiliza !== undefined) doc.InfoSocioeconomica.TransporteUtiliza = payload.TransporteUtiliza

            doc.Updated_at = Date.now()
            await doc.save()
            return { status: 200, msg: 'Actualizado', data: { aspirante: doc } }
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

    static async removePreficha(uuid) {
        try {
            const doc = await aspirante_model_mongoose.findOne({ UUID: uuid })
            if (!doc) return { status: 404, msg: 'Aspirante no encontrado' }
            if (!doc.Preficha) {
                return { status: 200, msg: 'Preficha ya eliminada', data: { aspirante: { UUID: doc.UUID, Preficha: null } } }
            }

            // Intentar $unset (ideal si el índice es unique+sparse)
            try {
                await aspirante_model_mongoose.updateOne(
                    { UUID: uuid },
                    { $unset: { Preficha: "" }, $set: { Updated_at: Date.now() } }
                )
                return { status: 200, msg: 'Preficha eliminada', data: { aspirante: { UUID: doc.UUID, Preficha: null } } }
            } catch (err) {
                // Si hay conflicto por índice único no-sparse (E11000), usar "tombstone" único
                if (err && (err.code === 11000 || err.codeName === 'DuplicateKey')) {
                    const tombstone = `__DELETED__:${uuid}:${Date.now()}`
                    await aspirante_model_mongoose.updateOne(
                        { UUID: uuid },
                        { $set: { Preficha: tombstone, Updated_at: Date.now() } }
                    )
                    return { status: 200, msg: 'Preficha eliminada', data: { aspirante: { UUID: doc.UUID, Preficha: null } } }
                }
                // Re-propagar otros errores al catch externo
                throw err
            }
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar preficha', data: { error: error.message } }
        }
    }

    static async deleteByUUID(uuid) {
        try {
            const result = await aspirante_model_mongoose.deleteOne({ UUID: uuid })
            if (result.deletedCount === 0) {
                return { status: 404, msg: 'Aspirante no encontrado' }
            }
            return { status: 200, msg: 'Aspirante eliminado correctamente' }
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar aspirante', data: { error: error.message } }
        }
    }
}

module.exports = {
    aspirantes_model: {
        createPreRegistro: AspirantesModel.createPreRegistro,
        loginVerify: AspirantesModel.loginVerify,
        getByUUID: AspirantesModel.getByUUID,
        updatePreRegistro: AspirantesModel.updatePreRegistro,
        listAll: AspirantesModel.listAll,
        removePreficha: AspirantesModel.removePreficha,
        deleteByUUID: AspirantesModel.deleteByUUID
    }
}