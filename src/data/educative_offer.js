const { captalize_case } = require("../utils/utils-globals.js")

const images = require("./images")
const img = images.placeholderImages

const educative_offer = [
    {
        id: "grastronomy_program",
        programImage: {
            imageUrl: img.find(img => img.id === "program-gastronomy")?.imageUrl || "",
            description: img.find(img => img.id === "program-gastronomy")?.description || "N/A"
        },
        name: captalize_case("licenciatura en gastronomia"),
        shortDescription: "Fusiona el arte culinario con la administración. Se enfoca en técnicas de cocina internacional, diseño de menús y gestión de negocios de alimentos y bebidas, priorizando la higiene y la rentabilidad.",
        slug: "gastro_image",
        programDetails: {

        }
    },
    {
        id: "logistics_program",
        programImage: {
            imageUrl: img.find(img => img.id === "program-logistics")?.imageUrl || "",
            description: img.find(img => img.id === "program-logistics")?.description || "N/A"
        },
        name: captalize_case("ingenieria en logistica internacional"),
        shortDescription: "Diseña y optimiza la cadena de suministro global. Gestiona el transporte, almacenamiento y distribución eficiente de bienes a nivel internacional, minimizando costos y mejorando el comercio exterior.",
        slug: "logi_image",
        programDetails: {
            
        }
    },
    {
        id: "admin_program",
        programImage: {
            imageUrl: img.find(img => img.id === "program-admin")?.imageUrl || "",
            description: img.find(img => img.id === "program-admin")?.description || "N/A"
        },
        name: captalize_case("licenciatura en administracion"),
        shortDescription: "Forma líderes para planificar, organizar, dirigir y controlar organizaciones. Se centra en la gestión de recursos (financieros, humanos y materiales) y la toma de decisiones estratégicas para el crecimiento empresarial.",
        slug: "admi_image",
        programDetails: {
            
        }
    }
]

module.exports = educative_offer