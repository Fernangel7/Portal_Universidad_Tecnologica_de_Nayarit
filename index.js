require('dotenv/config')

const express = require('express')

const path = require('node:path')

const app = express()
const PORT = process.env.PORT

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get("/", async (req, res) => {
    // In your Express route handler
    res.render('home', {
        title: 'My University',
        heroImage: { /* ... */ },
        featuredPrograms: [ /* ... */],
        newsItems: [ /* ... */],
        campusLifeImage: { /* ... */ }
    });

})

app.listen(PORT, function () { console.log(`Server Running At PORT: ${PORT}`) })
