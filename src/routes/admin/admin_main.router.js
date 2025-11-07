const express = require('express')

const app = express.Router()

const { website_name } = require('../../utils/utils-globals.js')

// Admin main page route
app.get('/', (req, res) => {
    res.render('admin/index', {
        title: website_name
    })
})

module.exports = {
    admin_router: app
}