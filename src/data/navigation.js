const navigationLinks = {
    navigationLinks: [
        {
            title: 'Inicio',
            href: '/',
        }, {
            title: 'Aspirantes',
            children: [
                {
                    title: 'Proceso de Admisión',
                    href: '#',
                    external: true,
                    description: 'Conoce los pasos para unirte a nuestra comunidad.'
                }, {
                    title: 'Oferta Educativa',
                    href: '/carreras',
                    description: 'Explora todas las carreras que tenemos para ti.'
                }, {
                    title: 'Vida Estudiantil',
                    href: '#',
                    external: true,
                    description: 'Descubre las actividades y grupos estudiantiles.'
                }
            ]
        }, {
            title: 'Alumnos',
            children: [
                {
                    title: 'Becas',
                    href: '/becas',
                    description: 'Información sobre apoyos y becas disponibles.'
                }, {
                    title: 'Calendario Escolar',
                    href: '#',
                    external: true,
                    description: 'Consulta las fechas importantes del ciclo escolar.',
                }, {
                    title: 'Servicios Escolares',
                    href: '#',
                    external: true,
                    description: 'Trámites y servicios para alumnos.'
                }
            ]
        }, {
            title: 'Carreras',
            children: [
                {
                    "title": "Ingeniería Civil",
                    "href": "/carreras/ingenieria-civil",
                    "description": "Diseña y construye el futuro de la infraestructura."
                }, {
                    "title": "Licenciatura en Mercadotecnia",
                    "href": "/carreras/licenciatura-en-mercadotecnia",
                    "description": "Crea estrategias para conectar marcas con personas."
                }, {
                    "title": "Licenciatura en Gastronomía",
                    "href": "/carreras/licenciatura-en-gastronomia",
                    "description": "Transforma ingredientes en experiencias culinarias."
                }, {
                    "title": "Tecnologías de la Información",
                    "href": "/carreras/tecnologias-de-la-informacion",
                    "description": "Desarrolla soluciones de software y gestiona redes."
                }, {
                    "title": "Ingeniería en Logística Internacional",
                    "href": "/carreras/ingenieria-en-logistica-internacional",
                    "description": "Gestiona la cadena de suministro a nivel global."
                }, {
                    "title": "Ingeniería Mecatrónica",
                    "href": "/carreras/ingenieria-mecatronica",
                    "description": "Integra mecánica, electrónica y control para la automatización."
                }, {
                    "title": "Mantenimiento Industrial",
                    "href": "/carreras/mantenimiento-industrial",
                    "description": "Asegura la operatividad y eficiencia de maquinaria industrial."
                }, {
                    "title": "Seguridad Pública",
                    "href": "/carreras/seguridad-publica",
                    "description": "Formación de profesionales para la prevención y gestión de la seguridad."
                }, {
                    "title": "Desarrollo Turístico",
                    "href": "/carreras/desarrollo-turistico",
                    "description": "Gestiona y promueve destinos y empresas turísticas."
                }, {
                    "title": "Licenciatura en Administración Empresarial",
                    "href": "/carreras/licenciatura-en-administracion-empresarial",
                    "description": "Lidera y gestiona organizaciones hacia el éxito."
                }, {
                    "title": "Ingeniería en Bioelementos",
                    "href": "/carreras/ingenieria-en-bioelementos",
                    "description": "Aplica la ingeniería a sistemas biológicos."
                }, {
                    "title": "Tecnologías de la Información área de T.S.U Inteligencia Artificial",
                    "href": "/carreras/tecnologias-de-la-informacion-inteligencia-artificial",
                    "description": "Especialízate en el futuro de la tecnología: la IA."
                }
            ]
        }, {
            title: 'Docentes',
            href: '/docentes'
        }, {
            title: 'Plataformas',
            children: [
                {
                    title: 'APP SIGA',
                    href: '#', external: true,
                    description: 'Sistema Integral de Gestión Académica.'
                }, {
                    title: 'SIDOUT',
                    href: '#', external: true,
                    description: 'Plataforma de seguimiento y tutorías.'
                }, {
                    title: 'Plataforma Transparencia UTN',
                    href: '#', external: true,
                    description: 'Portal de transparencia de la universidad.'
                }, {
                    title: 'Enlace P.N.T',
                    href: '#', external: true,
                    description: 'Plataforma Nacional de Transparencia.'
                }
            ]
        }, {
            title: 'Vinculación',
            children: [
                {
                    title: 'Incubadora de Negocios',
                    href: '/vinculacion/incubadora-negocios',
                    description: 'Apoyo para emprendedores y startups.'
                }, {
                    title: 'Extensión Universitaria',
                    href: '/vinculacion/extension-universitaria',
                    description: 'Cursos, talleres y eventos para la comunidad.'
                }
            ]
        }, {
            title: 'Psicología',
            href: '/psicologia'
        }
    ]
}

module.exports = navigationLinks;