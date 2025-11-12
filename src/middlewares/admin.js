module.exports = {
    admin_middleware: (req, res, next) => {
        if (req.url === '/login') return next()
            
        const isAdmin = false

        if (isAdmin) {
            next()
        } else {
            res.status(403).render('403', { title: "403 - Acceso denegado" } )
        }
    }
}