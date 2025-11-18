const crypto = require('node:crypto');
const { noticia_model } = require('../general.js');

const slugify = (str) => (str || '').toString().toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

class AdminNoticiasModel {
    static async getAllNews() {
        try {
            const news = await noticia_model.find({ Estado: true }).sort({ Publicada_en: -1 });
            return { status: 200, msg: 'Noticias obtenidas', data: { news } };
        } catch (error) {
            return { status: 500, msg: 'Error al obtener noticias', data: { error: error.message } };
        }
    }

    static async findNewsById(id) {
        try {
            const item = await noticia_model.findOne({ UUID: id, Estado: true });
            if (!item) return { status: 404, msg: 'Noticia no encontrada', data: null };
            return { status: 200, msg: 'Noticia encontrada', data: { noticia: item } };
        } catch (error) {
            return { status: 500, msg: 'Error al buscar noticia', data: { error: error.message } };
        }
    }

    static async addNews(data) {
        try {
            const slug = data.Slug ? data.Slug : slugify(data.Titulo);
            const existing = await noticia_model.findOne({ Slug: slug });
            if (existing) return { status: 400, msg: 'Ya existe una noticia con ese slug', data: null };
            const noticia = new noticia_model({
                UUID: crypto.randomUUID(),
                Titulo: data.Titulo,
                Slug: slug,
                Resumen: data.Resumen || '',
                Contenido: data.Contenido || '',
                ImageUrl: data.ImageUrl || '',
                Categoria: data.Categoria || '',
                Publicada_en: data.Publicada_en || Date.now(),
                Estado: data.Estado !== undefined ? data.Estado : true,
                Created_at: Date.now(),
                Updated_at: Date.now()
            });
            await noticia.save();
            return { status: 201, msg: 'Noticia creada', data: { noticia } };
        } catch (error) {
            return { status: 500, msg: 'Error al crear noticia', data: { error: error.message } };
        }
    }

    static async updateNews(id, data) {
        try {
            const noticia = await noticia_model.findOne({ UUID: id });
            if (!noticia) return { status: 404, msg: 'Noticia no encontrada', data: null };
            if (data.Slug && data.Slug !== noticia.Slug) {
                const exists = await noticia_model.findOne({ Slug: data.Slug });
                if (exists) return { status: 400, msg: 'Slug en uso', data: null };
                noticia.Slug = data.Slug;
            }
            ['Titulo','Resumen','Contenido','ImageUrl','Categoria','Publicada_en'].forEach(f => {
                if (data[f] !== undefined) noticia[f] = data[f];
            });
            if (data.Estado !== undefined) noticia.Estado = data.Estado;
            noticia.Updated_at = Date.now();
            await noticia.save();
            return { status: 200, msg: 'Noticia actualizada', data: { noticia } };
        } catch (error) {
            return { status: 500, msg: 'Error al actualizar noticia', data: { error: error.message } };
        }
    }

    static async deleteNews(id) {
        try {
            const noticia = await noticia_model.findOne({ UUID: id });
            if (!noticia) return { status: 404, msg: 'Noticia no encontrada', data: null };
            noticia.Estado = false;
            noticia.Updated_at = Date.now();
            await noticia.save();
            return { status: 200, msg: 'Noticia eliminada', data: { noticia } };
        } catch (error) {
            return { status: 500, msg: 'Error al eliminar noticia', data: { error: error.message } };
        }
    }
}

module.exports = {
    admin_noticias_model: {
        getAllNews: AdminNoticiasModel.getAllNews,
        findNewsById: AdminNoticiasModel.findNewsById,
        addNews: AdminNoticiasModel.addNews,
        updateNews: AdminNoticiasModel.updateNews,
        deleteNews: AdminNoticiasModel.deleteNews
    }
}
