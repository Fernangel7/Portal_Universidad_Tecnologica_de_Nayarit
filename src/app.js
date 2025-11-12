require('dotenv').config()

const express = require('express')
const path = require('node:path')

const { corsMiddleware } = require('./middlewares/cors.js')
const { admin_middleware } = require('./middlewares/admin.js')

const main_routes = require('./routes/index.js')
const carreras_routes = require('./routes/carreras')
const { admin_router } = require('./routes/admin.js')

const { PORT } = require('./config/config-globals.js')
const { connectDB, generateDB } = require('./models/mongodb/config.js')

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(corsMiddleware())
app.use(express.static('public', {
    setHeaders: (req, res) => {
        if (path.endsWith(['.html', '.htm', '.js', '.css', '.json', '.xml', '.txt', '.map', '.webmanifest', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.otf'])) {
            res.setHeaders('Cache-Control', 'public, max-age=31536000' )
        } else {
            res.setHeaders('Cache-Control', 'no-cache' )
        }
    }
}))

// Conectar a MongoDB Atlas
connectDB().then(() => generateDB())

app.use('/', main_routes)
app.use('/admin', admin_middleware, admin_router)
app.use('/carreras', carreras_routes)

//404 render
app.use((req, res) => {
    res.status(404).render('404', { title: "404 - Página no encontrada" })
})

app.listen(PORT, function () { console.log(`Server Running At PORT: ${PORT}`) })