require('dotenv').config()

const express = require('express')
const path = require('node:path')

const main_routes = require('./routes')
const carreras_routes = require('./routes/carreras')

const { PORT } = require('./config')

const app = express()

app.use('/public', express.static(path.join(__dirname, '..', 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/', main_routes)
app.use('/carreras', carreras_routes)

app.listen(PORT, function () { console.log(`Server Running At PORT: ${PORT}`) })
