const crypto = require('node:crypto');
const { evento_model } = require('../general.js');

const slugify = (str) => (str || '').toString().toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

class AdminEventosModel {
    static async getAllEvents() {
        try {
            const events = await evento_model.find({ Estado: true }).sort({ FechaInicio: 1 });
            return { status: 200, msg: 'Eventos obtenidos', data: { events } };
        } catch (error) {
            return { status: 500, msg: 'Error al obtener eventos', data: { error: error.message } };
        }
    }

    static async findEventById(id) {
        try {
            const event = await evento_model.findOne({ UUID: id, Estado: true });
            if (!event) return { status: 404, msg: 'Evento no encontrado', data: null };
            return { status: 200, msg: 'Evento encontrado', data: { event } };
        } catch (error) {
            return { status: 500, msg: 'Error al buscar evento', data: { error: error.message } };
        }
    }

    static async addEvent(data) {
        try {
            const slug = data.Slug ? data.Slug : slugify(data.Titulo);
            const existing = await evento_model.findOne({ Slug: slug });
            if (existing) return { status: 400, msg: 'Ya existe un evento con ese slug', data: null };
            const event = new evento_model({
                UUID: crypto.randomUUID(),
                Titulo: data.Titulo,
                Slug: slug,
                Descripcion: data.Descripcion || '',
                Contenido: data.Contenido || '',
                FechaInicio: data.FechaInicio ? new Date(data.FechaInicio) : null,
                FechaFin: data.FechaFin ? new Date(data.FechaFin) : null,
                Ubicacion: data.Ubicacion || '',
                ImageUrl: data.ImageUrl || '',
                Estado: data.Estado !== undefined ? data.Estado : true,
                Created_at: Date.now(),
                Updated_at: Date.now()
            });
            await event.save();
            return { status: 201, msg: 'Evento creado', data: { event } };
        } catch (error) {
            return { status: 500, msg: 'Error al crear evento', data: { error: error.message } };
        }
    }

    static async updateEvent(id, data) {
        try {
            const event = await evento_model.findOne({ UUID: id });
            if (!event) return { status: 404, msg: 'Evento no encontrado', data: null };
            if (data.Slug && data.Slug !== event.Slug) {
                const exists = await evento_model.findOne({ Slug: data.Slug });
                if (exists) return { status: 400, msg: 'Slug en uso', data: null };
                event.Slug = data.Slug;
            }
            ['Titulo','Descripcion','Contenido','FechaInicio','FechaFin','Ubicacion','ImageUrl'].forEach(f => {
                if (data[f] !== undefined) {
                    if (f === 'FechaInicio' || f === 'FechaFin') event[f] = new Date(data[f]); else event[f] = data[f];
                }
            });
            if (data.Estado !== undefined) event.Estado = data.Estado;
            event.Updated_at = Date.now();
            await event.save();
            return { status: 200, msg: 'Evento actualizado', data: { event } };
        } catch (error) {
            return { status: 500, msg: 'Error al actualizar evento', data: { error: error.message } };
        }
    }

    static async deleteEvent(id) {
        try {
            const event = await evento_model.findOne({ UUID: id });
            if (!event) return { status: 404, msg: 'Evento no encontrado', data: null };
            event.Estado = false;
            event.Updated_at = Date.now();
            await event.save();
            return { status: 200, msg: 'Evento eliminado', data: { event } };
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar evento', data: { error: error.message } };
        }
    }
}

module.exports = {
    admin_eventos_model: {
        getAllEvents: AdminEventosModel.getAllEvents,
        findEventById: AdminEventosModel.findEventById,
        addEvent: AdminEventosModel.addEvent,
        updateEvent: AdminEventosModel.updateEvent,
        deleteEvent: AdminEventosModel.deleteEvent
    }
}
