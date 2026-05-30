const propertyRepository = require("../../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../../shared/errors/AppError");

class UpdateProperty {
    async execute(propertyId, data, user) {
        const property = await propertyRepository.findById(propertyId);

        if (!property) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        if (property.owner._id.toString() !== user.id) {
            throw new AppError("No tienes permiso para editar esta propiedad", 403);
        }

        return await propertyRepository.update(propertyId, data);
    }
}

module.exports = new UpdateProperty();
