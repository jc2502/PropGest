const contractRepository = require("../../infrastructure/repositories/ContractRepository");
const propertyRepository = require("../../infrastructure/repositories/PropertyRepository");
const AppError = require("../../shared/errors/AppError");

class GenerateContract {
    async execute(data, user) {
        const property = await propertyRepository.findById(data.property);

        if (!property) {
            throw new AppError("Propiedad no encontrada", 404);
        }

        if (property.owner._id.toString() !== user.id) {
            throw new AppError("No tienes permiso para crear contratos en esta propiedad", 403);
        }

        return await contractRepository.create({
            property: data.property,
            tenant: data.tenant,
            startDate: data.startDate,
            endDate: data.endDate,
            rentAmount: data.rentAmount,
            status: "pending"
        });
    }
}

module.exports = new GenerateContract();
