const images = {
  "placeholderImages": [
    {
      "id": "homepage-hero",
      "description": "University campus aerial view",
      "imageUrl": "./public/images/general/ut-nayarit.webp",
      "imageHint": "university campus"
    },
    {
      "id": "homepage-news-1",
      "description": "utn",
      "imageUrl": "public/images/general/admision_2025_notice.png",
      "imageHint": "utn admision"
    },
    {
      "id": "homepage-news-2",
      "description": "University library interior",
      "imageUrl": "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeXxlbnwwfHx8fDE3NTk0MjY2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "university library"
    },
    {
      "id": "homepage-news-3",
      "description": "Speaker at a university conference",
      "imageUrl": "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx1bml2ZXJzaXR5JTIwY29uZmVyZW5jZXxlbnwwfHx8fDE3NTk0MjY2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "university conference"
    },
    {
      "id": "homepage-event-1",
      "description": "Students at a cultural festival",
      "imageUrl": "https://images.unsplash.com/photo-1756694915692-acd9b4ad9291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdHVkZW50JTIwZmVzdGl2YWx8ZW58MHx8fHwxNzU5NDI2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "student festival"
    },
    {
      "id": "homepage-campus-life",
      "description": "Students sitting on campus lawn",
      "imageUrl": "https://images.unsplash.com/photo-1759092564103-fad7db955994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdHVkZW50cyUyMGxhd258ZW58MHx8fHwxNzU5NDI2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "students lawn"
    },
    {
      "id": "becas-hero",
      "description": "Student studying with books",
      "imageUrl": "https://images.unsplash.com/photo-1532294220147-279399e4e00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdHVkZW50JTIwc3R1ZHlpbmd8ZW58MHx8fHwxNzU5Mzk2OTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "student studying"
    },
    {
      "id": "incubator-hero",
      "description": "Team collaborating on a startup idea",
      "imageUrl": "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdGFydHVwJTIwdGVhbXxlbnwwfHx8fDE3NTk0MjYzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "startup team"
    },
    {
      "id": "extension-hero",
      "description": "People in a community workshop",
      "imageUrl": "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB3b3Jrc2hvcHxlbnwwfHx8fDE3NTk0MjY2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "community workshop"
    },
    {
      "id": "psicologia-hero",
      "description": "Comfortable and quiet therapy room",
      "imageUrl": "https://images.unsplash.com/photo-1520605728164-b6a5c6814203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHx0aGVyYXB5JTIwcm9vbXxlbnwwfHx8fDE3NTkzOTMxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "therapy room"
    },
    {
      "id": "docentes-hero",
      "description": "Professor lecturing in a modern classroom",
      "imageUrl": "https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzb3IlMjBjbGFzc3Jvb218ZW58MHx8fHwxNzU5NDI2NjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "professor classroom"
    },
    {
      "id": "all-programs-hero",
      "description": "Diverse group of students walking on campus",
      "imageUrl": "https://images.unsplash.com/photo-1745558858213-c1bb66fc8fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdHVkZW50cyUyMGNhbXB1c3xlbnwwfHx8fDE3NTk0MjY2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "students campus"
    },
    {
      "id": "program-civil-engineering",
      "description": "Modern bridge architecture",
      "imageUrl": "https://images.unsplash.com/photo-1660413500145-ad839f53852c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxicmlkZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzU5NDI2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "bridge architecture"
    },
    {
      "id": "program-marketing",
      "description": "Creative marketing campaign on a billboard",
      "imageUrl": "https://images.unsplash.com/photo-1727488962220-730d7b5b3785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYXJrZXRpbmclMjBiaWxsYm9hcmR8ZW58MHx8fHwxNzU5NDI2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "marketing billboard"
    },
    {
      "id": "program-gastronomy",
      "description": "Chef plating a gourmet dish",
      "imageUrl": "/public/images/careers/Lic_Gatronomia.jpg",
      "imageHint": "gourmet dish"
    },
    {
      "id": "program-it",
      "description": "Server room with glowing lights",
      "imageUrl": "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2VydmVyJTIwcm9vbXxlbnwwfHx8fDE3NTkzNzI0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "server room"
    },
    {
      "id": "program-logistics",
      "description": "Large container ship in a port",
      "imageUrl": "/public/images/careers/logistica-internacional.jpg",
      "imageHint": "container ship"
    },
    {
      "id": "program-mechatronics",
      "description": "Robotic arm working on an assembly line",
      "imageUrl": "https://images.unsplash.com/photo-1643359905563-f747213c9703?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyb2JvdGljJTIwYXJtfGVufDB8fHx8MTc1OTM4MDU3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "robotic arm"
    },
    {
      "id": "program-maintenance",
      "description": "Engineer inspecting industrial machinery",
      "imageUrl": "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5fGVufDB8fHx8MTc1OTQyNjYwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "industrial machinery"
    },
    {
      "id": "program-public-security",
      "description": "Police officer in the city",
      "imageUrl": "https://images.unsplash.com/photo-1679609711057-4d08129b5868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwb2xpY2UlMjBjaXR5fGVufDB8fHx8MTc1OTQyNjYwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "police city"
    },
    {
      "id": "program-tourism",
      "description": "Beautiful tropical beach destination",
      "imageUrl": "https://images.unsplash.com/photo-1733687029466-a62eb36804a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxiZWFjaCUyMGRlc3RpbmF0aW9ufGVufDB8fHx8MTc1OTQyNjYwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "beach destination"
    },
    {
      "id": "program-admin",
      "description": "N/A",
      "imageUrl": "/public/images/careers/licenciado-en-administracion-1024x728.jpg",
      "imageHint": "office skyline"
    },
    {
      "id": "program-bio-engineering",
      "description": "Scientist looking at DNA model",
      "imageUrl": "https://images.unsplash.com/photo-1578496481449-cf2e845cc00c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzY2llbnRpc3QlMjBETkF8ZW58MHx8fHwxNzU5NDI2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "scientist DNA"
    },
    {
      "id": "program-ai",
      "description": "Abstract visualization of a neural network",
      "imageUrl": "https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxuZXVyYWwlMjBuZXR3b3JrfGVufDB8fHx8MTc1OTM0MTQzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "neural network"
    }
  ]
}

module.exports = images