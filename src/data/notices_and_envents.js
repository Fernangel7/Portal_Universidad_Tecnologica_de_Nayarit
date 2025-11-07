const images = require('./images.js');
const img = images.placeholderImages

const notices_and_events = [
    {
        id: "notice-1",
        image: {
            imageUrl: img.find(img => img.id === "homepage-news-1")?.imageUrl || "",
            description: img.find(img => img.id === "homepage-news-1")?.description || "N/A",
        },
        title: "Proceso de Admision 2025",
        description: "El proceso de admisión 2025 está abierto. Infórmate sobre requisitos, plazos y los pasos para postular a nuestra institución.",
        link: "#",
        date: "2025-01-24",
        deadline: "2025-06-05",
        type: "Notice" // Notice | Event
    },
    {
        id: "notice-2",
        image: {
            imageUrl: img.find(img => img.id === "homepage-news-1")?.imageUrl || "",
            description: img.find(img => img.id === "homepage-news-1")?.description || "N/A",
        },
        title: "Proceso de Admision 2025",
        description: "El proceso de admisión 2025 está abierto. Infórmate sobre requisitos, plazos y los pasos para postular a nuestra institución.",
        link: "#",
        date: "2025-01-24",
        deadline: "2025-06-05",
        type: "Notice" // Notice | Event
    },
    {
        id: "notice-3",
        image: {
            imageUrl: img.find(img => img.id === "homepage-news-1")?.imageUrl || "",
            description: img.find(img => img.id === "homepage-news-1")?.description || "N/A",
        },
        title: "Proceso de Admision 2025",
        description: "El proceso de admisión 2025 está abierto. Infórmate sobre requisitos, plazos y los pasos para postular a nuestra institución.",
        link: "#",
        date: "2025-01-24",
        deadline: "2025-06-05",
        type: "Notice" // Notice | Event
    }
]

module.exports = notices_and_events;