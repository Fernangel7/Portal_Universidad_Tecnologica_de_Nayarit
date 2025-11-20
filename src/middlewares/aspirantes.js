const jwt = require('jsonwebtoken')

const { JWT_SECRET_KEY } = require('../config/config-globals.js')

module.exports = {
    AspiranteUnauthorized: async (req, res, next) => {
        const wantsJson = req.method === 'DELETE' ||
            (req.headers['accept'] && req.headers['accept'].includes('application/json')) ||
            (req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest')

        try {
            const token = req.signedCookies.aspiranteToken
            if (!token) {
                if (wantsJson) return res.status(401).json({ status: 401, message: 'No autorizado' })
                return res.status(401).render('401', { title: '401 - Unauthorized' })
            }
            const decoded = jwt.verify(token, JWT_SECRET_KEY)
            if (!decoded?.UUID) {
                if (wantsJson) return res.status(401).json({ status: 401, message: 'No autorizado' })
                return res.status(401).render('401', { title: '401 - Unauthorized' })
            }
            return next()
        } catch (e) {
            if (wantsJson) return res.status(401).json({ status: 401, message: 'No autorizado' })
            return res.status(401).render('401', { title: '401 - Unauthorized' })
        }
    }
}
