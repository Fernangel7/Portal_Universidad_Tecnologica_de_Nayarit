require('dotenv').config()

const express = require('express')
const path = require('node:path')

const { corsMiddleware } = require('./middlewares/cors.js')

const main_routes = require('./routes')
const carreras_routes = require('./routes/carreras')
const { admin_router } = require('./routes/admin/admin_main.router')

const { PORT } = require('./config/config-globals.js')
const { connectDB, generateDB } = require('./models/mongodb/config.js')

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(corsMiddleware())

// Conectar a MongoDB Atlas
connectDB().then(() => generateDB())

app.use('/', main_routes)
app.use('/admin', admin_router)
app.use('/carreras', carreras_routes)

app.listen(PORT, function () { console.log(`Server Running At PORT: ${PORT}`) })