require('dotenv/config')

const express = require('express')
const path = require('node:path')

const navigationLinks = require('./src/navigation')
const images = require("./src/images")
const { captalize_case } = require("./src/util")

const app = express()
const PORT = process.env.PORT

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get("/", async (req, res) => {

    let f_programs = []
    f_programs.push({ ...images.placeholderImages[12] })
    f_programs.push({ ...images.placeholderImages[13] })
    f_programs.push({ ...images.placeholderImages[14] })
    // In your Express route handler
    res.render('home', {
        title: 'My University',
        heroImage: { ...images.placeholderImages[0] },
        featuredPrograms: [
            {
                programImage: {
                    imageUrl: f_programs[0].imageUrl,
                    description: f_programs[0].description
                },
                name: captalize_case(f_programs[0].id.replaceAll("-", " ").replace("program ", "")),
                shortDescription: captalize_case(f_programs[0].description.replaceAll("-", " ").replace("program ", "")),
                slug: f_programs[0].id
            },
            {
                programImage: {
                    imageUrl: f_programs[1].imageUrl,
                    description: f_programs[1].description
                },
                name: captalize_case(f_programs[1].id.replaceAll("-", " ").replace("program ", "")),
                shortDescription: captalize_case(f_programs[1].description.replaceAll("-", " ").replace("program ", "")),
                slug: f_programs[1].id
            },
            {
                programImage: {
                    imageUrl: f_programs[2].imageUrl,
                    description: f_programs[2].description
                },
                name: captalize_case(f_programs[2].id.replaceAll("-", " ").replace("program ", "")),
                shortDescription: captalize_case(f_programs[2].description.replaceAll("-", " ").replace("program ", "")),
                slug: f_programs[2].id
            }
        ],
        newsItems: [ /* ... */],
        campusLifeImage: { ...images.placeholderImages[0] },
        ...navigationLinks
    });

})

app.get("/docentes", async (req, res) => {
    res.render("docentes", { ...navigationLinks })
})

app.listen(PORT, function () { console.log(`Server Running At PORT: ${PORT}`) })
