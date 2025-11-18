const noticias_model = require('../../models/mongodb/admin_actions/admin.noticias.js').admin_noticias_model

class AdminNoticiasController {
    static async getAllNews(req, res) {
        try {
            const result = await noticias_model.getAllNews();
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async findNewsById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await noticias_model.findNewsById(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }

    static async addNews(req, res) {
        try {
            const { titulo, slug, resumen, contenido, imageUrl, categoria, publicada_en, publicado } = req.body;
            if (!titulo) return res.status(400).json({ status: 400, msg: 'Título requerido', data: null });
            const publishedFlag = Array.isArray(publicado) ? publicado.includes('on') : (publicado === 'on');
            const data = {
                Titulo: titulo,
                Slug: slug,
                Resumen: resumen,
                Contenido: contenido,
                ImageUrl: imageUrl,
                Categoria: categoria,
                Publicada_en: publicada_en,
                Estado: publishedFlag
            };
            const result = await noticias_model.addNews(data);
            if (result.status === 201) return res.redirect('/admin/noticias');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async updateNews(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const { titulo, slug, resumen, contenido, imageUrl, categoria, publicada_en, publicado } = req.body;
            const publishedFlag = Array.isArray(publicado) ? publicado.includes('on') : (publicado === 'on');
            const data = {};
            if (titulo) data.Titulo = titulo;
            if (slug) data.Slug = slug;
            if (resumen) data.Resumen = resumen;
            if (contenido) data.Contenido = contenido;
            if (imageUrl) data.ImageUrl = imageUrl;
            if (categoria) data.Categoria = categoria;
            if (publicada_en) data.Publicada_en = publicada_en;
            if (publicado !== undefined) data.Estado = publishedFlag;
            const result = await noticias_model.updateNews(id, data);
            if (result.status === 200) return res.redirect('/admin/noticias');
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: { error: error.message } });
        }
    }

    static async deleteNews(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ status: 400, msg: 'ID requerido', data: null });
            const result = await noticias_model.deleteNews(id);
            return res.status(result.status).json(result);
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error interno', data: null });
        }
    }
}

module.exports = {
    admin_noticias_controller: {
        getAllNews: AdminNoticiasController.getAllNews,
        findNewsById: AdminNoticiasController.findNewsById,
        addNews: AdminNoticiasController.addNews,
        updateNews: AdminNoticiasController.updateNews,
        deleteNews: AdminNoticiasController.deleteNews
    }
}
