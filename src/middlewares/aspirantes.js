const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = require('../config/config-globals.js')

module.exports = {
    AspiranteUnauthorized: async (req, res, next) => {
        try {
            const token = req.signedCookies.aspiranteToken
            if (!token) return res.render('401', { title: '401 - Unauthorized' })
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            if (!decoded?.UUID) return res.render('401', { title: '401 - Unauthorized' })
            return next()
        } catch (e) {
            return res.render('401', { title: '401 - Unauthorized' })
        }
    }
}
