const propertyRepository = require("../../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../../shared/errors/AppError");

class DeleteProperty {
    async execute(propertyId, user) {
        const property = await propertyRepository.findById(propertyId);

        if (!property) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        if (property.owner._id.toString() !== user.id) {
            throw new AppError("No tienes permiso para eliminar esta propiedad", 403);
        }

        await propertyRepository.delete(propertyId);
        return { message: "Propiedad eliminada" };
    }
}

module.exports = new DeleteProperty();
