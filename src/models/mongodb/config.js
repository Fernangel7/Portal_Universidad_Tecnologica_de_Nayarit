const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const crypto = require('node:crypto')

const { MONGODB_URI, MONGODB_DATABASE_NAME, BCRYPT_SALT_ROUNDS } = require('../../config/config-globals.js')

const { carrera_model, admin_model } = require('./general.js')

// Configuración de Mongoose para conectar con MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_DATABASE_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to MongoDB Atlas!");
        return mongoose.connection;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
        throw error;
    }
};

const generateDB = async (mongo_conn) => {
    // const carrera_schema = new Schema({
    //     UUID: String,
    //     Nombre: String,
    //     Division: String,
    //     Logo: String,
    //     Descripcion: {},
    //     UUID_plan_estudios: String,
    //     Estado: Boolean
    // })

    const Carrera = carrera_model

    const Carreras = [
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria Civil',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa de ingeniería enfocado en el diseño, construcción y mantenimiento de infraestructuras.',
                Long: 'La Licenciatura en Ingeniería Civil forma profesionales capaces de diseñar, construir y mantener obras de infraestructura civil tales como puentes, carreteras, edificios y sistemas de agua. Los estudiantes adquieren conocimientos en estructuras, geotecnia, hidráulica y gestión de proyectos, preparándose para enfrentar los desafíos de la ingeniería moderna.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Licenciatura en Negocios y Mecadotecnia',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa que combina administración de negocios con conocimientos de marketing y publicidad.',
                Long: 'Esta licenciatura forma profesionales con capacidad para dirigir empresas, desarrollar estrategias de mercadotecnia y publicidad efectivas. Los estudiantes aprenden a analizar mercados, crear campañas publicitarias impactantes y gestionar recursos empresariales de manera integral.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Licenciatura en Gastronimia',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Formación integral en técnicas culinarias, gestión de restaurantes y artes gastronómicas.',
                Long: 'El programa de Licenciatura en Gastronomía prepara profesionales con conocimientos en cocina internacional, nutrición, higiene alimentaria y gestión de servicios de alimentos. Los estudiantes desarrollan habilidades culinarias, empresariales y creativas para liderar en la industria gastronómica.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Tecnologias de la Informacion e Innovacion Digital',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa de ingeniería enfocado en desarrollo de software, transformación digital e innovación tecnológica.',
                Long: 'Esta ingeniería forma profesionales capacitados en desarrollo de aplicaciones, gestión de infraestructura tecnológica, ciberseguridad e innovación digital. Los estudiantes aprenden a diseñar soluciones tecnológicas que transformen negocios y resuelvan problemas complejos en la era digital.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Logistica Internacional',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa especializado en gestión de cadenas de suministro y comercio internacional.',
                Long: 'La Ingeniería en Logística Internacional prepara profesionales expertos en gestión de cadenas de suministro, transporte internacional, aduanas y comercio exterior. Los estudiantes adquieren competencias para optimizar procesos logísticos y administrar operaciones comerciales globales.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Mecatronica',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Formación en integración de sistemas mecánicos, electrónicos y computacionales para automatización.',
                Long: 'La Ingeniería en Mecatrónica forma profesionales especializados en diseñar, desarrollar y mantener sistemas mecatrónicos. Los estudiantes integran conocimientos de mecánica, electrónica, automatización y control para crear soluciones innovadoras en robótica e industria 4.0.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Mantenimiento Industrial',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa especializado en gestión del mantenimiento y confiabilidad de sistemas industriales.',
                Long: 'La Ingeniería en Mantenimiento Industrial prepara profesionales para gestionar, optimizar y mantener equipos e instalaciones industriales. Los estudiantes desarrollan competencias en confiabilidad, mantenimiento preventivo y predictivo, maximizando la disponibilidad de activos.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Licenciatura en Seguridad Publica',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa de formación en gestión de seguridad pública y administración de instituciones de seguridad.',
                Long: 'La Licenciatura en Seguridad Pública forma profesionales capaces de diseñar, implementar y evaluar políticas y estrategias de seguridad. Los estudiantes adquieren conocimientos en criminología, derecho penal, gestión policial y prevención del delito.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Licenciatura en Gestion y Desarrollo Turistico',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Formación en gestión de destinos turísticos, empresas hoteleras y desarrollo de productos turísticos.',
                Long: 'La Licenciatura en Gestión y Desarrollo Turístico forma profesionales con competencias para administrar empresas turísticas, desarrollar destinos y productos turísticos innovadores. Los estudiantes aprenden sobre hostelería, turismo sostenible y marketing turístico.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Licenciatura en Administracion',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa integral de formación en gestión empresarial y administración de organizaciones.',
                Long: 'La Licenciatura en Administración forma profesionales preparados para dirigir y optimizar organizaciones. Los estudiantes adquieren conocimientos en finanzas, recursos humanos, estrategia empresarial y operaciones, capacitándose para enfrentar desafíos empresariales complejos.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Alimentos',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa de formación en tecnología de alimentos, procesamiento y seguridad alimentaria.',
                Long: 'La Ingeniería en Alimentos forma profesionales especializados en procesos de transformación, conservación y calidad de alimentos. Los estudiantes desarrollan competencias en tecnología de procesos, inocuidad alimentaria, nutrición y emprendimiento en la industria alimentaria.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Carrera({
            UUID: crypto.randomUUID(),
            Nombre: 'Ingenieria en Tecnologias de la Informacion e Innovacion Digital',
            Division: 'Pendiente',
            Logo: '',
            Descripcion: {
                Short: 'Programa de ingeniería enfocado en desarrollo de software, transformación digital e innovación tecnológica.',
                Long: 'Esta ingeniería forma profesionales capacitados en desarrollo de aplicaciones, gestión de infraestructura tecnológica, ciberseguridad e innovación digital. Los estudiantes aprenden a diseñar soluciones tecnológicas que transformen negocios y resuelvan problemas complejos en la era digital.'
            },
            UUID_plan_estudios: '',
            Estado: true,
            Created_at: Date.now(),
            Aditional_info: {}
        })
    ]

    // await Carrera.deleteMany({})

    Carreras.forEach(async (carrera) => {
        if (!await Carrera.findOne({ Nombre: carrera.Nombre })) await carrera.save()
    })

    /*
    const admin_schema = new Schema({
    UUID: String,
    Name: String,
    Age: Number,
    Mail: String,
    Role: String,
    Username: String,
    Password: String,
    Created_at: { type: Date, default: Date.now },
    Aditional_info: {}
})
    */
    const Admin = admin_model

    const Admins = [
        new Admin({
            UUID: crypto.randomUUID(),
            Name: 'Jose Angel Bernal Loma',
            Age: 20,
            Mail: 'Fernangel7@contact.com',
            Role: 'SuperAdmin',
            Username: 'superadmin',
            Password: await bcrypt.hash('1234', parseInt(BCRYPT_SALT_ROUNDS)),
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Admin({
            UUID: crypto.randomUUID(),
            Name: 'Donnovan Joel Creano Rodriguez',
            Age: 19,
            Mail: 'djcreanor@contact.com',
            Role: 'Admin',
            Username: 'admin1',
            Password: await bcrypt.hash('1234', parseInt(BCRYPT_SALT_ROUNDS)),
            Created_at: Date.now(),
            Aditional_info: {}
        }),
        new Admin({
            UUID: crypto.randomUUID(),
            Name: 'Diego Alejandro Duran Tapia',
            Age: 21,
            Mail: 'dadurant@contact.com',
            Role: 'Admin',
            Username: 'admin2',
            Password: await bcrypt.hash('1234', parseInt(BCRYPT_SALT_ROUNDS)),
            Created_at: Date.now(),
            Aditional_info: {}
        })
    ]

    Admins.forEach(async (admin) => {
        if (!await Admin.findOne({ Name: admin.Name })) await admin.save()
    })

    console.log("Database generation completed.");
}

module.exports = {
    connectDB,
    disconnectDB,
    generateDB
    // getDB
}
