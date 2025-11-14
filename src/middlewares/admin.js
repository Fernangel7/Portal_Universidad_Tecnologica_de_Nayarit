const jwt = require('jsonwebtoken')

const { admin_mongo_controller } = require('../controllers/admin.js')

const { JWT_SECRET_KEY } = require('../config/config-globals.js')

module.exports = {
    UnauthorizedAccess: async (req, res, next) => {
        if (req.url === '/login' && !req.signedCookies.refreshToken) return next()

        if (req.signedCookies.refreshToken) {
            const refreshToken = req.signedCookies.refreshToken
            try {
                if (jwt.verify(refreshToken, JWT_SECRET_KEY)) {
                    const decoded = jwt.decode(refreshToken)
                    const { username, password } = decoded
                    if (admin_mongo_controller.login_verify({ body: { Username: username, Password: password, prev: true } }, {})) {
                        if (req.url === '/login') return res.redirect('/admin/dashboard')
                        else return next()
                    }
                }
            } catch (e) { }
        }

        // if (req.url === '/admin/login') return next()

        return res.render('401', { title: "401 - Unauthorized" })
    }
}