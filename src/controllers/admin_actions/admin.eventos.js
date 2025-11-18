const eventos_model = require('../../models/mongodb/admin_actions/admin.eventos.js').admin_eventos_model

class AdminEventosController {
    static async getAllEvents(req, res) {
        try {
            const result = await eventos_model.getAllEvents();
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async findEventById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await eventos_model.findEventById(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async addEvent(req, res) {
        try {
            const { titulo, slug, descripcion, contenido, fechaInicio, fechaFin, ubicacion, imageUrl, publicado } = req.body;
            if (!titulo) return res.status(400).json({ status: 400, msg: 'Título requerido', data: null });
            const data = {
                Titulo: titulo,
                Slug: slug,
                Descripcion: descripcion,
                Contenido: contenido,
                FechaInicio: fechaInicio,
                FechaFin: fechaFin,
                Ubicacion: ubicacion,
                ImageUrl: imageUrl,
                Estado: publicado === 'on' ? true : true
            };
            const result = await eventos_model.addEvent(data);
            if (result.status === 201) return res.redirect('/admin/eventos');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async updateEvent(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const { titulo, slug, descripcion, contenido, fechaInicio, fechaFin, ubicacion, imageUrl, publicado } = req.body;
            const data = {};
            if (titulo) data.Titulo = titulo;
            if (slug) data.Slug = slug;
            if (descripcion) data.Descripcion = descripcion;
            if (contenido) data.Contenido = contenido;
            if (fechaInicio) data.FechaInicio = fechaInicio;
            if (fechaFin) data.FechaFin = fechaFin;
            if (ubicacion) data.Ubicacion = ubicacion;
            if (imageUrl) data.ImageUrl = imageUrl;
            if (publicado !== undefined) data.Estado = publicado === 'on';
            const result = await eventos_model.updateEvent(id, data);
            if (result.status === 200) return res.redirect('/admin/eventos');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async deleteEvent(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await eventos_model.deleteEvent(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }
}

module.exports = {
    admin_eventos_controller: {
        getAllEvents: AdminEventosController.getAllEvents,
        findEventById: AdminEventosController.findEventById,
        addEvent: AdminEventosController.addEvent,
        updateEvent: AdminEventosController.updateEvent,
        deleteEvent: AdminEventosController.deleteEvent
    }
}
