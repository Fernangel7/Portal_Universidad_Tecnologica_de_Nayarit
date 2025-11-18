const crypto = require('node:crypto');
const { carrera_model } = require('../general.js');

class AdminCarrerasModel {
    static async getAllCareers() {
        try {
            const careers = await carrera_model.find({}).sort({ Created_at: -1 });
            return {
                status: 200,
                msg: 'Carreras obtenidas exitosamente',
                data: { careers }
            };
        } catch (error) {
            console.error('Error getting careers:', error);
            return {
                status: 500,
                msg: 'Error al obtener carreras',
                data: { error: error.message }
            };
        }
    }

    static async findCareerById(id) {
        try {
            const career = await carrera_model.findOne({ UUID: id });
            if (!career) {
                return {
                    status: 404,
                    msg: 'Carrera no encontrada',
                    data: null
                };
            }
            return {
                status: 200,
                msg: 'Carrera encontrada',
                data: { career }
            };
        } catch (error) {
            console.error('Error finding career:', error);
            return {
                status: 500,
                msg: 'Error al buscar carrera',
                data: { error: error.message }
            };
        }
    }

    static async addCareer(careerData) {
        try {
            // Check if slug already exists
            const existingCareer = await carrera_model.findOne({ Slug: careerData.Slug });
            if (existingCareer) {
                return {
                    status: 400,
                    msg: 'Ya existe una carrera con ese slug',
                    data: null
                };
            }

            const newCareer = new carrera_model({
                UUID: crypto.randomUUID(),
                Nombre: careerData.Nombre,
                Slug: careerData.Slug,
                Division: careerData.Division || 'Pendiente',
                ShortDescription: careerData.ShortDescription,
                FullDescription: careerData.FullDescription,
                ImageUrl: careerData.ImageUrl,
                WorkField: careerData.WorkField,
                Competencies: careerData.Competencies,
                StudyPlan: careerData.StudyPlan || [],
                Estado: true,
                Created_at: Date.now(),
                Updated_at: Date.now()
            });

            await newCareer.save();
            return {
                status: 201,
                msg: 'Carrera creada exitosamente',
                data: { career: newCareer }
            };
        } catch (error) {
            console.error('Error adding career:', error);
            return {
                status: 500,
                msg: 'Error al crear carrera',
                data: { error: error.message }
            };
        }
    }

    static async updateCareer(id, careerData) {
        try {
            const career = await carrera_model.findOne({ UUID: id });
            if (!career) {
                return {
                    status: 404,
                    msg: 'Carrera no encontrada',
                    data: null
                };
            }

            // Check if new slug conflicts with existing career
            if (careerData.Slug && careerData.Slug !== career.Slug) {
                const existingCareer = await carrera_model.findOne({ Slug: careerData.Slug });
                if (existingCareer) {
                    return {
                        status: 400,
                        msg: 'Ya existe una carrera con ese slug',
                        data: null
                    };
                }
            }

            // Update fields
            Object.keys(careerData).forEach(key => {
                if (careerData[key] !== undefined && key !== 'UUID') {
                    career[key] = careerData[key];
                }
            });
            career.Updated_at = Date.now();

            await career.save();
            return {
                status: 200,
                msg: 'Carrera actualizada exitosamente',
                data: { career }
            };
        } catch (error) {
            console.error('Error updating career:', error);
            return {
                status: 500,
                msg: 'Error al actualizar carrera',
                data: { error: error.message }
            };
        }
    }

    static async deactivateCareer(id) {
        try {
            const career = await carrera_model.findOne({ UUID: id });
            if (!career) {
                return {
                    status: 404,
                    msg: 'Carrera no encontrada',
                    data: null
                };
            }

            // Soft delete
            career.Estado = false;
            career.Updated_at = Date.now();
            await career.save();

            return {
                status: 200,
                msg: 'Carrera desactivada exitosamente',
                data: { career }
            };
        } catch (error) {
            console.error('Error deactivating career:', error);
            return {
                status: 500,
                msg: 'Error al desactivar carrera',
                data: { error: error.message }
            };
        }
    }

    static async reactivateCareer(id) {
        try {
            const career = await carrera_model.findOne({ UUID: id });
            if (!career) {
                return {
                    status: 404,
                    msg: 'Carrera no encontrada',
                    data: null
                };
            }

            // Reactivate
            career.Estado = true;
            career.Updated_at = Date.now();
            await career.save();

            return {
                status: 200,
                msg: 'Carrera reactivada exitosamente',
                data: { career }
            };
        } catch (error) {
            console.error('Error reactivating career:', error);
            return {
                status: 500,
                msg: 'Error al reactivar carrera',
                data: { error: error.message }
            };
        }
    }

    static async deleteCareerPermanently(id) {
        try {
            const career = await carrera_model.findOne({ UUID: id });
            if (!career) {
                return {
                    status: 404,
                    msg: 'Carrera no encontrada',
                    data: null
                };
            }

            // Permanent delete
            await carrera_model.deleteOne({ UUID: id });

            return {
                status: 200,
                msg: 'Carrera eliminada permanentemente',
                data: null
            };
        } catch (error) {
            console.error('Error deleting career permanently:', error);
            return {
                status: 500,
                msg: 'Error al eliminar carrera permanentemente',
                data: { error: error.message }
            };
        }
    }
}

module.exports = {
    admin_carreras_model: {
        getAllCareers: AdminCarrerasModel.getAllCareers,
        findCareerById: AdminCarrerasModel.findCareerById,
        addCareer: AdminCarrerasModel.addCareer,
        updateCareer: AdminCarrerasModel.updateCareer,
        deactivateCareer: AdminCarrerasModel.deactivateCareer,
        reactivateCareer: AdminCarrerasModel.reactivateCareer,
        deleteCareerPermanently: AdminCarrerasModel.deleteCareerPermanently
    }
}
